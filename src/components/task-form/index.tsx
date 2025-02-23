'use client';

import { Task, TaskSchema } from '@/lib/schemas';
import { DialogClose } from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import { FormProvider, useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import sfPro from '../../../public/fonts/sf-pro';
import Textarea from '../ui/textarea';
import PrioritySelect from './priority-select';
import CoverUpload from './cover-upload';
import TimeSelect from './time-select';
import DeadlineCalendar from './deadline-calendar';
import { timeOptions } from '@/lib/data';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';

const TaskForm = ({ task }: { task?: Task }) => {
  const methods = useForm({
    defaultValues: {
      name: task?.name ?? '',
      description: task?.description ?? '',
      priority: task?.priority,
      image: task?.image ?? '',
      deadline: task?.deadline ?? '',
      time: task?.time ?? '',
      status: task?.status ?? 'pending',
    },
    resolver: zodResolver(TaskSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <>
      <div className='mb-5 flex items-center justify-between'>
        <h2 className={cn(sfPro.className, '~text-lg/2xl font-semibold')}>
          {task?.id ? 'Edit' : 'Add'} Task
        </h2>
        <DialogClose />
      </div>

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <div className='space-y-4'>
            <Input
              label='task Name'
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
            />

            <div className='flex items-center justify-between gap-4'>
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

          <Button className='mt-6 w-full rounded-xl'>{task?.id ? 'Update' : 'Add'}</Button>
        </form>
      </FormProvider>
    </>
  );
};
export default TaskForm;
