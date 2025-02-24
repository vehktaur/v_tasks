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
    id: 'SLdrYHsf158jsEUVfnEvq',
    name: 'Organize a charity event',
    description: 'Plan a community outreach event for underprivileged kids.',
    priority: 'high',
    deadline: '2025-02-24T23:00:00.000Z',
    time: '10:00 am',
    status: 'in progress',
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
    status: 'completed',
  },
  {
    id: 'QwHzkr9Y9xlML9qxOjK0_',
    name: 'Prepare for team presentation',
    description: 'Create slides and rehearse for the upcoming sprint review.',
    priority: 'medium',
    deadline: '2024-09-07',
    time: '3:15 pm',
    status: 'in progress',
    image: {
      name: 'wallpaperflare.com_wallpaper (4).jpg',
      url: 'https://files.edgestore.dev/wk1b39wmjrcujdtl/taskCovers/_public/9669b0db-9ef2-4c91-9707-698251fe1e63.jpg',
      size: '327377',
    },
  },
  {
    id: 'tVwR4uoKi-S0Ek4BtTsUx',
    name: 'Some new card with image',
    description: "The new card we've all been waiting for.",
    priority: 'medium',
    deadline: '2025-02-26T23:00:00.000Z',
    time: '4:00 am',
    status: 'pending',
    image: {
      name: '039.jpg',
      url: 'https://files.edgestore.dev/wk1b39wmjrcujdtl/taskCovers/_public/98f7f764-92af-4993-a97b-1d9998352d39.jpg',
      size: '329625',
    },
  },
];
