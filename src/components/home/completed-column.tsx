import ColumnWrapper from '@/components/layout/column-wrapper';

const CompletedColumn = () => {
  return (
    <ColumnWrapper title='Completed'>
      {true && <p className='italic'> No completed tasks yet. Keep going!</p>}
    </ColumnWrapper>
  );
};
export default CompletedColumn;
