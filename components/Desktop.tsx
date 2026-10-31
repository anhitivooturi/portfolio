'use client';

import { useEffect, useMemo, useState } from 'react';
import { aboutContent, contactContent, desktopIcons, educationContent, experienceContent, leadershipContent, projectsContent, resumeContent, skillsContent } from '../data/content';
import DesktopIcon from './Icon';
import Window from './Window';
import Taskbar from './Taskbar';
import PersonIcon from './icons/PersonIcon';
import FolderIcon from './icons/FolderIcon';
import ToolboxIcon from './icons/ToolboxIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import TrophyIcon from './icons/TrophyIcon';
import DocumentIcon from './icons/DocumentIcon';
import MailIcon from './icons/MailIcon';

type WindowTypes =
  | 'about'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'leadership'
  | 'resume'
  | `project-${string}`;

type OpenWindow = {
  id: string;
  type: WindowTypes;
  title: string;
  x: number;
  y: number;
  minimized: boolean;
  zIndex: number;
};

const iconMap: Record<string, JSX.Element> = {
  about: <PersonIcon />,
  projects: <FolderIcon />,
  skills: <ToolboxIcon />,
  experience: <MailIcon />,
  leadership: <TrophyIcon />,
  resume: <DocumentIcon />,
};

const projectIcon = <FolderIcon />;

