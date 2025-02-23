import { todos } from '@/lib/placeholder-data';
import ColumnWrapper from '@/components/layout/column-wrapper';
import TodoCard from '@/components/todo-card';

const TodoColumn = () => {
  return (
    <ColumnWrapper title='To do' count={4}>
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
      {!todos.length && (
        <p className='italic'>No tasks to do. Start by adding one!</p>
      )}
    </ColumnWrapper>
  );
};
export default TodoColumn;
