import DroppableColumns from '@/components/home/droppable-columns';
import { Suspense } from 'react';

const Home = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  // Get search from search params and pass to columns
  const search = searchParams.search?.toString() || '';
  return (
    <main className='padding-inline grid grid-cols-1 items-start justify-center justify-items-center gap-x-4 gap-y-8 overflow-x-hidden ~pb-5/8 md:grid-cols-2 xl:grid-cols-3'>
      <Suspense key={search}>
        <DroppableColumns search={search} />
      </Suspense>
    </main>
  );
};

export default Home;
