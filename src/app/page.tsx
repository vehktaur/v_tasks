'use client';

import Column from '@/components/home/column';
import { tasks } from '@/lib/placeholder-data';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

const columns = [
  {
    id: 'pending',
    title: 'To do',
    placeholder: 'No tasks to do. Start by adding one!',
  },
  {
    id: 'in progress',
    title: 'In progress',
    placeholder: 'Nothing in progress. Pick a task to work on!',
  },
  {
    id: 'completed',
    title: 'Completed',
    placeholder: 'No completed tasks yet. Keep going!',
  },
];

export default function Home() {
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const taskId = active.id as string;
    const newStatus = (over?.id ?? '') as string;
    if (!active || !over) return;

    const sourceColumn = columns.find((column) => column.id === taskId);
    const targetColumn = columns.find((column) => column.id === newStatus);

    if (sourceColumn?.id === targetColumn?.id) return;

    // const task = tasks.find((task) => task.id === taskId);
    // task.status = targetColumn?.id;
  };

  return (
    <main className='padding-inline overflow-x-hidden ~pb-5/8 grid grid-cols-1 items-start justify-center justify-items-center gap-x-4 gap-y-8 md:grid-cols-2 xl:grid-cols-3'>
      <DndContext onDragEnd={onDragEnd}>
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column.id);
          return <Column key={column.id} column={column} tasks={columnTasks} />;
        })}
      </DndContext>
    </main>
  );
}
