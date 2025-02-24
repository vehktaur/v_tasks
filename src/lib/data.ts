import { Task } from './schemas';

export const timeOptions = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 || 12; // Convert 0-23 to 12-hour format
  const period = i < 12 ? 'am' : 'pm';
  return `${hour}:00 ${period}`;
});

export const tasks: Task[] = [
  {
    id: '1',
    name: 'Write a blog post',
    description: 'Outline the top 10 productivity tips for professionals.',
    priority: 'high',
    deadline: '2024-08-26',
    time: '2:00 pm',
    status: 'pending',
  },
  {
    id: '2',
    name: 'Watch a Frontend Tutorial',
    description: 'Complete the React performance optimization module.',
    priority: 'medium',
    deadline: '2024-08-27',
    time: '4:30 pm',
    status: 'pending',
  },
  {
    id: '3',
    name: 'Organize a charity event',
    description: 'Plan a community outreach event for underprivileged kids.',
    priority: 'low',
    deadline: '2024-09-05',
    time: '10:00 am',
    status: 'completed',
  },
  {
    id: '4',
    name: 'Improve cards readability',
    description: 'Refactor the UI to enhance card legibility and spacing.',
    priority: 'high',
    deadline: '2024-08-30',
    time: '12:00 pm',
    status: 'completed',
  },
  {
    id: '5',
    name: 'Fix checkout page bug',
    description: 'Resolve issues causing incorrect order total calculations.',
    priority: 'high',
    deadline: '2024-09-02',
    time: '9:45 am',
    status: 'pending',
  },
  {
    id: '6',
    name: 'Prepare for team presentation',
    description: 'Create slides and rehearse for the upcoming sprint review.',
    priority: 'medium',
    deadline: '2024-09-07',
    time: '3:15 pm',
    status: 'in progress',
  },
];

