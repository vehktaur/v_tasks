import CompletedColumn from '@/components/home/completed-column';
import InprogressColumn from '@/components/home/inprogress-column';
import TodoColumn from '@/components/home/todo-column';

export default function Home() {
  return (
    <main className='padding-inline ~pb-5/8 justify-center grid grid-cols-1 items-start justify-items-center gap-x-4 gap-y-8 md:grid-cols-2 xl:grid-cols-3'>
      <TodoColumn />
      <InprogressColumn />
      <CompletedColumn />
    </main>
  );
}
