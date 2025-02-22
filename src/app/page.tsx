import CompletedColumn from '@/components/completed-column';
import InprogressColumn from '@/components/inprogress-column';
import TodoColumn from '@/components/todo-column';

export default function Home() {
  return (
    <main className='padding-inline ~pb-5/8 grid grid-cols-3 gap-4'>
      <TodoColumn />
      <InprogressColumn />
      <CompletedColumn />
    </main>
  );
}
