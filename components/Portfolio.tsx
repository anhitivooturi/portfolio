'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import Hud from './Hud';

const NeuralHero = dynamic(() => import('./NeuralHero'), { ssr: false, loading: () => <div className="network-loading" aria-hidden="true"/> });

type PortfolioProject = {
  id: string;
  name: string;
  type: string;
  award: string;
  description: string;
  stack: string[];
  art: string;
  status: 'BUILT' | 'IN PROGRESS';
  devpost?: string;
  github?: string | null;
  outcome: string;
};

const projects: PortfolioProject[] = [
  {
    id: '01', name: 'DevLog', type: 'AI DEVELOPMENT MEMORY', award: '1ST PLACE · GOOGLE TRACK',
    description: "Tracks what changed in a codebase and why, so you don't have to dig through old commits. A FastAPI backend keeps a React dashboard and a VS Code extension in sync in real time. 1st place in the Google track at Innovation Hacks, out of 100 teams.",
    stack: ['Python', 'FastAPI', 'Firebase', 'Gemini API'], art: 'devlog',
    status: 'BUILT', devpost: 'https://devpost.com/software/devlog-7cj1k2', github: 'https://github.com/anhitivooturi/Innovation-Hacks',
    outcome: 'Built an event-driven, low-latency pipeline that keeps a React dashboard, FastAPI service, and VS Code extension in sync.',
  },
  {
    id: '02', name: 'RealToGo', type: 'WHATSAPP APARTMENT SEARCH', award: 'TOP 3 · GLOBEHACK 2026',
    description: 'A WhatsApp bot for apartment hunting. Send a voice note, a text, or your location, and it turns that into a structured listing brief. Built with Twilio webhooks and Gemini. Top 3 at GlobeHack 2026.',
    stack: ['Node.js', 'Twilio', 'Gemini API', 'Supabase'], art: 'realto',
    status: 'BUILT', devpost: 'https://devpost.com/software/arn-d3nk4u', github: 'https://github.com/anhitivooturi/GlobalHack',
    outcome: 'Connected three real-time webhook components into one conversational flow for multimodal listing intake.',
  },
  {
    id: '03', name: 'Operations Agent', type: 'AUTONOMOUS OPERATIONS · HACKAZONA', award: '',
    description: 'A proactive operations agent for incident response. It detects a simulated sensor spike, presents an AI diagnosis and playbook, and supports team coordination from a live dashboard.',
    stack: ['Next.js', 'Express', 'Gemini', 'Supabase'], art: 'agent',
    status: 'BUILT', github: 'https://github.com/anhitivooturi/HackAzona',
    outcome: 'Built a hackathon prototype that turns a sensor alert into a diagnosis, recommended playbook, and incident report.',
  },
  {
    id: '04', name: 'FitAI', type: 'FITNESS + PHYSICAL THERAPY', award: '',
    description: 'A fitness and physical therapy app that checks your form through the camera. It tracks 33 body points at 30 FPS, and all health data stays on your device. A dashboard lets a PT set custom rehab plans. Still in progress.',
    stack: ['Python', 'PyTorch', 'MediaPipe', 'Firebase'], art: 'fitai',
    status: 'IN PROGRESS', github: null,
    outcome: 'Exploring on-device pose analysis at 30 FPS across 33 landmarks, paired with therapist-defined rehabilitation plans.',
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '↓'}</span>;
}

