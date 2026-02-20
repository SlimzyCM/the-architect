export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  startYear: number;
  endYear: number | null;
  description: string;
  highlights: string[];
  stack: string[];
}

export const experiences: Experience[] = [
  {
    id: 'mission',
    role: 'Senior Full-Stack Engineering Consultant',
    company: 'Mission (ePACT Network)',
    location: 'North Vancouver, Canada',
    period: 'May 2022 — Present',
    startYear: 2022,
    endYear: null,
    description:
      'Leading .NET 8 migration, building scalable microservices, and mentoring a team of 8 developers with a focus on TDD and cloud-native architecture.',
    highlights: [
      'Leading migration of ASP.NET Core MVC to .NET 8 with 90% code coverage',
      'Architected microservices with AWS Lambda, API Gateway, and DynamoDB — 30% performance improvement',
      'Created reusable Blazor components reducing code duplication by 30%',
      'Established coding standards and review processes — 50% reduction in production bugs',
      'Mentored junior developers, improving team productivity by 25%',
    ],
    stack: ['.NET 8', 'Blazor', 'React', 'AWS', 'Azure DevOps', 'SignalR', 'Docker'],
  },
  {
    id: 'qore',
    role: 'Function Lead',
    company: 'Qore',
    location: 'Lagos, Nigeria',
    period: 'Oct 2021 — Jun 2024',
    startYear: 2021,
    endYear: 2024,
    description:
      'Led fintech infrastructure development, designed event-driven payment systems, and drove platform modernization scaling to 10,000+ businesses.',
    highlights: [
      'Designed event-driven PayWithTransfer system using DDD principles',
      'Upgraded multiple core apps from .NET Framework to .NET 6',
      'Migrated 80% of infrastructure to open-source — 50% cost reduction',
      'Contributed to merchant lending platform serving 10,000+ businesses',
      'Implemented automated monitoring reducing incident response times',
    ],
    stack: ['C#', '.NET 6', 'Kubernetes', 'ArgoCD', 'RabbitMQ', 'PostgreSQL'],
  },
  {
    id: 'voodoo-park',
    role: 'Software Engineering Consultant',
    company: 'Voodoo Park',
    location: 'London, UK',
    period: 'Jul 2021 — May 2023',
    startYear: 2021,
    endYear: 2023,
    description:
      'Enterprise consulting for PwC products and Bravura Solutions, improving architecture and delivering knowledge transfer across teams.',
    highlights: [
      'Maintained and improved Rufus Enterprise solution (Bravura Solutions)',
      'Improved codebase architecture with clear abstractions and decoupled components',
      'Provided written knowledge transfer material on enhancements',
      'Effectively managed PwC product software functionalities',
    ],
    stack: ['.NET', 'C#', 'AWS', 'Enterprise Architecture'],
  },
  {
    id: '3line',
    role: 'Senior Software Engineer',
    company: '3Line Card Management',
    location: 'Lagos, Nigeria',
    period: 'Jun 2021 — Jan 2022',
    startYear: 2021,
    endYear: 2022,
    description:
      'Engineered high-volume payment systems processing 1M+ daily transactions with multi-bank API integration across Nigeria.',
    highlights: [
      'Enhanced payment middleware supporting 1M+ daily transactions',
      'Developed virtual account wallet with multi-bank API integration',
      'Improved commission algorithms for 5,000+ agents',
      'Achieved 100% compliance with industry best practices',
    ],
    stack: ['C#', '.NET', 'Entity Framework', 'Redis', 'HangFire', 'Docker', 'RabbitMQ', 'MS-SQL'],
  },
  {
    id: 'decagon',
    role: 'Software Engineer',
    company: 'Decagon Institute',
    location: 'Austin, Texas, USA',
    period: 'Jun 2020 — Aug 2021',
    startYear: 2020,
    endYear: 2021,
    description:
      'Built blockchain applications, deployed LLM chatbots, and mentored developers while delivering technical content in a structured learning environment.',
    highlights: [
      'Deployed blockchain app benefiting 100,000+ users — 30% reduction in illegal logging',
      'Built LLM chatbot reducing support tickets by 40%',
      'Led Multi-Party "War Room" feature for $8M accounts',
      'Mentored junior/intermediate developers — 20% increase in team proficiency',
    ],
    stack: ['React', 'Node.js', 'AWS', 'Blockchain', 'DynamoDB', 'Angular'],
  },
  {
    id: 'snet',
    role: 'Full-Stack Developer → Senior Full-Stack Engineer',
    company: 'SNET Track Services',
    location: 'Lagos, Nigeria',
    period: 'Aug 2016 — Jun 2020',
    startYear: 2016,
    endYear: 2020,
    description:
      'Started as a Full-Stack Developer and grew into a Senior role — building real-time enterprise applications, tracking systems, and leading frontend rebuilds.',
    highlights: [
      'Rebuilt company landing page with improved architecture',
      'Developed client reporting application with self-service capabilities',
      'Enhanced tracking system middleware for newer technology integrations',
      'Built real-time applications that are scalable, maintainable, and testable',
      'Led implementation of Dark mode — 25% increase in user satisfaction',
    ],
    stack: ['C#', '.NET Framework', 'React', 'Angular', 'Entity Framework', 'MS-SQL', 'WCF'],
  },
];

export const certifications = [
  { name: 'Microsoft Certified: Azure AI Engineer Associate', issuer: 'Microsoft', icon: '🔷' },
  { name: 'Google Africa Cloud Engineering Expert', issuer: 'Google', icon: '☁️' },
  { name: "CS50's Introduction to Computer Science", issuer: 'Harvard', icon: '🎓' },
  { name: 'Advanced Machine Learning .NET Applications', issuer: 'LinkedIn', icon: '🤖' },
  { name: 'Machine Learning with ML.NET', issuer: 'LinkedIn', icon: '🧠' },
  { name: 'Cybersecurity Foundations', issuer: 'LinkedIn', icon: '🔒' },
  { name: 'Scrum Fundamentals Certified', issuer: 'SCRUMstudy', icon: '📋' },
  { name: 'Microsoft Azure Fundamentals', issuer: 'Microsoft', icon: '☁️' },
];

export const education = [
  {
    degree: "Master's Degree, Computer Science",
    school: 'University of Benin',
    location: 'Edo State, Nigeria',
    period: '2021 — 2023',
  },
  {
    degree: 'Higher National Diploma, Computer Science',
    school: 'Heritage Polytechnic',
    location: 'Akwa-Ibom, Nigeria',
    period: '2015 — 2017',
    gpa: '3.70 / 4.00',
  },
];
