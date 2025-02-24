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

// Define the props for the FormDialog component.
type FormDialogProps = {
  trigger: React.ReactNode;
  task?: Task;
};

// FormDialog wraps a TaskForm inside a dialog modal.
const FormDialog = ({ trigger, task }: FormDialogProps) => {
  // State to control whether the dialog is open.
  const [open, setOpen] = useState(false);

  // Function to close the modal.
  const closeModal = () => {
    setOpen(false);
  };

  return (
    // Dialog component that handles the modal state.
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 
        DialogTrigger acts as the clickable element that opens the dialog.
        'asChild' ensures that the trigger element receives the necessary props.
      */}
      <DialogTrigger asChild className="grid size-6 place-items-center text-left">
        {trigger}
      </DialogTrigger>

      {/* 
        DialogContent contains the content of the modal.
        Accessible titles and descriptions are provided for screen readers.
      */}
      <DialogContent>
        <DialogTitle className="sr-only">Task form</DialogTitle>
        <DialogDescription className="sr-only">
          Form for adding or editing tasks
        </DialogDescription>
        {/* Render the TaskForm component and pass the closeModal function. */}
        <TaskForm task={task} closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
