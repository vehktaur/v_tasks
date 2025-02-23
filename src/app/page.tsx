'use client';

import Column from '@/components/home/column';
import { tasks } from '@/lib/placeholder-data';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';

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
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // setActiveTasks(newActiveTasks);
    // setCompletedTasks(newCompleteTasks);
  };

  return (
    <main className='padding-inline ~pb-5/8 grid grid-cols-1 items-start justify-center justify-items-center gap-x-4 gap-y-8 overflow-x-hidden md:grid-cols-2 xl:grid-cols-3'>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column.id);
          return <Column key={column.id} column={column} tasks={columnTasks} />;
        })}
      </DragDropContext>
    </main>
  );
}
