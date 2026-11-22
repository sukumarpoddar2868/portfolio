import { Hero, InView, MusicPlayer, Nav, ThemeControls } from "@/components/client";
import {
  experience,
  introStats,
  profile,
  projects,
  skills,
  tagline,
  toolkitLines,
  type Project,
} from "@/content";

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

// Accent colours for the generated project covers.
const accents = ["#c41e3a", "#2e7d5b", "#d98e04", "#3b5bdb", "#7b2cbf", "#0b7285", "#e8590c", "#5c940d", "#1864ab", "#a61e4d"];

function Cover({ project, index }: { project: Project; index: number }) {
  if (project.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={project.image} alt={project.name} />;
  }
  const initials = project.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <div className="cover" style={{ ["--accent" as string]: accents[index % accents.length] }} aria-hidden="true">
      <span className="cover-initials">{initials}</span>
      <span className="cover-label">{project.tags[0].toLowerCase().replace(/\s+/g, "_")}</span>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const inner = (
    <>
      {project.topPick && (
        <div className="project-featured-badge">
          <span>Top Pick</span>
        </div>
      )}
      <div className="project-card-image">
        <Cover project={project} index={index} />
      </div>
      <div className="project-card-content">
        <div className="project-card-client">{project.org}</div>
        <h3 className="project-card-title">{project.name}</h3>
        <p className="project-card-description">{project.description}</p>
        <div className="project-card-impact">{project.impact}</div>
        <div className="project-card-tags">
          {project.tags.map((t) => (
            <span key={t} className="project-card-tag">
              {t}
            </span>
          ))}
          <span className="project-card-tag status">{project.status}</span>
        </div>
      </div>
    </>
  );
  const style = { ["--card-rotation" as string]: `${[-2.5, 1.5, -1.8, 2, -2.2, 1.8][index % 6]}deg`, animationDelay: `${(index % 3) * 0.1}s` };
  return project.url ? (
    <a className="project-card" href={project.url} target="_blank" rel="noopener noreferrer" style={style}>
      {inner}
    </a>
  ) : (
    <div className="project-card" style={style}>
      {inner}
    </div>
  );
}

// Deterministic "random" layout for the drifting toolkit lines.
function toolkitRows() {
  const rows = [];
  const count = 11;
  for (let i = 0; i < count; i++) {
    const depth = [0.15, 0.45, 1, 0.3, 0.7, 0.1, 0.85, 0.35, 0.55, 0.2, 0.6][i];
    const items = [0, 1, 2].map((k) => toolkitLines[(i * 3 + k) % toolkitLines.length]);
    rows.push({
      items,
      right: i % 2 === 1,
      rotate: -4.4 + (8.8 * i) / (count - 1),
      top: 6 + (88 * i) / (count - 1),
      opacity: 0.04 + depth * depth * 0.3,
      size: Math.round(11 + depth * 18),
      duration: Math.round(110 - depth * 65),
      delay: -((i * 17) % 90),
    });
  }
  return rows;
}

export default function Home() {
  const first = profile.name.split(" ")[0];
  return (
    <div className="page">
      <ThemeControls />
      <MusicPlayer />
      <Nav />
      <Hero />

      <main className="container">
        <section className="intro-stats">
          {introStats.map((line, i) => (
            <p key={i} className="intro-stat-line" style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
              {line.parts.map((p, j) =>
                p.strong ? (
                  <span key={j} className="stat-highlight">
                    {p.text}
                  </span>
                ) : (
                  <span key={j}>{p.text}</span>
                ),
              )}
            </p>
          ))}
        </section>

        <InView as="section" className="bio">
          <p>
            Hi, I&apos;m {first}. Currently the <strong>Founder</strong> of{" "}
            <a href={profile.company.url} className="highlight-link" target="_blank" rel="noopener noreferrer">
              {profile.company.name}
            </a>
            , an AI engineering studio building products for small businesses and developers. I work where data science, machine learning and product meet: framing the problem, building the model, and shipping the software around it.
          </p>
          <p>
            <a href={`mailto:${profile.email}`} className="bubble-link">
              Email me
            </a>
            , see my code on{" "}
            <a href={profile.github} className="bubble-link" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            , or connect with me on{" "}
            <a href={profile.linkedin} className="bubble-link" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            .
          </p>
        </InView>

        <section className="timeline-section">
          <h2 className="section-title">{tagline}</h2>
        </section>

        <section className="timeline-section" id="experience">
          <h2 className="section-title">Experience</h2>
          <InView className="timeline">
            {experience.map((e) => (
              <div key={e.role} className="timeline-item">
                <span className="period">{e.period}</span>
                <div className="dot" />
                <div className="content">
                  <h3>
                    <a href={e.url} target="_blank" rel="noopener noreferrer">
                      {e.role}
                    </a>
                  </h3>
                  <p>{e.text}</p>
                </div>
              </div>
            ))}
          </InView>
          <div className="center">
            <a className="pill-btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              Full profile on LinkedIn
              <Arrow />
            </a>
          </div>
        </section>

        <section className="projects-section" id="work">
          <div className="projects-heading">
            <h2 className="section-title">Selected Work</h2>
            <p className="projects-cta">Products I&apos;ve shipped at Shryxa, and projects from my GitHub.</p>
          </div>
          <InView className="projects-grid" threshold={0.05}>
            {projects.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} />
            ))}
          </InView>
          <div className="center">
            <a className="pill-btn" href={profile.github} target="_blank" rel="noopener noreferrer">
              More on GitHub
              <Arrow />
            </a>
          </div>
        </section>

        <section className="toolkit-section" id="toolkit">
          <div className="toolkit-header">
            <h2 className="section-title">
              <span className="highlight">The Toolkit</span>
            </h2>
            <p className="toolkit-intro">The languages, frameworks and tools behind the projects above.</p>
          </div>
          <div className="scrolling-lines-container" aria-hidden="true">
            {toolkitRows().map((r, i) => (
              <div
                key={i}
                className="scrolling-line"
                style={{ transform: `rotate(${r.rotate}deg)`, top: `${r.top}%`, opacity: r.opacity, fontSize: r.size }}
              >
                <div
                  className={`scrolling-content${r.right ? " scroll-right" : ""}`}
                  style={{ animationDuration: `${r.duration}s`, animationDelay: `${r.delay}s` }}
                >
                  {[0, 1].map((g) => (
                    <div key={g} className="content-group">
                      {[...r.items, ...r.items].map(([a, b, c], k) => (
                        <span key={k} className="sentence-item">
                          {a}
                          <span className="highlight-word">{b}</span>
                          {c}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <InView className="skills-grid">
            {skills.map((s) => (
              <div key={s.group} className="skill-group">
                <h3>{s.group}</h3>
                <div className="project-card-tags">
                  {s.items.map((it) => (
                    <span key={it} className="skill-chip">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </InView>
        </section>

        <section className="lets-talk" id="contact">
          <h2 className="section-title">Let&apos;s Talk</h2>
          <p>Building something with data or AI? I&apos;d like to hear about it.</p>
          <a className="pill-btn" href={`mailto:${profile.email}`}>
            Get in Touch
            <Arrow />
          </a>
        </section>

        <footer>
          <span>© {2026} {profile.name}</span>
          <span className="footer-links">
            <a href={`mailto:${profile.email}`}>Email</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </span>
        </footer>
      </main>
    </div>
  );
}
