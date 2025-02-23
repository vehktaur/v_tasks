'use client';

import { PlusIcon } from '@/assets/svgs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import TaskForm from '../task-form';
import { useDroppable } from '@dnd-kit/core';
import { Column as ColumnType } from '@/lib/types';
import { Task } from '@/lib/schemas';
import TaskCard from '../task-card';

interface ColumnProps {
  column: ColumnType;
  tasks?: Task[];
}

const Column = ({ column, tasks }: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <section className='min-h-36 w-full max-w-[22rem] overflow-visible rounded-lg bg-[#F5F7F9] pb-5 shadow-sm'>
      {/* Header */}
      <header className='text-ash-200 sticky top-0 z-10 flex items-center justify-between bg-[#F5F7F9] px-2 py-2 pt-4'>
        <h2 className='flex items-center gap-2 text-base font-medium'>
          {column.title}
          {tasks && tasks.length > 0 && (
            <span className='~text-xs/sm inline-block rounded bg-[#DDD] px-2 py-1'>
              {tasks.length}
            </span>
          )}
        </h2>
        <Dialog>
          <DialogTrigger className='grid size-6 place-items-center'>
            <PlusIcon className='size-4' />
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className='sr-only'>Task form</DialogTitle>
            <TaskForm />
          </DialogContent>
        </Dialog>
      </header>

      {/* Column Content */}
      <div
        ref={setNodeRef}
        className='text-staleblue mt-2 flex flex-col gap-4 px-2 text-sm'
      >
        {tasks?.map((task) => <TaskCard key={task.id} task={task} />)}
        {!tasks?.length && <p className='italic'>{column.placeholder}</p>}
      </div>
    </section>
  );
};

export default Column;