const getWindowTitle = (type: WindowTypes) => {
  if (type.startsWith('project-')) {
    const project = projectsContent.projects.find((project) => `project-${project.slug}` === type);
    return project ? project.title : 'Project';
  }

  const titles: Record<Exclude<WindowTypes, `project-${string}`>, string> = {
    about: 'About Me',
    projects: 'Projects',
    skills: 'Skills',
    experience: 'Experience',
    leadership: 'Leadership',
    resume: 'Resume',
  };

  return titles[type as Exclude<WindowTypes, `project-${string}`>] ?? 'Window';
};

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [isBooting, setIsBooting] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [clock, setClock] = useState(() => new Date());

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsBooting(false), 2100);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setClock(new Date()), 60000);
    return () => window.clearInterval(interval);
  }, []);

  const timeString = useMemo(
    () => clock.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    [clock]
  );

  const bringToFront = (id: string) => {
    setOpenWindows((current) =>
      current.map((window) => ({
        ...window,
        zIndex: window.id === id ? Math.max(...current.map((item) => item.zIndex), 0) + 1 : window.zIndex,
      }))
    );
    setActiveWindowId(id);
  };

  const openWindow = (type: WindowTypes) => {
    setOpenWindows((current) => {
      const existing = current.find((window) => window.type === type && window.id === `${type}`);
      if (existing) {
        return current.map((window) =>
          window.id === existing.id
            ? { ...window, minimized: false, zIndex: Math.max(...current.map((item) => item.zIndex), 0) + 1 }
            : window
        );
      }

      const nextZ = current.length ? Math.max(...current.map((window) => window.zIndex)) + 1 : 10;
      const offset = current.length * 26;
      return [
        ...current,
        {
          id: `${type}`,
          type,
          title: getWindowTitle(type),
          x: 80 + offset,
          y: 80 + offset,
          minimized: false,
          zIndex: nextZ,
        },
      ];
    });
    setActiveWindowId(`${type}`);
  };

  const openProjectWindow = (slug: string) => {
    const type = `project-${slug}` as WindowTypes;
    setOpenWindows((current) => {
      const existing = current.find((window) => window.type === type);
      if (existing) {
        return current.map((window) =>
          window.id === existing.id
            ? { ...window, minimized: false, zIndex: Math.max(...current.map((item) => item.zIndex), 0) + 1 }
            : window
        );
      }

      const nextZ = current.length ? Math.max(...current.map((window) => window.zIndex)) + 1 : 10;
      const offset = current.length * 18;
      return [
        ...current,
        {
          id: type,
          type,
          title: getWindowTitle(type),
          x: 100 + offset,
          y: 100 + offset,
          minimized: false,
          zIndex: nextZ,
        },
      ];
    });
    setActiveWindowId(type);
  };

  const closeWindow = (id: string) => {
    setOpenWindows((current) => current.filter((window) => window.id !== id));
    setActiveWindowId((currentActive) => (currentActive === id ? null : currentActive));
  };

  const minimizeWindow = (id: string) => {
    setOpenWindows((current) => current.map((window) => (window.id === id ? { ...window, minimized: true } : window)));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const restoreWindow = (id: string) => {
    setOpenWindows((current) =>
      current.map((window) =>
        window.id === id
          ? { ...window, minimized: false, zIndex: Math.max(...current.map((item) => item.zIndex), 0) + 1 }
          : window
      )
    );
    setActiveWindowId(id);
  };

  const projectWindows = projectsContent.projects.map((project) => ({
    ...project,
    id: `project-${project.slug}`,
  }));

  const renderWindowChildren = (type: WindowTypes) => {
    if (type === 'about') {
      return (
        <div className="space-y-4 text-[#6b4a63]">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="h-32 w-32 rounded-3xl border border-[#e3d4ff] bg-[#ffe8f4] p-3">
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white/90 text-center text-[11px] uppercase tracking-[0.2em] text-[#6b4a63]">
                Photo
                <br />Coming Soon
              </div>
            </div>
            <div className="space-y-2">
              <p>{aboutContent.intro}</p>
              <p className="font-semibold text-[#6b4a63]">{aboutContent.tagline}</p>
            </div>
          </div>
          <div className="grid gap-2 rounded-3xl border border-[#e3d4ff]/60 bg-white/90 p-3 text-[11px] text-[#6b4a63] shadow-sm">
            <div className="uppercase tracking-[0.18em] text-[#6b4a63]">Academic Snapshot</div>
            <div>Barrett Honors College, Arizona State University</div>
            <div>Graduation: May 2027</div>
            <div>GPA: 3.97 / 4.0</div>
          </div>
          <div className="grid gap-2 rounded-3xl border border-[#e3d4ff]/60 bg-white/90 p-3 text-[11px] text-[#6b4a63] shadow-sm">
            <div className="uppercase tracking-[0.18em] text-[#6b4a63]">Contact</div>
            <div>
              <div className="font-semibold text-[#6b4a63]">Email</div>
              <a href={`mailto:${contactContent.email}`} className="text-[#6b4a63] hover:text-[#8d6b84]">
                {contactContent.email}
              </a>
            </div>
            <div>
              <div className="font-semibold text-[#6b4a63]">LinkedIn</div>
              <a href={contactContent.linkedin} target="_blank" rel="noreferrer" className="text-[#6b4a63] hover:text-[#8d6b84]">
                linkedin.com/in/anhiti-vooturi-9892a7256
              </a>
            </div>
            <div>
              <div className="font-semibold text-[#6b4a63]">GitHub</div>
              <a href={contactContent.github} target="_blank" rel="noreferrer" className="text-[#6b4a63] hover:text-[#8d6b84]">
                github.com/anhitivooturi
              </a>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'projects') {
      return (
        <div className="space-y-4 text-[#6b4a63]">
          <p>{projectsContent.description}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {projectsContent.projects.map((project) => (
              <button
                key={project.slug}
                type="button"
                onClick={() => openProjectWindow(project.slug)}
                className="group flex flex-col items-start gap-2 rounded-3xl border border-[#e3d4ff]/60 bg-white/90 p-3 text-left transition hover:border-[#c9b8ff] hover:bg-[#ffe8f4]"
                aria-label={`Open ${project.title}`}
              >
                <div className="h-14 w-14 rounded-3xl bg-[#ffe8f4] p-2 text-[#6b4a63]">{projectIcon}</div>
                <div>
                  <div className="font-bold text-[#6b4a63]">{project.title}</div>
                  <div className="text-[11px] text-[#6b4a63]/70">{project.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#6b4a63]/60">Double click the project icon on the desktop to reopen this launcher.</p>
        </div>
      );
    }

    if (type === 'skills') {
      return (
        <div className="space-y-4 text-[#6b4a63]">
          {skillsContent.categories.map((category) => (
            <div key={category.title} className="rounded-3xl border border-[#e3d4ff]/60 bg-white/90 p-3">
              <div className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#6b4a63]">{category.title}</div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#e3d4ff]/50 bg-[#ffe8f4] px-3 py-1 text-[11px] text-[#6b4a63]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (type === 'experience') {
      return (
        <div className="space-y-4 text-[#6b4a63]">
          {experienceContent.items.map((item) => (
            <div key={item.role} className="rounded-3xl border border-[#e3d4ff]/60 bg-white/90 p-3">
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-bold text-[#6b4a63]">{item.role}</div>
                  <div className="text-[11px] text-[#6b4a63]/70">{item.company} - {item.location}</div>
                </div>
                <div className="text-[11px] text-[#6b4a63]/70">{item.dates}</div>
              </div>
              <ul className="mt-3 list-disc space-y-2 pl-4 text-[11px] text-[#6b4a63]">
                {item.bullets.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }

    if (type === 'leadership') {
      return (
        <div className="space-y-4 text-[#6b4a63]">
          {leadershipContent.items.map((item) => (
            <div key={item.title} className="rounded-3xl border border-[#e3d4ff]/60 bg-white/90 p-3">
              <div className="text-sm font-bold text-[#6b4a63]">{item.title}</div>
              <div className="mb-2 text-[11px] text-[#6b4a63]/70">{item.organization} - {item.date}</div>
              <div className="text-[11px]">{item.description}</div>
            </div>
          ))}
        </div>
      );
    }

    if (type === 'resume') {
      return (
        <div className="space-y-4 text-[#6b4a63]">
          <p>{resumeContent.description}</p>
          <a
            href={resumeContent.filePath}
            download
            className="inline-flex items-center justify-center rounded-3xl border border-[#e3d4ff]/70 bg-[#ffd6ec] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6b4a63] shadow-sm"
          >
            Download resume
          </a>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#6b4a63]/60">Replace /resume.pdf in public with your final resume file.</p>
        </div>
      );
    }


    if (type.startsWith('project-')) {
      const slug = type.replace('project-', '');
      const project = projectsContent.projects.find((project) => project.slug === slug);
      if (!project) {
        return <div className="text-[#6b4a63]">Project data not found.</div>;
      }
      return (
        <div className="space-y-4 text-[#6b4a63]">
          <div className="space-y-1 rounded-3xl border border-[#e3d4ff]/60 bg-white/90 p-4">
            <div className="text-sm font-bold text-[#6b4a63]">{project.subtitle}</div>
            <div className="text-[11px] text-[#6b4a63]/80">{project.description}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((stack) => (
              <span key={stack} className="rounded-full border border-[#e3d4ff]/50 bg-[#ffe8f4] px-3 py-1 text-[11px] text-[#6b4a63]">
                {stack}
              </span>
            ))}
          </div>
          <div className="rounded-3xl border border-[#e3d4ff]/60 bg-white/90 p-3 text-[11px] text-[#6b4a63]">
            <div className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#6b4a63]">Demo</div>
            <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-[#e3d4ff]/50 bg-[#6b4a63]/10 text-center text-[11px] text-[#6b4a63]">
              <iframe
                title={`${project.title} demo`}
                src="about:blank"
                className="h-full w-full"
                aria-label={`${project.title} video placeholder`}
              />
            </div>
            <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#6b4a63]/60">// TODO: replace iframe src with the real {project.title} demo video link</p>
          </div>
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-3xl border border-[#e3d4ff]/70 bg-[#ffd6ec] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6b4a63] shadow-sm"
          >
            View GitHub repo
          </a>
          <div className="rounded-3xl border border-[#e3d4ff]/60 bg-white/90 p-3 text-[11px] text-[#6b4a63]">
            <ul className="list-disc space-y-2 pl-4">
              {project.bullets.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    return <div className="text-[#6b4a63]">No content available.</div>;
  };

  const desktopIconComponents: Record<string, JSX.Element> = {
    about: <PersonIcon />,
    projects: <FolderIcon />,
    skills: <ToolboxIcon />,
    experience: <MailIcon />,
    leadership: <TrophyIcon />,
    resume: <DocumentIcon />,
  };

  return (
    <div className="desktop-shell wallpaper relative min-h-screen overflow-hidden">
      {isBooting ? (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center text-[#6b4a63]">
          <div className="rounded-3xl border border-[#c9b8ff] bg-white/95 px-8 py-10 text-sm text-[#6b4a63] shadow-[0_12px_34px_rgba(107,74,99,0.18)]">
            <div className="mb-6 text-lg font-semibold accent-font">Starting AnhitiOS...</div>
            <div className="h-4 w-72 overflow-hidden rounded-full border border-[#e3d4ff] bg-[#ffe8f4]">
              <div className="h-full w-3/4 animate-progress rounded-full bg-[#c9b8ff]" />
            </div>
          </div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#8d6b84]">Boot sequence complete.</div>
        </div>
      ) : (
        <>
          <div className="absolute left-6 top-6 z-10 grid w-max grid-cols-2 gap-4">
            {desktopIcons.map((icon) => (
              <DesktopIcon
                key={icon.id}
                label={icon.label}
                icon={desktopIconComponents[icon.id]}
                onActivate={() => openWindow(icon.id as WindowTypes)}
                ariaLabel={`Open ${icon.label}`}
              />
            ))}
          </div>
          {openWindows.map((windowItem) => (
            <Window
              key={windowItem.id}
              id={windowItem.id}
              title={windowItem.title}
              icon={iconMap[windowItem.type as string] ?? projectIcon}
              zIndex={windowItem.zIndex}
              position={{ x: windowItem.x, y: windowItem.y }}
              active={activeWindowId === windowItem.id}
              minimized={windowItem.minimized}
              isMobile={isMobile}
              onClose={() => closeWindow(windowItem.id)}
              onMinimize={() => minimizeWindow(windowItem.id)}
              onFocus={() => bringToFront(windowItem.id)}
            >
              {renderWindowChildren(windowItem.type)}
            </Window>
          ))}
          <Taskbar
            openWindows={openWindows.map((windowItem) => ({
              id: windowItem.id,
              title: windowItem.title,
              minimized: windowItem.minimized,
            }))}
            activeWindowId={activeWindowId}
            clockLabel={timeString}
            onActivateWindow={restoreWindow}
          />
        </>
      )}
    </div>
  );
}
