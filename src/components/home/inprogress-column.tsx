import ColumnWrapper from '@/components/layout/column-wrapper';

const InprogressColumn = () => {
  return (
    <ColumnWrapper title='In progress' count={2}>
      {true && (
        <p className='italic'>Nothing in progress. Pick a task to work on!</p>
      )}
    </ColumnWrapper>
  );
};
export default InprogressColumn;
