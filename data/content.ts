export const aboutContent = {
  title: 'About Me',
  intro:
    "Hi, I'm Anhiti - a CS + Data Science student at ASU's Barrett Honors College (graduating May 2027, GPA 3.97/4.0), building AI-powered tools and competing in hackathons.",
  tagline:
    'Interested in software engineering, AI/ML, data science, and product management roles.',
  photo: 'coming soon',
};

export const resumeContent = {
  title: 'Resume',
  description:
    'This resume is available as a direct PDF download. Replace /resume.pdf with a final file in the public directory.',
  filePath: '/resume.pdf',
};

export const projectsContent = {
  title: 'Projects',
  description: 'Click a project icon to inspect the build, demo, and repo links.',
  projects: [
    {
      slug: 'fitai',
      title: 'FitAI',
      subtitle: '1st Place, Google Track, Innovation Hacks (Apr 2026)',
      description:
        'Privacy-first multimodal AI fitness & PT platform with on-device pose scoring and Gemini-powered coaching.',
      tech: ['Python', 'PyTorch', 'MediaPipe Pose', 'Gemini API', 'PostgreSQL', 'Firebase'],
      video: 'Coming soon',
      repo: 'Coming soon',
      bullets: [
        'Real-time computer vision pipeline using MediaPipe Pose to map 33 body landmarks at 30 FPS.',
        'Privacy-preserving edge inference - raw sensor data never leaves the device.',
        'Gemini-powered coaching layer generating personalized, multilingual feedback.',
        'Clinical PT dashboard for therapists to define rehab protocols and track compliance.',
      ],
    },
    {
      slug: 'devlog',
      title: 'DevLog',
      subtitle: 'AI Development Memory Layer',
      description:
        'AI-powered developer memory layer that tracks repo changes and generates easy-to-read explanations.',
      tech: ['Python', 'FastAPI', 'Firebase Firestore', 'Gemini API', 'ElevenLabs'],
      video: 'Coming soon',
      repo: 'Coming soon',
      bullets: [
        'Tracks code changes and generates developer-friendly explanations.',
        'Synced updates across React dashboard, FastAPI backend, and VS Code extension.',
        'Used LLMs to parse and summarize multi-file code diffs.',
      ],
    },
    {
      slug: 'realtogo',
      title: 'Realtogo',
      subtitle: 'Top 3, GlobeHack (Apr 2026)',
      description:
        'WhatsApp AI Real Estate Assistant that routes multimodal buyer signals to structured listings.',
      tech: ['Node.js', 'Express', 'Twilio', 'Gemini API', 'Supabase', 'ElevenLabs'],
      video: 'Coming soon',
      repo: 'Coming soon',
      bullets: [
        'End-to-end real estate workflows via WhatsApp for voice, text, and location inputs.',
        'Real-time webhook pipeline routing multimodal messages through AI processing.',
      ],
    },
    {
      slug: 'recruitflow',
      title: 'RecruitFlow',
      subtitle: 'Highlighted by Judges, HackAZona (Apr 2026)',
      description:
        'Recruiting workflow automation tool that centralizes candidate communication and stage tracking.',
      tech: ['React', 'Node.js', 'Express'],
      video: 'Coming soon',
      repo: 'Coming soon',
      bullets: [
        'Centralized candidate communication and tracking across 5+ pipeline stages.',
        'Scalable data structures for concurrent recruiter workflows.',
      ],
    },
  ],
};

export const skillsContent = {
  title: 'Skills',
  categories: [
    {
      title: 'Languages',
      items: ['Python', 'Java', 'C/C++', 'JavaScript', 'TypeScript', 'SQL (PostgreSQL)'],
    },
    {
      title: 'ML / AI',
      items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'MediaPipe Pose', 'Gemini API', 'Google Vision API', 'LLMs', 'RAG'],
    },
    {
      title: 'Frameworks & Tools',
      items: ['FastAPI', 'Flask', 'Node.js', 'Express', 'React', 'Next.js', 'Firebase', 'Supabase', 'AWS', 'Docker', 'Git', 'Twilio'],
    },
    {
      title: 'Data & APIs',
      items: ['Lightcast API', 'Statistical Analysis', 'Multimodal Sensing', 'Privacy-Preserving ML'],
    },
    {
      title: 'Methods',
      items: ['Machine Learning Algorithms', 'Interactive Prototype Evaluation', 'Quantitative Data Modeling'],
    },
  ],
};

export const experienceContent = {
  title: 'Experience',
  items: [
    {
      role: 'Systems Automation Engineer Intern',
      company: 'Pulse Drones LLC',
      location: 'Tempe, AZ',
      dates: 'May 2026 – Present',
      bullets: [
        'Engineers internal tools and business software to automate workflows and optimize data extraction pipelines.',
        'Builds relational data models and statistical reporting frameworks for flight log processing and operational metrics.',
        'Collaborates with multidisciplinary teams to deploy real-time software systems and evaluate embedded components.',
      ],
    },
    {
      role: 'Researcher, AI & Data Systems',
      company: 'Barrett Fellows Program',
      location: 'Tempe, AZ',
      dates: 'Apr 2026 – Present',
      bullets: [
        'Leads research integrating academic curriculum datasets with real-time labor market indexes (Lightcast API) to surface skill-gap insights.',
        'Applies statistics and quantitative modeling to map multivariable skill relationships across academic and industry domains.',
        'Designs comparison logic and visualization systems to communicate alignment trends to stakeholders.',
      ],
    },
    {
      role: 'Global Support & Cloud Operations Intern',
      company: 'Axway',
      location: 'Phoenix, AZ',
      dates: 'Jun 2023 – Jul 2023',
      bullets: [
        'Analyzed 2,000+ B2Bi support case logs with Python scripts to identify failure patterns and root causes.',
        'Authored 40+ technical knowledge base articles standardizing resolution workflows.',
        'Automated recurring Excel-based reporting workflows.',
      ],
    },
  ],
};

export const leadershipContent = {
  title: 'Leadership & Activities',
  items: [
    {
      title: 'Camp B Facilitator',
      organization: 'Barrett Honors College, ASU',
      date: '2026',
      description:
        'Supported incoming Barrett students through a transition-focused community-building camp; facilitated small-group activities promoting belonging and successful transition.',
    },
    {
      title: 'Peer Mentor',
      organization: 'Barrett Honors College, ASU',
      date: '2025 – Present',
      description:
        'Guides 40+ first-year Barrett students through weekly check-ins on academic planning, time management, and campus resources; hosts monthly community events.',
    },
  ],
};

export const educationContent = {
  title: 'Education',
  school: 'Arizona State University, Barrett Honors College',
  degree: 'B.S. Computer Science, Minor in Data Science',
  date: 'Expected May 2027',
  gpa: '3.97/4.0',
  coursework: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Computer Systems & Assembly', 'Linear Algebra', 'Statistical Modeling', 'Digital Design'],
};

export const contactContent = {
  title: 'Contact',
  email: 'anivooturi@gmail.com',
  linkedin: 'https://linkedin.com/in/anhiti-vooturi-9892a7256',
  github: 'https://github.com/anhitivooturi',
};

export const desktopIcons = [
  { id: 'about', label: 'About Me' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'resume', label: 'Resume' },
];
