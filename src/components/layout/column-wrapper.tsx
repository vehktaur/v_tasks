import { PlusIcon } from '@/assets/svgs';

interface ColumnWrapperProps {
  title: string;
  count?: number;
  children: React.ReactNode;
}

const ColumnWrapper = ({ title, count, children }: ColumnWrapperProps) => {
  return (
    <section className='w-full rounded-lg bg-[#F5F7F9] px-2 py-3 shadow'>
      {/* Header */}
      <header className='text-ash flex items-center justify-between'>
        <h2 className='flex items-center gap-2 text-base font-medium'>
          {title}
          {count && (
            <span className='~text-xs/sm inline-block rounded bg-[#DDD] p-1.5 px-2'>
              {count}
            </span>
          )}
        </h2>
        <button className='grid size-6 place-items-center'>
          <PlusIcon className='size-4' />
        </button>
      </header>

      {/* Column Content */}
      <div className='text-staleblue mt-4 text-sm italic'>{children}</div>
    </section>
  );
};

export default ColumnWrapper;
