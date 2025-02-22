import { cn } from '@/lib/utils';

const TodoCard = () => {
  return (
    <article className='flex flex-col rounded-md bg-white p-4'>
      {/* Priority badge */}
      <div
        className={cn('mb-4 rounded px-2 py-1 text-xs font-medium uppercase', {
          'bg-[#EBFAE2] text-[#4F9C20]': true,
          'bg-[#FDF2F2] text-[#EC5962]': false,
          'bg-[#EEF3FF] text-[#3069FE]': false,
        })}
      >
        high
      </div>

      <div>
        <h3 className='text-lg font-semibold'>Design a new logo</h3>
        <button className='text-ash mt-2 text-sm'></button>
      </div>
    </article>
  );
};
export default TodoCard;
