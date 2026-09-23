import { useEffect, useState, useRef } from "react";
import { animate, scroll, spring } from "motion";
import { ReactLenis } from "lenis/react";
import projectsData from "../../data/projects";
import "./HorizontalScroll.css";

const shippedProjects = projectsData.slice(0, 4);

export default function HorizontalScroll() {
  const ulRef = useRef(null);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const ul = ulRef.current;

    if (!ul) return;

    const items = ul.querySelectorAll("li");
    const section = ul.closest("section");

    if (!section || !items.length) return;
    // Horizontal scroll animation
    const controls = animate(
      ul,
      {
        transform: ["none", `translateX(-${items.length - 1}00vw)`],
      },
      {
        easing: spring(),
      }
    );
    const stopHorizontalScroll = scroll(controls, {
      target: section,
    });
    // Individual heading animations
    const segmentLength = 1 / items.length;
    const headingStops = [];
    items.forEach((item, i) => {
      const header = item.querySelector("h2");

      if (!header) return;

      const headingAnimation = animate(header, {
        x: [800, -800],
      });

      const stopHeadingScroll = scroll(headingAnimation, {
        target: section,
        offset: [
          [i * segmentLength, 1],
          [(i + 1) * segmentLength, 0],
        ],
      });

      headingStops.push(stopHeadingScroll);
    });
    return () => {
      stopHorizontalScroll?.();

      headingStops.forEach((stop) => {
        stop?.();
      });
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= 6 ? 1 : prev + 1));
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <ReactLenis root>
      <main className="horizontal-scroll">
        <article className="horizontal-scroll__article">
          {/* HERO */}
          <header className="horizontal-scroll__hero">
            <div className="horizontal-scroll__grid" />

            <div className="horizontal-scroll__hero-content">
              <p className="horizontal-scroll__eyebrow">05 / Engineering Process</p>
              <h1>
                How I build
                <br />
                things.
              </h1>
              <p className="horizontal-scroll__hero-note">From idea to architecture, code to production.</p>
            </div>
          </header>

          {/* HORIZONTAL SCROLL */}
          <section className="horizontal-scroll__track">
            <ul ref={ulRef} className="horizontal-scroll__list">
              <li className="horizontal-scroll__panel horizontal-scroll__panel--passion">
                <div className="horizontal-scroll__panel-content">
                  <span className="horizontal-scroll__number">01 / DEVELOPMENT PROCESS</span>
                  <h2>Think</h2>
                  <p className="horizontal-scroll__description">Before the first line of code, I understand the problem, the user, and the system.</p>
                  <div className="horizontal-scroll__signal-list"><span>User flow</span><span>Architecture</span><span>Performance</span><span>Scalability</span></div>
                  <div className="horizontal-scroll__system-flow" aria-label="User to application to API to database flow"><span>User</span><i>↓</i><span>App</span><i>↓</i><span>API</span><i>↓</i><span>DB</span></div>
                </div>
              </li>

              <li className="horizontal-scroll__panel horizontal-scroll__panel--work">
                <div className="horizontal-scroll__panel-content">
                  <span className="horizontal-scroll__number">02 / CORE STACK</span>
                  <h2>Build</h2>
                  <p className="horizontal-scroll__description">A MERN foundation for products that feel fast, clear, and ready to grow.</p>
                  <div className="horizontal-scroll__stack-grid"><span>React</span><span>Node.js</span><span>Express</span><span>MongoDB</span></div>
                  <p className="horizontal-scroll__code-line">const stack = ["React", "Node", "Express", "MongoDB"];</p>
                </div>
              </li>

              <li className="horizontal-scroll__panel horizontal-scroll__panel--motivation">
                <div className="horizontal-scroll__panel-content">
                  <span className="horizontal-scroll__number">03 / BACKEND SYSTEMS</span>
                  <h2>Engineer</h2>
                  <p className="horizontal-scroll__description">I turn product requirements into dependable services, protected data, and useful APIs.</p>
                  <div className="horizontal-scroll__api-flow">
                    <span
                      className={`horizontal-scroll__api-step-1 ${activeStep === 1 ? "active" : ""
                        }`}
                    >
                      REQUEST
                    </span>
                    <b>↓</b>
                    <span
                      className={`horizontal-scroll__api-step-2 ${activeStep === 2 ? "active" : ""
                        }`}
                    >
                      EXPRESSION ROUTES
                    </span>
                    <b>↓</b>
                    <span
                      className={`horizontal-scroll__api-step-3 ${activeStep === 3 ? "active" : ""
                        }`}
                    >
                      MIDDLEWARE
                    </span>
                    <b>↓</b>
                    <span
                      className={`horizontal-scroll__api-step-4 ${activeStep === 4 ? "active" : ""
                        }`}
                    >
                      CONTROLLER
                    </span>
                    <b>↓</b>
                    <span className={`horizontal-scroll__api-step-5 ${activeStep === 5 ? "active" : ""
                      }`}>
                      DATABASE
                    </span>
                    <b>↓</b>
                    <span className={`horizontal-scroll__api-step-6 ${activeStep === 6 ? "active" : ""
                      }`}>
                      RESPONSE
                    </span>
                  </div>

                  <div className="horizontal-scroll__status">
                    <span>API</span>
                    <span>AUTH</span>
                    <span>DB</span>
                    <span>SECURITY</span>
                    <span>PERFORMANCE</span>
                  </div>
                </div>
              </li>

              <li className="horizontal-scroll__panel horizontal-scroll__panel--inspiration">
                <div className="horizontal-scroll__panel-content">
                  <span className="horizontal-scroll__number">04 / SELECTED WORK</span>
                  <h2>Ship</h2>
                  <p className="horizontal-scroll__description">Ideas matter when they become working products. Here are a few I have shipped.</p>
                  <div className="horizontal-scroll__project-list">
                    {shippedProjects.map(
                      (project) =>
                        <a key={project.name_id} href={project.runLink || project.githubLink} target="_blank" rel="noreferrer">
                          <strong>{project.name}</strong>
                          <span>{project.languages.slice(0, 3).join(" · ")}</span>
                          <em>LIVE ↗</em>
                        </a>
                    )}
                  </div>
                </div>
              </li>

              <li className="horizontal-scroll__panel horizontal-scroll__panel--believe">
                <div className="horizontal-scroll__panel-content">
                  <span className="horizontal-scroll__number">05 / PRODUCTION MINDSET</span>
                  <h2>Scale</h2>
                  <p className="horizontal-scroll__description">Clean code, scalable architecture, good UX, and performance should move together.</p>
                  <div className="horizontal-scroll__scale-stack"><span>CLEAN CODE</span><b>+</b><span>SCALABLE ARCHITECTURE</span><b>+</b><span>GOOD UX</span><b>+</b><span>PERFORMANCE</span><b>↓</b><strong>PRODUCTS</strong></div>
                  <p className="horizontal-scroll__closing">I don't just build interfaces.<br /><span>I build systems that move.</span></p>
                </div>
              </li>
            </ul>
          </section>

        </article>
      </main>
    </ReactLenis>
  );
}