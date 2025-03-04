'use client';

import { PlusIcon } from '@/assets/svgs';
import { Column as ColumnType } from '@/lib/types';
import TaskCard from '@/components/task-card';
import { Droppable } from '@hello-pangea/dnd';
import FormDialog from '@/components/form-dialog';
import { useEffect, useMemo } from 'react';
import { useTaskStore } from '@/stores/task-store';

interface ColumnProps {
  column: ColumnType;
  search: string;
}

const Column = ({ column, search }: ColumnProps) => {
  const tasks = useTaskStore((state) => state.tasks);
  const columnTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          task.status === column.id &&
          (task.name.toLowerCase().includes(search) || task.description?.toLowerCase().includes(search)),
      ),
    [tasks, column, search],
  );

  useEffect(() => {
    useTaskStore.persist.rehydrate();
  }, []);

  return (
    <section className='min-h-36 w-full overflow-clip max-w-[22rem] rounded-xl bg-[#F5F7F9] pb-5 shadow-sm'>
      {/* Header */}
      <header className='text-ash-200 flex items-center justify-between bg-[#F5F7F9] px-2 py-2 pt-4'>
        <h2 className='flex items-center gap-2 text-base font-medium'>
          {column.title}
          {columnTasks && columnTasks.length > 0 && (
            <span className='~text-xs/sm inline-block rounded bg-[#DDD] px-2 py-1'>
              {columnTasks.length}
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
            {columnTasks?.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {!columnTasks?.length && (
              <p className='italic'>{column.placeholder}</p>
            )}
            {provider.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
};

export default Column;
