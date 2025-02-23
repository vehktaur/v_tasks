'use client';

import { FlagIcon, MoreHorizontalIcon } from '@/assets/svgs';
import { Task } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Draggable } from '@hello-pangea/dnd';

const TaskCard = ({ task, index }: { task: Task; index: number }) => {
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
                <button className='text-staleblue transition-colors duration-300 hover:bg-zinc-100'>
                  Edit
                </button>
                <button className='text-[#E60C02] transition-colors duration-300 hover:bg-zinc-100'>
                  Delete
                </button>
              </PopoverContent>
            </Popover>
          </div>

          {/* Task description */}
          {task.description && (
            <p className='text-staleblue ~text-xs/sm'>{task.description}</p>
          )}

          {/* Card footer */}
          <div className='text-ash-200 mt-4 flex items-center justify-between text-xs font-medium'>
            <p className='flex items-center gap-2'>
              <FlagIcon
                className={cn('size-6', {
                  'text-[#4F9C20]': task.status === 'completed',
                  'text-[#F76659]':
                    Date.now() > new Date(task.deadline ?? 0).getTime() &&
                    task.status !== 'completed',
                  'text-[#6E7C87]':
                    task.status === 'in progress' || task.status === 'pending',
                })}
              />
              <span>{task.deadline}</span>
            </p>
            <p>{task.time}</p>
          </div>
        </article>
      )}
    </Draggable>
  );
};
export default TaskCard;
