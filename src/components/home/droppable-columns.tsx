'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Column from '@/components/home/column';
import { useTaskStore } from '@/stores/task-store';

type ColumnT = {
  id: 'pending' | 'in progress' | 'completed';
  title: string;
  placeholder: string;
};

const columns: ColumnT[] = [
  {
    id: 'pending',
    title: 'To do',
    placeholder: 'No tasks to do. Start by adding one!',
  },
  {
    id: 'in progress',
    title: 'In progress',
    placeholder: 'Nothing in progress. Pick a task to work on!',
  },
  {
    id: 'completed',
    title: 'Completed',
    placeholder: 'No completed tasks yet. Keep going!',
  },
];

const DroppableColumns = ({ search }: { search: string }) => {
  const editTask = useTaskStore((state) => state.editTask);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (
      !destination ||
      (source.index === destination.index &&
        source.droppableId === destination.droppableId)
    ) {
      return;
    }

    editTask(draggableId, {
      status: destination.droppableId as
        | 'pending'
        | 'in progress'
        | 'completed',
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {columns.map((column) => {
        return <Column key={column.id} column={column} search={search} />;
      })}
    </DragDropContext>
  );
};
export default DroppableColumns;