function ProjectArtwork({ kind }: { kind: string }) {
  if (kind === 'devlog') return (
    <div className="art art-devlog" aria-label="Abstract DevLog code and memory interface preview" role="img">
      <div className="art-window"><div className="art-top"><i/><i/><i/><span>devlog / memory</span></div><div className="art-code"><b>01</b><span>function <em>remember</em>(change) {'{'}</span><b>02</b><span>  await context.<em>sync</em>(change)</span><b>03</b><span>  return <strong>"synced"</strong></span><b>04</b><span>{'}'}</span></div><div className="memory-pill"><span className="pulse-dot"/> 3 CLIENTS IN SYNC <span>↗</span></div></div>
      <span className="art-stamp">D·L</span>
    </div>
  );
  if (kind === 'realto') return (
    <div className="art art-realto" aria-label="Abstract WhatsApp property assistant preview" role="img">
      <div className="phone"><div className="phone-notch"/><div className="chat-head"><span className="avatar">R</span><span><b>RealToGo</b><small>online</small></span><span className="chat-more">•••</span></div><div className="chat-body"><div className="chat-bubble buyer">Looking for a 2 bed near Tempe, under $2k. 🎙</div><div className="chat-bubble assistant">Found 3 places that match. Want to see them?</div><div className="listing"><div className="listing-photo"><span>42° 17′ 57″ N</span></div><div><b>Desert Bloom · 2 bed</b><small>Tempe, AZ · $1,850 / mo</small></div></div></div><div className="chat-input">Message <span>➤</span></div></div><div className="orbit orbit-one"/><div className="orbit orbit-two"/>
    </div>
  );
  if (kind === 'easeflow') return (
    <div className="art art-easeflow" aria-label="EaseFlow staff workflow dashboard preview" role="img">
      <div className="ease-panel"><div className="ease-top"><span>EF / EASEFLOW</span><span>WORKFLOW OVERVIEW</span></div><div className="ease-title">Less time on forms.<br/><em>More time helping.</em></div><div className="ease-cards"><div><b>01</b><span>Intake</span><i>READY</i></div><div><b>02</b><span>Review</span><i>ACTIVE</i></div><div><b>03</b><span>Follow-up</span><i>SYNCED</i></div></div><div className="ease-progress"><span/><span/><span/></div></div>
    </div>
  );
  if (kind === 'agent') return (
    <div className="art art-agent" aria-label="Autonomous operations incident dashboard preview" role="img">
      <div className="agent-panel"><div className="agent-top"><span>OPERATIONS / LIVE</span><span className="agent-alert">● SENSOR SPIKE</span></div><div className="agent-chart"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><b/></div><div className="agent-result"><span>AI DIAGNOSIS</span><strong>Pressure anomaly detected</strong><small>PLAYBOOK · CHECK VALVE ASSEMBLY</small></div><div className="agent-actions"><span>INCIDENT REPORT</span><span>NOTIFY TEAM ↗</span></div></div>
    </div>
  );
  return (
    <div className="art art-fitai" aria-label="Abstract FitAI movement tracking visualization" role="img">
      <div className="fit-grid"/><div className="fit-figure"><span className="joint j1"/><span className="joint j2"/><span className="joint j3"/><span className="joint j4"/><span className="joint j5"/><span className="joint j6"/><span className="joint j7"/><span className="joint j8"/><span className="joint j9"/><span className="joint j10"/><span className="joint j11"/><span className="joint j12"/><span className="joint j13"/><span className="joint j14"/><span className="joint j15"/><span className="joint j16"/><span className="joint j17"/><span className="joint j18"/><span className="joint j19"/><span className="joint j20"/><span className="joint j21"/></div><div className="fit-label label-a">COMPUTER VISION</div><div className="fit-label label-b">ON-DEVICE</div><div className="fit-ring"/>
    </div>
  );
}

