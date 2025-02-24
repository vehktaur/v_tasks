'use client';

import { PlusIcon } from '@/assets/svgs';
import { Column as ColumnType } from '@/lib/types';
import { Task } from '@/lib/schemas';
import TaskCard from '@/components/task-card';
import { Droppable } from '@hello-pangea/dnd';
import FormDialog from '@/components/form-dialog';

interface ColumnProps {
  column: ColumnType;
  tasks?: Task[];
}

const Column = ({ column, tasks }: ColumnProps) => {
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
        <FormDialog
          trigger={
            <button>
              <PlusIcon className='size-4' />
            </button>
          }
        />
      </header>

      {/* Column Content */}
      <Droppable droppableId={column.id}>
        {(provider) => (
          <div
            ref={provider.innerRef}
            {...provider.droppableProps}
            className='text-staleblue mt-2 flex flex-col gap-4 px-2 text-sm'
          >
            {tasks?.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {!tasks?.length && <p className='italic'>{column.placeholder}</p>}
            {provider.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
};

export default Column;
