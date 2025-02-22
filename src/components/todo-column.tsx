import ColumnWrapper from './layout/column-wrapper';

const TodoColumn = () => {
  return (
    <ColumnWrapper title='To do' count={4}>
      No tasks to do. Start by adding one!
    </ColumnWrapper>
  );
};
export default TodoColumn;
