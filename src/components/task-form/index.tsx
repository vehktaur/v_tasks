'use client';

import { Task, TaskSchema } from '@/lib/schemas';
import { DialogClose } from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import { FormProvider, useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import sfPro from '../../../public/fonts/sf-pro';
import Textarea from '@/components/ui/textarea';
import PrioritySelect from './priority-select';
import CoverUpload from './cover-upload';
import TimeSelect from './time-select';
import DeadlineCalendar from './deadline-calendar';
import { timeOptions } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTaskStore } from '@/stores/task-store';
import { toast } from 'sonner';
import { ImageFile } from '@/lib/types';
import { useState } from 'react';

type TaskFormProps = { task?: Task; closeModal: () => void };

const TaskForm = ({ task, closeModal }: TaskFormProps) => {
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

  console.log(errors);

  const [image, setImage] = useState<Partial<ImageFile>>(() => ({
    url: task?.image?.url,
    name: task?.image?.name,
    size: task?.image?.size,
  }));

  const addTask = useTaskStore((state) => state.addTask);
  const editTask = useTaskStore((state) => state.editTask);

  const onSubmit = handleSubmit((data) => {
    if (image) {
      data.image = {
        name: image.name,
        url: image.url,
        size: image.size,
      };
    }

    if (task?.id) {
      editTask(task.id, data);
    } else {
      addTask(data);
    }

    toast.success(task?.id ? 'Task update successful' : 'New task added');
    reset();
    closeModal();
  });
  return (
    <>
      <div className='sticky top-0 flex items-center justify-between bg-white pb-4'>
        <h2 className={cn(sfPro.className, '~text-lg/2xl font-semibold')}>
          {task?.id ? 'Edit' : 'Add'} Task
        </h2>
        <DialogClose />
      </div>

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <div className='space-y-4'>
            <Input
              label='Task Name'
              name='name'
              placeholder='Enter task name'
            />

            <Textarea
              className='min-h-24'
              label={
                <>
                  Description{' '}
                  <span className='~text-xs/sm text-ash-100'>(Optional)</span>
                </>
              }
              name='description'
              placeholder='Write more on this task...'
            />
            <PrioritySelect
              label='Priority'
              name='priority'
              placeholder='Select the priority of the task'
              options={['high', 'medium', 'low']}
            />
            <CoverUpload
              label={
                <>
                  Upload cover{' '}
                  <span className='~text-xs/sm text-ash-100'>(Optional)</span>
                </>
              }
              name='image'
              image={image}
              setImage={setImage}
            />

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

          <Button type='submit' className='mt-6 w-full rounded-xl'>
            {task?.id ? 'Update' : 'Add'}
          </Button>
        </form>
      </FormProvider>
    </>
  );
};
export default TaskForm;
