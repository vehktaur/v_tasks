import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import TaskForm from '@/components/task-form';
import { useTaskStore } from '@/stores/task-store';
import { toast } from 'sonner';

// Mock the task store
vi.mock('@/stores/task-store', () => ({
  useTaskStore: vi.fn(),
}));

// Mock the toast notifications
vi.mock('sonner', () => ({
  toast: { success: vi.fn() },
}));

describe('TaskForm Component', () => {
  const addTaskMock = vi.fn();
  const editTaskMock = vi.fn();

  beforeEach(() => {
    addTaskMock.mockReset();
    editTaskMock.mockReset();
    (toast.success as vi.Mock).mockReset();

    // Mock useTaskStore to return our mocked functions
    (useTaskStore as vi.Mock).mockImplementation((selector: any) =>
      selector({
        addTask: addTaskMock,
        editTask: editTaskMock,
      })
    );
  });

  it('renders "Add Task" when no task prop is provided', () => {
    render(<TaskForm closeModal={vi.fn()} />);
    expect(screen.getByText(/Add Task/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Task Name/i)).toBeInTheDocument();
  });

  it('renders "Edit Task" and pre-populates form fields when task prop is provided', () => {
    const task = {
      id: '123',
      name: 'Sample Task',
      description: 'Sample description',
      priority: 'high',
      image: { url: '', name: '', size: '' },
      deadline: '2024-08-26',
      time: '10:00 AM',
      status: 'pending',
    };
    render(<TaskForm task={task} closeModal={vi.fn()} />);
    expect(screen.getByText(/Edit Task/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Sample Task/i)).toBeInTheDocument();
  });

  it('submits form and calls addTask when adding a new task', async () => {
    const closeModalMock = vi.fn();
    render(<TaskForm closeModal={closeModalMock} />);

    // Fill out the Task Name field
    const nameInput = screen.getByLabelText(/Task Name/i);
    userEvent.clear(nameInput);
    userEvent.type(nameInput, 'New Task');

    // Click the submit button (labeled "Add")
    const submitButton = screen.getByRole('button', { name: /Add/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(addTaskMock).toHaveBeenCalled();
    });
    expect(toast.success).toHaveBeenCalledWith('New task added');
    expect(closeModalMock).toHaveBeenCalled();
  });

  it('submits form and calls editTask when editing an existing task', async () => {
    const closeModalMock = vi.fn();
    const task = {
      id: '123',
      name: 'Old Task',
      description: 'Old description',
      priority: 'medium',
      image: { url: '', name: '', size: '' },
      deadline: '2024-08-26',
      time: '10:00 AM',
      status: 'pending',
    };
    render(<TaskForm task={task} closeModal={closeModalMock} />);

    // Change the task name
    const nameInput = screen.getByLabelText(/Task Name/i);
    userEvent.clear(nameInput);
    userEvent.type(nameInput, 'Updated Task');

    // Click the submit button (labeled "Update")
    const submitButton = screen.getByRole('button', { name: /Update/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(editTaskMock).toHaveBeenCalledWith(task.id, expect.objectContaining({
        name: 'Updated Task',
      }));
    });
    expect(toast.success).toHaveBeenCalledWith('Task update successful');
    expect(closeModalMock).toHaveBeenCalled();
  });
});
