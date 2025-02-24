'use client';

import { FlagIcon, MoreHorizontalIcon } from '@/assets/svgs';
import { Task } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Draggable } from '@hello-pangea/dnd';
import { format } from 'date-fns';
import { useTaskStore } from '@/stores/task-store';
import FormDialog from './form-dialog';
import Image from 'next/image';

const TaskCard = ({ task, index }: { task: Task; index: number }) => {
  // Get the deleteTask action from the task store.
  const deleteTask = useTaskStore((state) => state.deleteTask);

  // Handler to delete a task using its id.
  const handleDelete = (id: string | number) => {
    deleteTask(id);
  };

  return (
    // Wrap the task card in a Draggable component for drag-and-drop functionality.
    <Draggable index={index} draggableId={task.id}>
      {(provider) => (
        <article
          ref={provider.innerRef}
          {...provider.dragHandleProps}
          {...provider.draggableProps}
          className={cn(
            'relative z-20 flex flex-col rounded-md bg-white p-4 shadow-xs',
          )}
        >
          {/* Priority Badge */}
          <div
            className={cn(
              'mb-4 w-fit rounded px-2 py-1 text-xs font-medium uppercase',
              {
                'bg-[#EBFAE2] text-[#4F9C20]': task.priority === 'high',
                'bg-[#FDF2F2] text-[#EC5962]': task.priority === 'low',
                'bg-[#EEF3FF] text-[#3069FE]': task.priority === 'medium',
              },
            )}
          >
            {task.priority}
          </div>

          {/* Header: Task name and options menu */}
          <div className='mb-2 flex items-center'>
            <h3 className='w-full truncate text-base font-medium'>
              {task.name}
            </h3>
            {/* Options Popover */}
            <Popover>
              <PopoverTrigger className='relative z-50 grid size-6 flex-shrink-0 cursor-default place-items-center rounded-md border border-[#DDD] shadow-xs'>
                <MoreHorizontalIcon className='size-4' />
              </PopoverTrigger>
              <PopoverContent
                className='grid w-auto px-0 py-1 text-xs *:px-4 *:py-1 *:text-left'
                align='end'
              >
                {/* Edit Button wrapped inside a FormDialog */}
                <FormDialog
                  trigger={
                    <button
                      disabled={task.status === 'completed'}
                      className='inline-block w-full text-left text-staleblue outline-none transition-colors duration-300 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:hover:bg-white'
                    >
                      Edit
                    </button>
                  }
                  task={task}
                />

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(task.id)}
                  className='text-[#E60C02] outline-none transition-colors duration-300 hover:bg-zinc-100'
                >
                  Delete
                </button>
              </PopoverContent>
            </Popover>
          </div>

          {/* Task Cover Image */}
          {task.image && task.image.url && (
            <div className='mb-4 max-h-[7.8rem] overflow-hidden rounded'>
              <Image
                className='size-full object-cover'
                src={task.image.url}
                alt={task.image.name ?? 'An image has no name'}
                width={1280}
                height={720}
              />
            </div>
          )}

          {/* Task Description */}
          {task.description && (
            <p className='line-clamp-6 text-staleblue ~text-xs/sm'>
              {task.description}
            </p>
          )}

          {/* Footer: Deadline and time */}
          <div className='mt-4 flex items-center justify-between text-xs font-medium text-ash-200'>
            <p className='flex items-center gap-2'>
              <FlagIcon
                className={cn('size-6', {
                  'text-[#4F9C20]': task.status === 'completed',
                  'text-[#6E7C87]':
                    task.status === 'in progress' || task.status === 'pending',
                  'text-[#F76659]':
                    Date.now() > new Date(task.deadline).getTime() &&
                    task.status !== 'completed',
                })}
              />
              {/* Format the deadline date using date-fns */}
              <span>{format(task.deadline, 'PPP')}</span>
            </p>
            {/* Display task time */}
            <p>{task.time}</p>
          </div>
        </article>
      )}
    </Draggable>
  );
};

export default TaskCard;
