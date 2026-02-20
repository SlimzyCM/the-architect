export interface Skill {
  name: string;
  icon?: string;
  proficiency: number; // 1-100
  years: number;
}

export interface SkillCategory {
  label: string;
  color: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: 'Backend & Core',
    color: '#00d4ff',
    skills: [
      { name: 'C#', proficiency: 95, years: 8 },
      { name: '.NET / ASP.NET Core', proficiency: 95, years: 8 },
      { name: 'Node.js', proficiency: 88, years: 6 },
      { name: 'NestJS', proficiency: 80, years: 3 },
      { name: 'Express', proficiency: 85, years: 6 },
      { name: 'Golang', proficiency: 60, years: 2 },
      { name: 'PHP', proficiency: 65, years: 3 },
    ],
  },
  {
    label: 'Frontend',
    color: '#7b61ff',
    skills: [
      { name: 'React', proficiency: 92, years: 6 },
      { name: 'Angular', proficiency: 85, years: 5 },
      { name: 'Vue.js', proficiency: 75, years: 3 },
      { name: 'Next.js', proficiency: 80, years: 3 },
      { name: 'Blazor', proficiency: 82, years: 3 },
      { name: 'TypeScript', proficiency: 90, years: 5 },
      { name: 'Tailwind CSS', proficiency: 88, years: 4 },
      { name: 'Redux', proficiency: 85, years: 5 },
    ],
  },
  {
    label: 'Cloud & DevOps',
    color: '#ff6b35',
    skills: [
      { name: 'AWS Lambda', proficiency: 88, years: 5 },
      { name: 'AWS S3 / EC2', proficiency: 85, years: 5 },
      { name: 'AWS DynamoDB', proficiency: 82, years: 4 },
      { name: 'AWS SQS / SNS', proficiency: 80, years: 4 },
      { name: 'Azure Cloud', proficiency: 85, years: 5 },
      { name: 'Docker', proficiency: 88, years: 5 },
      { name: 'Kubernetes', proficiency: 80, years: 3 },
      { name: 'Terraform', proficiency: 75, years: 2 },
      { name: 'CI/CD Pipelines', proficiency: 88, years: 5 },
    ],
  },
  {
    label: 'Data & Messaging',
    color: '#ff2d95',
    skills: [
      { name: 'PostgreSQL', proficiency: 88, years: 6 },
      { name: 'MS-SQL', proficiency: 90, years: 8 },
      { name: 'MongoDB', proficiency: 82, years: 5 },
      { name: 'Redis', proficiency: 85, years: 5 },
      { name: 'CosmosDB', proficiency: 72, years: 2 },
      { name: 'RabbitMQ', proficiency: 82, years: 4 },
      { name: 'Elastic Search', proficiency: 70, years: 2 },
    ],
  },
  {
    label: 'Testing & Quality',
    color: '#22c55e',
    skills: [
      { name: 'Jest', proficiency: 90, years: 5 },
      { name: 'NUnit / XUnit', proficiency: 90, years: 7 },
      { name: 'Cypress', proficiency: 82, years: 3 },
      { name: 'React Testing Library', proficiency: 88, years: 4 },
      { name: 'Selenium', proficiency: 75, years: 3 },
      { name: 'TDD Methodology', proficiency: 92, years: 6 },
    ],
  },
  {
    label: 'Architecture',
    color: '#f59e0b',
    skills: [
      { name: 'Microservices', proficiency: 92, years: 5 },
      { name: 'Event-Driven Architecture', proficiency: 88, years: 4 },
      { name: 'Domain-Driven Design', proficiency: 85, years: 4 },
      { name: 'RESTful APIs', proficiency: 95, years: 8 },
      { name: 'GraphQL', proficiency: 78, years: 3 },
      { name: 'SOLID Principles', proficiency: 92, years: 7 },
      { name: 'Design Patterns', proficiency: 90, years: 7 },
    ],
  },
];
