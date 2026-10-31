import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Anhiti Vooturi | Software Engineering & Product Management',
  description: 'Computer Science student at ASU building software and automation tools, with an interest in product planning and delivery.',
  openGraph: {
    title: 'Anhiti Vooturi | Software Engineering & Product Management',
    description: 'Computer Science student at ASU building software and automation tools, with an interest in product planning and delivery.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Anhiti Vooturi | Software Engineering & Product Management', description: 'Computer Science student at ASU building software and automation tools, with an interest in product planning and delivery.' },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Anhiti Vooturi',
  email: 'anivooturi@gmail.com',
  url: 'https://github.com/anhitivooturi',
  sameAs: ['https://linkedin.com/in/anhiti-vooturi-9892a7256', 'https://github.com/anhitivooturi'],
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Arizona State University' },
  knowsAbout: ['Software Engineering', 'Machine Learning', 'Data Science', 'Systems Automation'],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}/></body></html>;
}
