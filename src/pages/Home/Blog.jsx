import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Blog.css';

const blogPosts = [
  {
    id: 1,
    title: 'From Building Projects to Building Mindset',
    subtitle: '🗂️ to 🧠',
    date: 'Oct 29 2025',
    content: `
      <p>When I first started coding, my goal was simple: just make things work. I did not care much about structure, design patterns, or optimization. The satisfaction of seeing “Hello World” on the screen was enough to keep me going.</p>
      <p>But somewhere along the way, I realized something deeper: it is not just about writing cleaner or more efficient code. It is about <strong>building yourself</strong> through every project you create.</p>
      <p>Every <code>console.log()</code> that failed taught me patience.<br />Every deployment that broke taught me resilience.<br />And every feature that finally worked reminded me <em>why I started</em>.</p>
      <p>Over time, I understood that real growth does not come from the big achievements everyone sees. It comes from the quiet, persistent effort behind the scenes.</p>
      <p>We often chase success in numbers: followers, stars, downloads. But the true reward lies in how much we have evolved as creators, thinkers, and problem-solvers.</p>
      <blockquote>“What will this project teach me beyond the code?”</blockquote>
      <p>Every project is more than an app, a feature, or a repository. It is a chapter in your story as a builder, and the story is what truly matters.</p>
    `
  },
  {
    id: 2,
    title: 'From Static Pages to Reactive Interfaces',
    subtitle: '📦 to ⚛️',
    date: 'Nov 14 2025',
    content: `
      <h3>From Static Pages to Reactive Interfaces</h3>
      <p>When I started building projects with plain HTML, CSS, and JavaScript, everything worked, but nothing felt truly dynamic. Updating the DOM manually, managing state, and keeping designs responsive quickly became messy.</p>
      <p>Then I discovered <strong>React</strong>, and it completely changed how I thought about building UIs. It was not just a new library; it was a new <em>way of thinking</em> about structure, interaction, and scalability.</p>
      <h4>01 / Responsiveness Made Simple</h4>
      <p>React’s virtual DOM and state-based rendering made everything feel effortless. Instead of chasing elements across the page, I could focus on <strong>what changes</strong>, and React handled <strong>how</strong> it changed.</p>
      <h4>02 / Simplicity in Structure</h4>
      <p>With JSX and component-based design, the code finally started making sense. Each file had a single responsibility: clear, organized, and reusable.</p>
      <h4>03 / Reusable Components</h4>
      <p>Whether it is a button, a navbar, or a custom card, everything in React becomes modular. I learned that <strong>consistency</strong> is about smart reuse.</p>
      <h4>04 / Data Where It Belongs</h4>
      <p>React’s approach to component-level state and API calls made logic more maintainable, leading to cleaner and scalable structures.</p>
      <h4>05 / Speed Meets Scalability</h4>
      <p>Paired with Node or Express, React unlocked full-stack freedom. It was about building systems that could grow with my ideas.</p>
      <blockquote>“React is not just a library. It is a mindset that turns development into design thinking.”</blockquote>
      <p>Learning React was not just about improving code. It was about improving how I <em>think</em> as a developer, and that is the kind of growth that lasts.</p>
    `
  }
];

const Blog = () => {
  const [openId, setOpenId] = useState(blogPosts[0].id);
  const panelsRef = useRef(new Map());

  useEffect(() => {
    panelsRef.current.forEach((panel, id) => {
      const isOpen = id === openId;
      if (isOpen) panel.hidden = false;
      gsap.killTweensOf(panel);
      gsap.to(panel, {
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.55,
        ease: 'power3.out',
        onComplete: () => {
          if (!isOpen) panel.hidden = true;
        },
        overwrite: true
      });
    });
  }, [openId]);

  return (
    <section className="blog" aria-labelledby="blog-title">
      <div className="blog__intro">
        <div>
          <p className="blog__eyebrow">06 / Journal</p>
          <h2 id="blog-title">Notes from the build.</h2>
        </div>
        <p className="blog__summary">Ideas, lessons, and small shifts in perspective collected between commits.</p>
      </div>

      <div className="blog__list">
        {blogPosts.map((post, index) => {
          const isOpen = openId === post.id;
          return (
            <article className={`blog__post ${isOpen ? 'blog__post--open' : ''}`} key={post.id}>
              <button
                className="blog__trigger"
                type="button"
                aria-expanded={isOpen}
                aria-controls={`blog-panel-${post.id}`}
                onClick={() => setOpenId(isOpen ? null : post.id)}
              >
                <span className="blog__post-number">0{index + 1}</span>
                <span className="blog__post-heading">
                  <span className="blog__post-subtitle">{post.subtitle}</span>
                  <span className="blog__post-title">{post.title}</span>
                </span>
                <span className="blog__post-date">{post.date}</span>
                <span className="blog__chevron" aria-hidden="true">⌄</span>
              </button>
              <div
                className="blog__panel"
                id={`blog-panel-${post.id}`}
                ref={panel => {
                  if (panel) panelsRef.current.set(post.id, panel);
                  else panelsRef.current.delete(post.id);
                }}
                hidden={!isOpen}
              >
                <div className="blog__content" dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Blog;
