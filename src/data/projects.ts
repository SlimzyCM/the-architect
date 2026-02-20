export interface Project {
  id: string;
  title: string;
  company: string;
  description: string;
  problem: string;
  solution: string;
  impact: string[];
  stack: string[];
  category: 'fintech' | 'enterprise' | 'blockchain' | 'mobile' | 'analytics' | 'ai';
  featured: boolean;
  architectureNodes?: ArchitectureNode[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  tech: string;
  description: string;
  x: number;
  y: number;
  connections: string[];
}

export const projects: Project[] = [
  {
    id: 'qore-fintech',
    title: 'Fintech Payment Infrastructure',
    company: 'Qore',
    description:
      'Architected and modernized a fintech platform serving 10,000+ businesses with event-driven payment systems and cloud-native scalability.',
    problem:
      'Legacy fintech platform on .NET Framework was hitting performance ceilings, with high operational costs and unpredictable release cycles blocking growth.',
    solution:
      'Designed an event-driven PayWithTransfer system using DDD principles. Personally drove the migration from .NET Framework to .NET 6 across multiple core applications. Led the migration of 80% of infrastructure to open-source technologies.',
    impact: [
      '10,000+ businesses served',
      '50% reduction in operational costs',
      '30% revenue increase within a year',
      '20% improvement in release predictability',
    ],
    stack: ['C#', '.NET 6', 'Kubernetes', 'ArgoCD', 'RabbitMQ', 'Event-Driven Architecture', 'DDD'],
    category: 'fintech',
    featured: true,
    architectureNodes: [
      { id: 'api', label: 'API Gateway', tech: '.NET 6 Web API', description: 'RESTful API layer handling merchant requests', x: 50, y: 20, connections: ['events', 'db'] },
      { id: 'events', label: 'Event Bus', tech: 'RabbitMQ', description: 'Event-driven messaging for PayWithTransfer flow', x: 50, y: 50, connections: ['payment', 'notify'] },
      { id: 'payment', label: 'Payment Service', tech: 'DDD / .NET 6', description: 'Domain-driven payment processing with transfer verification', x: 20, y: 80, connections: ['db'] },
      { id: 'notify', label: 'Notification Service', tech: '.NET 6 Worker', description: 'Real-time merchant notifications on payment events', x: 80, y: 80, connections: [] },
      { id: 'db', label: 'Data Store', tech: 'PostgreSQL', description: 'Merchant and transaction persistence layer', x: 50, y: 95, connections: [] },
    ],
  },
  {
    id: '3line-payments',
    title: 'Payment Middleware Platform',
    company: '3Line Card Management',
    description:
      'Enhanced a payment middleware handling 1M+ daily transactions across Nigeria with multi-bank API integration and virtual wallet systems.',
    problem:
      'Payment system needed to scale to handle massive transaction volumes across Nigeria while supporting multiple bank API integrations and complex commission structures.',
    solution:
      'Enhanced the payment middleware to support integration with multiple payment APIs. Developed a virtual account wallet generation and management system with multi-bank API integration. Improved commission profit-sharing algorithms for 5,000+ agents.',
    impact: [
      '1M+ daily payment transactions',
      'Commission calculations for 5,000+ agents',
      '100% compliance with industry standards',
      'Multi-bank API integration',
    ],
    stack: ['C#', '.NET', 'Entity Framework', 'Redis', 'HangFire', 'Docker', 'RabbitMQ', 'MS-SQL'],
    category: 'fintech',
    featured: true,
    architectureNodes: [
      { id: 'gateway', label: 'Payment Gateway', tech: '.NET Web API', description: 'Entry point for all payment requests', x: 50, y: 15, connections: ['middleware'] },
      { id: 'middleware', label: 'Payment Middleware', tech: 'C# / .NET', description: 'Routes to appropriate bank API based on transaction type', x: 50, y: 40, connections: ['bank1', 'bank2', 'wallet'] },
      { id: 'bank1', label: 'Bank API A', tech: 'REST Integration', description: 'First bank partner API integration', x: 15, y: 65, connections: ['queue'] },
      { id: 'bank2', label: 'Bank API B', tech: 'REST Integration', description: 'Second bank partner API integration', x: 50, y: 65, connections: ['queue'] },
      { id: 'wallet', label: 'Virtual Wallet', tech: 'Entity Framework', description: 'Account generation and balance management', x: 85, y: 65, connections: ['db'] },
      { id: 'queue', label: 'Job Queue', tech: 'HangFire + Redis', description: 'Commission calculations and async processing', x: 30, y: 90, connections: ['db'] },
      { id: 'db', label: 'Database', tech: 'MS-SQL', description: 'Transaction records, wallets, and commission data', x: 70, y: 90, connections: [] },
    ],
  },
  {
    id: 'rufus-bravura',
    title: 'Enterprise Fund Administration',
    company: 'Rufus — Bravura Solutions',
    description:
      'Modernized fund administration with AWS microservices architecture, achieving 90% test coverage and recognized by management for exceptional code quality.',
    problem:
      'Complex fund administration and transfer agency solution needed modernized architecture to improve scalability and reduce post-deployment issues.',
    solution:
      'Implemented AWS microservices architecture using Lambda, API Gateway, and DynamoDB. Applied rigorous Test-Driven Development practices achieving 90% code coverage.',
    impact: [
      '40% improvement in system scalability',
      '90% code coverage',
      '65% reduction in post-deployment bugs',
      'Recognized by management for exceptional quality',
    ],
    stack: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'Jest', 'NUnit', '.NET', 'Microservices'],
    category: 'enterprise',
    featured: true,
  },
  {
    id: 'blockchain-trees',
    title: 'Blockchain Environmental App',
    company: 'Decagon Institute',
    description:
      'Deployed a groundbreaking blockchain application on AWS that geo-tagged and identified trees, benefiting over 100,000 users and reducing illegal logging by 30%.',
    problem:
      'Illegal logging was causing significant environmental damage with no effective large-scale tracking or prevention system in place.',
    solution:
      'Built a blockchain application on AWS infrastructure using EC2 for hosting, S3 for storage, and DynamoDB for data management. The app geo-tagged and identified trees using blockchain for immutable record-keeping.',
    impact: [
      '100,000+ users',
      '30% reduction in illegal logging',
      'Blockchain-verified tree records',
      'AWS-powered scalable infrastructure',
    ],
    stack: ['React', 'Blockchain', 'AWS EC2', 'AWS S3', 'DynamoDB', 'Node.js'],
    category: 'blockchain',
    featured: true,
  },
  {
    id: 'groundforce-kyc',
    title: 'KYC Mobile Application',
    company: 'GroundForce — Trapezoid',
    description:
      'Built a mobile application for financial institutions to perform Know-Your-Customer procedures and surveys with a serverless backend.',
    problem:
      'Financial institutions needed a streamlined mobile solution for field agents performing KYC verification and customer surveys.',
    solution:
      'Developed React Native frontend with TDD methodology. Implemented AWS Cognito for authentication and Lambda for serverless backend. Created microservices architecture for scalable data management.',
    impact: [
      '85% test coverage',
      'Scalable microservices architecture',
      'Secure authentication with AWS Cognito',
      'Streamlined KYC process for field agents',
    ],
    stack: ['React Native', 'AWS Cognito', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'Jest'],
    category: 'mobile',
    featured: false,
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    company: '$6bn Career Recruiting Platform',
    description:
      'Built a specialized React analytics dashboard with AWS data pipelines, achieving zero critical bugs in production through rigorous TDD.',
    problem:
      'A major healthcare recruiting platform needed data insights and visualization to identify trends, outliers, and correlations in client datasets.',
    solution:
      'Built using React with Redux following TDD best practices. Implemented AWS-based data pipelines using Glue and Athena for analysis. Achieved 90% test coverage resulting in zero critical production bugs.',
    impact: [
      '90% test coverage',
      'Zero critical bugs in production',
      'Real-time data visualization',
      'Automated data analysis pipelines',
    ],
    stack: ['React', 'Redux', 'AWS Glue', 'AWS Athena', 'Lambda', 'S3', 'Jest'],
    category: 'analytics',
    featured: true,
  },
];
