import React from 'react';

const tasks = [
  { id: 1, title: 'Follow us on Twitter', completed: false },
  { id: 2, title: 'Tweet about us', completed: false },
  { id: 3, title: 'Share on Facebook', completed: false },
  { id: 4, title: 'Join our Telegram group', completed: false },
  { id: 5, title: 'Invite a friend', completed: false },
];

const TasksPage = () => {
  const handleTaskClick = (taskId: number) => {
    
    console.log(`Task ${taskId} clicked`);
  };

  return (
    <div className="tasks-page bg-gray-900 min-h-screen p-4 text-white font-medium">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
            onClick={() => handleTaskClick(task.id)}
          >
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
