'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import TaskForm from '@/components/task-form';
import React, { useState } from 'react';
import { Task } from '@/lib/schemas';

type FormDialogProps = {
  trigger: React.ReactNode;
  task?: Task;
};

const FormDialog = ({ trigger, task }: FormDialogProps) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        className='grid size-6 place-items-center text-left'
      >
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className='sr-only'>Task form</DialogTitle>
        <DialogDescription className='sr-only'>
          Form for adding or editing tasks
        </DialogDescription>
        <TaskForm task={task} closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
};
export default FormDialog;
