'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

// Schemas, types, and utilities.
import { Task, TaskSchema } from '@/lib/schemas';
import { ImageFile } from '@/lib/types';
import { cn } from '@/lib/utils';
import sfPro from '../../../public/fonts/sf-pro';

// UI components.
import { DialogClose } from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

// Custom form components.
import PrioritySelect from './priority-select';
import CoverUpload from './cover-upload';
import TimeSelect from './time-select';
import DeadlineCalendar from './deadline-calendar';

// Data.
import { timeOptions } from '@/lib/data';
import { useTaskStore } from '@/stores/task-store';

// Define the props for TaskForm.
type TaskFormProps = {
  task?: Task;
  closeModal: () => void;
};

const TaskForm = ({ task, closeModal }: TaskFormProps) => {
  // Initialize react-hook-form with default values and zod validation.
  const methods = useForm({
    defaultValues: {
      name: task?.name ?? '',
      description: task?.description ?? '',
      priority: task?.priority,
      image: {
        url: task?.image?.url ?? '',
        name: task?.image?.name ?? '',
        size: task?.image?.size ?? '',
      },
      deadline: task?.deadline ?? '',
      time: task?.time ?? '',
      status: task?.status ?? 'pending',
    },
    resolver: zodResolver(TaskSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  // Debug: Log form errors.
  console.log(errors);

  // Local state to handle image upload preview and details.
  const [image, setImage] = useState<Partial<ImageFile>>(() => ({
    url: task?.image?.url,
    name: task?.image?.name,
    size: task?.image?.size,
  }));

  // Retrieve actions from the task store.
  const addTask = useTaskStore((state) => state.addTask);
  const editTask = useTaskStore((state) => state.editTask);

  // Handle form submission.
  const onSubmit = handleSubmit((data) => {
    // Override image data from the local state if available.
    if (image) {
      data.image = {
        name: image.name,
        url: image.url,
        size: image.size,
      };
    }

    // Determine whether to add a new task or edit an existing one.
    if (task?.id) {
      editTask(task.id, data);
    } else {
      addTask(data);
    }

    // Display success notification and reset form.
    toast.success(task?.id ? 'Task update successful' : 'New task added');
    reset();
    closeModal();
  });

  return (
    <>
      {/* Modal header with title and close button */}
      <div className='sticky top-0 flex items-center justify-between bg-white pb-4'>
        <h2 className={cn(sfPro.className, 'font-semibold ~text-lg/2xl')}>
          {task?.id ? 'Edit' : 'Add'} Task
        </h2>
        <DialogClose />
      </div>

      {/* FormProvider makes form methods available to nested components */}
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <div className='space-y-4'>
            {/* Task name input */}
            <Input
              label='Task Name'
              name='name'
              placeholder='Enter task name'
            />

            {/* Task description textarea */}
            <Textarea
              className='min-h-24'
              label={
                <>
                  Description{' '}
                  <span className='text-ash-100 ~text-xs/sm'>(Optional)</span>
                </>
              }
              name='description'
              placeholder='Write more on this task...'
            />

            {/* Priority selection */}
            <PrioritySelect
              label='Priority'
              name='priority'
              placeholder='Select the priority of the task'
              options={['high', 'medium', 'low']}
            />

            {/* Cover image upload */}
            <CoverUpload
              label={
                <>
                  Upload cover{' '}
                  <span className='text-ash-100 ~text-xs/sm'>(Optional)</span>
                </>
              }
              name='image'
              image={image}
              setImage={setImage}
            />

            {/* Deadline and time selectors */}
            <div className='flex flex-col items-start justify-between gap-4 sm:flex-row'>
              <DeadlineCalendar
                label='Deadline'
                name='deadline'
                placeholder='2:00 pm'
              />

              <TimeSelect
                label='Time'
                name='time'
                placeholder='2:00 pm'
                options={timeOptions}
              />
            </div>
          </div>

          {/* Submit button */}
          <Button type='submit' className='mt-6 w-full rounded-xl'>
            {task?.id ? 'Update' : 'Add'}
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

export default TaskForm;
