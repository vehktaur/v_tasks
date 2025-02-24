# Task Management Dashboard

## Overview

This is the **Task Management Dashboard**, a modern and user-friendly application built using **React** and **TypeScript**. The project is styled with **Tailwind CSS** and uses **Zustand** for state management. It allows users to manage tasks efficiently by creating, editing, deleting, and viewing tasks categorized into different states like **To-Do**, **In Progress**, and **Completed**. The application also supports drag-and-drop functionality for moving tasks between states. It follows a clean, modern UI.

## Features

✅ Create, read, update, and delete (CRUD) tasks  
✅ Drag-and-drop to move tasks between different states  
✅ Task prioritization (optional)  
✅ Search/filter functionality for tasks  
✅ Form validation and error handling

---

## Tech Stack

```
| Technology          | Purpose                     |
| ------------------- | --------------------------- |
| **Next.js (React)** | Frontend framework          |
| **TypeScript**      | Type safety                 |
| **Tailwind CSS**    | Styling                     |
| **React Hook Form** | Form handling & validation  |
| **Zustand**         | State management            |
| **Radix UI**        | UI components               |
| **Lucide React**    | Icon library                |
| **Date-fns**        | Date handling               |
| **React DnD**       | Drag-and-drop functionality |
```

---

## File Structure

```
src/
├── app/
│ ├── api/ # API routes and server-side logic
│ ├── components/ # Page-level and layout components
│ ├── layout.tsx # Global layout configuration
│ └── page.tsx # Main application page
├── assets/
│ ├── images/
│ └── icons.tsx
├── components/ # Reusable UI components (e.g., task cards, forms)
├── hooks/ # Custom React hooks
├── lib/ # Utility functions and helpers
└── stores/ # State management (using Zustand) and related stores
```

## Project Setup

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vehktaur/techinnover.git

   ```

2. Navigate into the project directory:

   ```bash
   cd techinnover

   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install

   ```

4. Run the development server:
   npm run dev

   # or

   yarn dev

The application will be available at http://localhost:3000.

### Usage

For best performance and experience, ensure you're using a desktop browser. Open http://localhost:3000 to view the app.

The project contains sections with interactive features and smooth animations.
