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
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const handleDelete = (id: string | number) => {
    deleteTask(id);
  };

  return (
    <Draggable index={index} draggableId={task.id}>
      {(provider) => (
        <article
          ref={provider.innerRef}
          {...provider.dragHandleProps}
          {...provider.draggableProps}
          className={cn(
            'shadow-xs relative z-20 flex flex-col rounded-md bg-white p-4',
          )}
        >
          {/* Priority badge */}
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

          {/* Task name and options button */}
          <div className='mb-2 flex items-center'>
            <h3 className='w-full truncate text-base font-medium'>
              {task.name}
            </h3>
            <Popover>
              <PopoverTrigger className='shadow-xs relative z-50 grid size-6 flex-shrink-0 cursor-default place-items-center rounded-md border border-[#DDD]'>
                <MoreHorizontalIcon className='size-4' />
              </PopoverTrigger>
              <PopoverContent
                className='grid w-auto px-0 py-1 text-xs *:px-4 *:py-1 *:text-left'
                align='end'
              >
                <FormDialog
                  trigger={
                    <button
                      disabled={task.status === 'completed'}
                      className='text-staleblue inline-block w-full text-left outline-none transition-colors duration-300 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:hover:bg-white'
                    >
                      Edit
                    </button>
                  }
                  task={task}
                />

                <button
                  onClick={() => handleDelete(task.id)}
                  className='text-[#E60C02] outline-none transition-colors duration-300 hover:bg-zinc-100'
                >
                  Delete
                </button>
              </PopoverContent>
            </Popover>
          </div>

          {task.image && task.image.url && (
            <div className='max-h-[7.8rem] mb-4 overflow-hidden rounded'>
              <Image
                className='size-full object-cover'
                src={task.image.url!}
                alt={task.image.name ?? 'An image has no name'}
                width={1280}
                height={720}
              />
            </div>
          )}

          {/* Task description */}
          {task.description && (
            <p className='text-staleblue ~text-xs/sm line-clamp-6'>
              {task.description}
            </p>
          )}

          {/* Card footer */}
          <div className='text-ash-200 mt-4 flex items-center justify-between text-xs font-medium'>
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
              <span>{format(task.deadline, 'PPP')}</span>
            </p>
            <p>{task.time}</p>
          </div>
        </article>
      )}
    </Draggable>
  );
};
export default TaskCard;