export default function Portfolio() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
    const updateProgress = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty('--scroll-progress', `${range > 0 ? (window.scrollY / range) * 100 : 0}%`);
    };
    updateProgress(); window.addEventListener('scroll', updateProgress, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', updateProgress); };
  }, []);
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText('anivooturi@gmail.com'); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }
    catch { window.location.href = 'mailto:anivooturi@gmail.com'; }
  };

  return (
    <main>
      <Hud />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Anhiti Vooturi, home">AV<span>®</span></a>
        <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#experience">Experience</a></nav>
        <a className="header-cta" href="mailto:anivooturi@gmail.com"><span className="availability-dot"/> Let’s talk <Arrow diagonal/></a>
      </header>

      <section className="hero" id="top" onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.current.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      }}>
        <div className="hero-grid" aria-hidden="true"/><div className="hero-corners" aria-hidden="true"><i/><i/><i/><i/></div>
        <div className="hero-canvas" aria-hidden="true"><NeuralHero pointer={pointer}/></div>
        <div className="hero-wash" aria-hidden="true"/>
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> SOFTWARE ENGINEERING · PRODUCT MANAGEMENT <span className="hero-location">PHOENIX, AZ · 33.4°N</span></div>
          <h1><span>Anhiti</span><span>Vooturi<span className="name-period">.</span></span></h1>
          <div className="hero-bottom"><p>CS &amp; Data Science @ ASU Barrett &apos;28</p><a href="#work" className="round-link" aria-label="Scroll to selected work"><Arrow/></a></div>
          <div className="hero-academic">COMPUTER SCIENCE + DATA SCIENCE <b>/</b> ASU BARRETT <b>/</b> MAY ’28</div>
        </div>
        <div className="hero-aside"><span>FIG. 01 / FEATURED BUILD</span><span>DEVLOG<br/>1ST PLACE · INNOVATION HACKS</span><span>GOOGLE TRACK<br/>100 TEAMS</span><span>EVENT-DRIVEN MEMORY<br/>3 CLIENTS IN SYNC</span></div>
      </section>

      <section className="ticker" aria-label="Areas of interest"><div className="ticker-track">{Array.from({ length: 16 }).map((_, i) => <span key={i} aria-hidden={i > 0}>SOFTWARE ENGINEERING <i>✳</i> MACHINE LEARNING <i>✳</i> DATA SYSTEMS <i>✳</i> AUTOMATION <i>✳</i></span>)}</div></section>

      <section className="work-section section-wrap" id="work">
        <div className="section-heading" data-reveal><div><div className="eyebrow dark"><span className="eyebrow-line"/> SELECTED PROJECTS · 2026</div><h2>Projects I’ve built</h2></div></div>
        <div className="project-list">{projects.map((project) => <article className={`project-card project-${project.art}`} key={project.id} data-reveal>
          <div className="project-visual"><ProjectArtwork kind={project.art}/><span className="project-index">{project.id} / {String(projects.length).padStart(2, '0')}</span></div>
          <div className="project-info"><div className="project-kicker"><span>{project.type}</span><span className="project-badges">{project.award && <span className="award">✳ {project.award}</span>}<span className={`project-status ${project.status === 'IN PROGRESS' ? 'is-progress' : ''}`}>{project.status}</span></span></div><div className="project-title-row"><h3>{project.name}<sup>↗</sup></h3><button className={`expand-button ${expanded === project.id ? 'is-open' : ''}`} onClick={() => setExpanded(expanded === project.id ? null : project.id)} aria-expanded={expanded === project.id} aria-label={`${expanded === project.id ? 'Collapse' : 'Expand'} ${project.name} details`}>{expanded === project.id ? '−' : '+'}</button></div><p>{project.description}</p><div className="tech-list">{project.stack.map(item => <span key={item}>{item}</span>)}</div><div className="project-links">{project.devpost && <a href={project.devpost} target="_blank" rel="noreferrer">DEVPOST <Arrow diagonal/></a>}{project.github && <a href={project.github} target="_blank" rel="noreferrer">GITHUB <Arrow diagonal/></a>}</div>{expanded === project.id && <div className="project-extra"><b>THE BUILD</b><p>{project.outcome}</p></div>}</div>
        </article>)}</div>
      </section>

      <section className="manifesto" id="about"><div className="manifesto-side"><span>ABOUT</span><span>PHOENIX / ARIZONA</span></div><div className="manifesto-main" data-reveal><p>Hey! 👋🏽</p><div className="manifesto-lower"><div className="bio-copy"><p>My name is Anhiti. I'm a Computer Science student at Arizona State University with a minor in Data Science. I’m really interested in building things that are both useful and meaningful. Creating projects that make a real impact is what motivates me to keep improving.</p><p>I was first introduced to computer science in middle school through a two-year course, and that’s where my interest in problem-solving and building really began. Since then, I’ve continued exploring areas like software development, security, and data through projects and coursework, and I’m always looking to keep improving.</p><p>Outside of classes, I’ve been involved in leadership and outreach, mentoring students and helping introduce younger students to computer science through workshops. I enjoy making tech more approachable and creating spaces where people feel comfortable learning.</p><p>Right now, I’m focused on gaining hands-on experience, working on projects, and getting involved in opportunities where I can learn, build, and collaborate with others.</p><p>Outside of tech, I love exploring new cafes, watching sunsets and traveling!</p></div><div className="quick-facts"><div><span>01 / STUDY</span><b>Computer Science<br/>+ Data Science</b></div><div><span>02 / GPA</span><b>3.74 <small>/ 4.00</small></b></div><div><span>03 / STATUS</span><b>Looking for software and product roles <i>↗</i></b></div></div></div></div><div className="about-gallery" aria-label="Photos from outside the classroom"><img src="/images/about-festive.webp" alt="Anhiti in a yellow and red outfit at a flower-decorated celebration" loading="lazy" decoding="async"/><img src="/images/about-night.webp" alt="Anhiti enjoying a city night out" loading="lazy" decoding="async"/><img src="/images/about-fair.webp" alt="Anhiti at an outdoor fair" loading="lazy" decoding="async"/><img src="/images/about-portrait.webp" alt="Anhiti dressed for a celebration" loading="lazy" decoding="async"/></div><div className="manifesto-doodle" aria-hidden="true">✳</div></section>

      <section className="experience section-wrap" id="experience"><div className="experience-head" data-reveal><div className="eyebrow dark"><span className="eyebrow-line"/> EXPERIENCE</div><h2>Where I’ve<br/>worked</h2></div><div className="experience-list" data-reveal>
        <div className="experience-group"><h3 className="experience-group-title">Work and research</h3>
          <div className="experience-item"><span className="exp-date">SEP ’26 — NOW</span><div><h3>Research Intern</h3><p>GenYES Program <span>· Speak Out Sisterhood</span></p></div><ul><li>Ran empathy interviews and wrote up the findings to shape a program with Girl Up Singapore.</li></ul></div>
          <div className="experience-item"><span className="exp-date">AUG ’26 — NOW</span><div><h3>Researcher</h3><p>Barrett Fellows Program <span>· Complex Adaptive Systems</span></p></div><ul><li>Researching how course content lines up with current labor-market data.</li></ul></div>
          <div className="experience-item"><span className="exp-date">JUN — AUG ’26</span><div><h3>Systems Automation Intern</h3><p>Pulse Drones</p></div><ul><li>Built a Blender add-on that automated repetitive design tasks, cutting workflow time by about 30% (estimate).</li><li>Built a client portal (React, Node.js, Firebase) that cut routine status emails by about 40% (estimate).</li><li>Set up live data syncing between the admin and client platforms, with updates showing in under a minute.</li><li>Automated asset delivery from internal systems straight to the client portal, so files no longer move by hand.</li></ul></div>
          <div className="experience-item"><span className="exp-date">JUN — JUL ’23</span><div><h3>Global Support and Cloud Operations Intern</h3><p>Axway</p></div><ul><li>Analyzed 2,000+ B2Bi support cases to find recurring failure patterns.</li><li>Wrote 40+ knowledge base articles from those patterns, which cut repeat tickets.</li><li>Automated monthly reporting with Excel and scripting, saving about 5 hours a week.</li><li>Worked with the Cloud Operations team on AWS and shell scripting, and cleaned up internal Confluence docs.</li></ul></div>
        </div>
        <div className="experience-group"><h3 className="experience-group-title">Leadership and campus</h3>
          <div className="experience-item"><span className="exp-date">SEP ’26 — NOW</span><div><h3>Intern</h3><p>ASU Programming and Activities Board</p></div></div>
          <div className="experience-item"><span className="exp-date">MAY ’26 — NOW</span><div><h3>Technical Intern</h3><p>Global Career Network</p></div><ul><li>Built and maintained the club website, adding 3D card tilt, parallax, split-text, and magnetic button interactions, and fixed layout bugs.</li></ul></div>
          <div className="experience-item"><span className="exp-date">AUG ’26 — NOW</span><div><h3>Community Assistant</h3><p>Barrett Honors College</p></div><ul><li>First contact for 40+ residents: check-ins, mediating conflicts, pointing people to campus resources.</li><li>Nightly rounds and incident response, plus move-in and move-out logistics with staff.</li></ul></div>
          <div className="experience-item"><span className="exp-date">JUL ’26 — NOW</span><div><h3>Camp B Facilitator</h3><p>Barrett Honors College</p></div><ul><li>Run small-group activities and discussions that help new Barrett students settle in.</li></ul></div>
          <div className="experience-item"><span className="exp-date">AUG ’25 — NOW</span><div><h3>Peer Mentor</h3><p>Barrett Honors College</p></div><ul><li>Mentor 40+ first-years on academic planning and time management, and host monthly community events.</li></ul></div>
          <div className="experience-item"><span className="exp-date">MAY — AUG ’26</span><div><h3>Conference Committee</h3><p>SWE at ASU · WE26</p></div><ul><li>Helped with logistics for WE26, the regional conference with 300+ attendees.</li></ul></div>
        </div>
      </div></section>

      <section className="recognition"><div className="recognition-title" data-reveal><span>HIGHLIGHTS</span><h2>Hackathon awards</h2></div><div className="recognition-grid" data-reveal><div><span>01 / HACKATHON</span><b>1st Place</b><p>Innovation Hacks 2026 · Google Track · DevLog</p></div><div><span>02 / HACKATHON</span><b>Top 3</b><p>GlobeHack 2026 · RealToGo</p></div></div></section>

      <footer className="contact" id="contact"><div className="contact-top"><div className="eyebrow"><span className="eyebrow-line"/> CONTACT</div><span className="contact-coordinate">PHOENIX, ARIZONA</span></div><h2>Let’s talk.</h2><div className="contact-bottom"><button className="email-button" onClick={copyEmail}>{copied ? 'EMAIL COPIED ✓' : 'ANIVOOTURI@GMAIL.COM'} <Arrow diagonal/></button><div className="socials"><a href="https://linkedin.com/in/anhiti-vooturi-9892a7256" target="_blank" rel="noreferrer">LINKEDIN <Arrow diagonal/></a><a href="https://github.com/anhitivooturi" target="_blank" rel="noreferrer">GITHUB <Arrow diagonal/></a><a href="/resume.pdf" target="_blank" rel="noreferrer">RESUME <Arrow diagonal/></a></div></div><div className="footer-line"><a href="#top">AV®</a><span>DESIGNED AND BUILT BY ANHITI · © 2026</span><a href="#top">BACK TO TOP ↑</a></div></footer>
    </main>
  );
}
