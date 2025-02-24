import DroppableColumns from '@/components/home/droppable-columns';

const Home = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  // Get search from search params and pass to columns
  const search = searchParams.search?.toString() || '';
  return (
    <main className='padding-inline ~pb-5/8 grid grid-cols-1 items-start justify-center justify-items-center gap-x-4 gap-y-8 overflow-x-hidden md:grid-cols-2 xl:grid-cols-3'>
      <DroppableColumns search={search}/>
    </main>
  );
};

export default Home;
