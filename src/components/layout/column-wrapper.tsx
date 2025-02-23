import { PlusIcon } from '@/assets/svgs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import TodoForm from '../todo-form';

interface ColumnWrapperProps {
  title: string;
  count?: number;
  children: React.ReactNode;
}

const ColumnWrapper = ({ title, count, children }: ColumnWrapperProps) => {
  return (
    <ScrollArea className='w-full max-w-[22rem] overflow-visible rounded-lg lg:h-[calc(100vh-10rem)]'>
      <section className='h-full rounded-lg bg-[#F5F7F9] pb-5 min-h-40 shadow-sm'>
        {/* Header */}
        <header className='text-ash-200 sticky top-0 z-30 flex items-center justify-between bg-[#F5F7F9] px-2 py-2 pt-4'>
          <h2 className='flex items-center gap-2 text-base font-medium'>
            {title}
            {count && (
              <span className='~text-xs/sm inline-block rounded bg-[#DDD] px-2 py-1'>
                {count}
              </span>
            )}
          </h2>
          <Dialog>
            <DialogTrigger className='grid size-6 place-items-center'>
              <PlusIcon className='size-4' />
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className='sr-only'>Todo form</DialogTitle>
              <TodoForm />
            </DialogContent>
          </Dialog>
        </header>

        {/* Column Content */}
        <div className='text-staleblue mt-2 flex flex-col gap-4 px-2 text-sm'>
          {children}
        </div>
      </section>
    </ScrollArea>
  );
};

export default ColumnWrapper;
