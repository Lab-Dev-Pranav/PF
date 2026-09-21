import { useCallback, useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start || 1);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return { scrollTop: window.scrollY, containerHeight: window.innerHeight };
    }

    const scroller = scrollerRef.current;
    return { scrollTop: scroller.scrollTop, containerHeight: scroller.clientHeight };
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    element => {
      let offset = 0;
      let current = element;

      while (current) {
        offset += current.offsetTop;
        current = current.offsetParent;
      }

      return offset;
    },
    []
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');
    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * index;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinEnd = endElementTop - containerHeight / 2;
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + index * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? index * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        cardsRef.current.forEach((otherCard, otherIndex) => {
          const otherTop = getElementOffset(otherCard);
          const otherStart = otherTop - stackPositionPx - itemStackDistance * otherIndex;
          if (scrollTop >= otherStart) topCardIndex = otherIndex;
        });
        if (index < topCardIndex) blur = (topCardIndex - index) * blurAmount;
      }

      const pinStart = triggerStart;
      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * index;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * index;
      }

      const nextTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };
      const previousTransform = lastTransformsRef.current.get(index);
      const hasChanged =
        !previousTransform ||
        Math.abs(previousTransform.translateY - nextTransform.translateY) > 0.1 ||
        Math.abs(previousTransform.scale - nextTransform.scale) > 0.001 ||
        Math.abs(previousTransform.rotation - nextTransform.rotation) > 0.1 ||
        Math.abs(previousTransform.blur - nextTransform.blur) > 0.1;

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${nextTransform.translateY}px, 0) scale(${nextTransform.scale}) rotate(${nextTransform.rotation}deg)`;
        card.style.filter = nextTransform.blur ? `blur(${nextTransform.blur}px)` : '';
        lastTransformsRef.current.set(index, nextTransform);
      }

      if (index === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset
  ]);

  const setupLenis = useCallback(() => {
    const scroller = scrollerRef.current;
    const lenis = new Lenis(
      useWindowScroll
        ? { duration: 1.2, smoothWheel: true, touchMultiplier: 2, lerp: 0.1, syncTouch: true }
        : {
            wrapper: scroller,
            content: scroller.querySelector('.scroll-stack-inner'),
            duration: 1.2,
            smoothWheel: true,
            touchMultiplier: 2,
            lerp: 0.1,
            syncTouch: true
          }
    );

    lenis.on('scroll', updateCardTransforms);
    const raf = time => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;
  }, [updateCardTransforms, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    cardsRef.current = Array.from(
      useWindowScroll
        ? scroller.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    );
    cardsRef.current.forEach((card, index) => {
      if (index < cardsRef.current.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
    });

    setupLenis();
    updateCardTransforms();
    const activeLenis = lenisRef.current;
    const activeAnimationFrame = animationFrameRef.current;
    const activeCards = cardsRef.current;
    const activeTransforms = lastTransformsRef.current;

    const onResize = () => updateCardTransforms();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (activeAnimationFrame) cancelAnimationFrame(activeAnimationFrame);
      activeLenis?.destroy();
      stackCompletedRef.current = false;
      activeCards.length = 0;
      activeTransforms.clear();
      isUpdatingRef.current = false;
    };
  }, [itemDistance, setupLenis, updateCardTransforms, useWindowScroll]);

  return (
    <div
      className={`scroll-stack-scroller ${useWindowScroll ? 'scroll-stack-scroller--window' : ''} ${className}`.trim()}
      ref={scrollerRef}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
