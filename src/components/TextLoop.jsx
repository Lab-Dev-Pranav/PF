import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './TextLoop.css';

const VIEW_W = 1200;
const VIEW_H = 520;
const CX = VIEW_W / 2;
const CY = VIEW_H / 2;
const EDGE_PAD = 6;

const buildPath = (shape, curviness, ribbonWidth) => {
  const curve = Math.max(0, curviness);
  const room = Math.max(20, CY - Math.max(0, ribbonWidth) / 2 - EDGE_PAD);

  switch (shape) {
    case 'circle': {
      const radius = Math.min(90 + curve * 0.95, room);
      return `M ${CX - radius} ${CY} A ${radius} ${radius} 0 1 1 ${CX + radius} ${CY} A ${radius} ${radius} 0 1 1 ${CX - radius} ${CY} Z`;
    }
    case 'infinity': {
      const radius = 150 + curve * 1.4;
      const height = Math.min(60 + curve * 0.95, room);
      return [
        `M ${CX} ${CY}`,
        `C ${CX + radius * 0.55} ${CY - height} ${CX + radius} ${CY - height} ${CX + radius} ${CY}`,
        `C ${CX + radius} ${CY + height} ${CX + radius * 0.55} ${CY + height} ${CX} ${CY}`,
        `C ${CX - radius * 0.55} ${CY - height} ${CX - radius} ${CY - height} ${CX - radius} ${CY}`,
        `C ${CX - radius} ${CY + height} ${CX - radius * 0.55} ${CY + height} ${CX} ${CY}`,
        'Z'
      ].join(' ');
    }
    case 'arch': {
      const rise = Math.min(120 + curve * 1.1, room * 2);
      return `M 120 ${CY + rise / 2} Q ${CX} ${CY - rise * 1.5} ${VIEW_W - 120} ${CY + rise / 2}`;
    }
    case 'line':
      return `M -320 ${CY} L ${VIEW_W + 320} ${CY}`;
    case 'wave':
    default: {
      const amplitude = Math.min(curve * 2.2, room * 2);
      return `M -320 ${CY} Q -160 ${CY - amplitude} 0 ${CY} T 320 ${CY} T 640 ${CY} T 960 ${CY} T 1280 ${CY} T ${VIEW_W + 320} ${CY}`;
    }
  }
};

const TextLoop = ({
  text = 'IDEA ✦ COFFEE ✦ CODE ✦ DEBUG ✦ TEST ✦ BREAK ✦ FIX ✦ REFACTOR ✦ COMMIT ✦ PUSH ✦ DEPLOY ✦ MONITOR ✦ LEARN ✦ REPEAT',
  shape = 'wave',
  path,
  speed = 80,
  direction = 'backward',
  separator = '✦',
  curviness = 0,
  fontSize = 26,
  fontWeight = 800,
  letterSpacing = 2,
  uppercase = true,
  color = '#eeeeee',
  ribbon = true,
  ribbonColor = '#6345dd',
  ribbonWidth = 86,
  pauseOnHover = false,
  className = '',
  style = {}
}) => {
  const rootRef = useRef(null);
  const pathRef = useRef(null);
  const measureRef = useRef(null);
  const headRef = useRef(null);
  const tailRef = useRef(null);
  const [metrics, setMetrics] = useState({ length: 0, reps: 1 });
  const rawId = useId();
  const pathId = `text-loop-${rawId.replace(/:/g, '')}`;
  const pathData = useMemo(() => path || buildPath(shape, curviness, ribbonWidth), [shape, curviness, ribbonWidth]);
  const unit = useMemo(() => {
    const base = uppercase ? String(text).toUpperCase() : String(text);
    const gap = separator ? `\u00A0${separator}\u00A0` : '\u00A0\u00A0\u00A0';
    return `${base}${gap}`;
  }, [text, separator, uppercase]);
  const textStyle = useMemo(() => ({ fontSize: `${fontSize}px`, fontWeight, letterSpacing: `${letterSpacing}px` }), [fontSize, fontWeight, letterSpacing]);

  useLayoutEffect(() => {
    const pathElement = pathRef.current;
    const measureElement = measureRef.current;
    if (!pathElement || !measureElement) return undefined;

    let cancelled = false;
    const measure = () => {
      if (cancelled) return;
      try {
        const length = pathElement.getTotalLength();
        const unitWidth = measureElement.getComputedTextLength();
        const reps = unitWidth > 0 ? Math.max(1, Math.round(length / unitWidth)) : 1;
        setMetrics((previous) => previous.length === length && previous.reps === reps ? previous : { length, reps });
      } catch {
        return;
      }
    };

    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    return () => { cancelled = true; };
  }, [pathData, unit, fontSize, fontWeight, letterSpacing]);

  useEffect(() => {
    const { length } = metrics;
    const head = headRef.current;
    const tail = tailRef.current;
    if (!head || !tail || !length) return undefined;

    const applyOffset = (offset) => {
      const partner = offset >= 0 ? offset - length : offset + length;
      head.setAttribute('startOffset', String(offset));
      tail.setAttribute('startOffset', String(partner));
    };
    applyOffset(0);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || speed <= 0) return undefined;

    const state = { offset: 0 };
    const tween = gsap.to(state, {
      offset: direction === 'reverse' ? -length : length,
      duration: length / speed,
      ease: 'none',
      repeat: -1,
      onUpdate: () => applyOffset(state.offset)
    });
    const root = rootRef.current;
    const pause = () => tween.pause();
    const resume = () => tween.resume();
    if (pauseOnHover && root) {
      root.addEventListener('pointerenter', pause);
      root.addEventListener('pointerleave', resume);
    }
    return () => {
      tween.kill();
      if (pauseOnHover && root) {
        root.removeEventListener('pointerenter', pause);
        root.removeEventListener('pointerleave', resume);
      }
    };
  }, [metrics, speed, direction, pauseOnHover]);

  const loopText = unit.repeat(metrics.reps);
  const fitLength = metrics.length || undefined;

  return (
    <div ref={rootRef} className={`text-loop ${className}`.trim()} style={style}>
      <svg className="text-loop-svg" viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={text}>
        <path ref={pathRef} id={pathId} d={pathData} fill="none" stroke={ribbon ? ribbonColor : 'none'} strokeWidth={ribbon ? ribbonWidth : 0} strokeLinecap="round" strokeLinejoin="round" />
        <text ref={measureRef} className="text-loop-measure" style={textStyle} aria-hidden="true">{unit}</text>
        <text className="text-loop-text" style={textStyle} fill={color} dominantBaseline="central" aria-hidden="true" textLength={fitLength} lengthAdjust="spacing"><textPath ref={headRef} href={`#${pathId}`} startOffset={0}>{loopText}</textPath></text>
        <text className="text-loop-text" style={textStyle} fill={color} dominantBaseline="central" aria-hidden="true" textLength={fitLength} lengthAdjust="spacing"><textPath ref={tailRef} href={`#${pathId}`} startOffset={0}>{loopText}</textPath></text>
      </svg>
    </div>
  );
};

export default TextLoop;