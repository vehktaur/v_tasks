import { FlagIcon, MoreHorizontalIcon } from '@/assets/svgs';
import { Todo } from '@/lib/schemas';
import { cn, PriorityColors } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const TodoCard = ({ todo }: { todo: Todo }) => {
  return (
    <article className='shadow-xs flex flex-col rounded-md bg-white p-4'>
      {/* Priority badge */}
      <div
        className={cn(
          'mb-4 w-fit rounded px-2 py-1 text-xs font-medium uppercase',
          {
            'bg-[#EBFAE2] text-[#4F9C20]': todo.priority === 'high',
            'bg-[#FDF2F2] text-[#EC5962]': todo.priority === 'low',
            'bg-[#EEF3FF] text-[#3069FE]': todo.priority === 'medium',
          },
        )}
      >
        {todo.priority}
      </div>

      {/* Todo name and options button */}
      <div className='mb-2 flex items-center'>
        <h3 className='w-full truncate text-base font-medium'>{todo.name}</h3>
        <Popover>
          <PopoverTrigger className='shadow-xs grid size-6 flex-shrink-0 place-items-center rounded-md border border-[#DDD]'>
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

      {/* Todo description */}
      {todo.description && (
        <p className='text-staleblue ~text-xs/sm'>{todo.description}</p>
      )}

      {/* Card footer */}
      <div className='text-ash-200 mt-4 flex items-center justify-between text-xs font-medium'>
        <p className='flex items-center gap-2'>
          <FlagIcon
            className={cn('size-6', {
              'text-[#4F9C20]': todo.status === 'completed',
              'text-[#F76659]':
                Date.now() > new Date(todo.deadline ?? 0).getTime() &&
                todo.status !== 'completed',
              'text-[#6E7C87]':
                todo.status === 'in progress' || todo.status === 'pending',
            })}
          />
          <span>{todo.deadline}</span>
        </p>
        <p>{todo.time}</p>
      </div>
    </article>
  );
};
export default TodoCard;
