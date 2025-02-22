import ColumnWrapper from './layout/column-wrapper';

const InprogressColumn = () => {
  return (
    <ColumnWrapper title='In progress' count={2}>
      Nothing in progress. Pick a task to work on!
    </ColumnWrapper>
  );
};
export default InprogressColumn;
