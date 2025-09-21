# To-Do List App

<img width="1280" height="1012" alt="image" src="https://github.com/user-attachments/assets/249d5659-8a8d-4687-b4de-1d2df3f2f99a" />

This is a cross-platform to-do list management app that uses Wails to build desktop apps with React for the frontend and Go for the backend.

## Features:

- Adding tasks: Ability to add new tasks to the list.
- Switching tasks: Marking tasks as completed (with undo option).
- Removing completed tasks: Clearing all completed tasks from the list. - **Task Filtering:** Filter tasks by status (all, active, completed).
- **Dark and Light Themes:** Support for switching themes with saving to `localStorage`.
- **State Persistence:** Task state is saved to `localStorage` and loaded on page reload.

## Technologies:

- **Wails**: A cross-platform framework for building desktop applications using Go for the server-side and React for the front-end.
- **Go**: The server-side part of the application that handles the logic.
- **React**: A library for building user interfaces.
- **TypeScript**: Strong typing for the front-end.
- **CSS**: For styling the interface.
- **React Context API**: For theme management (light/dark).

## Installation and launch:

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/todo-list.git
cd todo-desktop
wails dev
