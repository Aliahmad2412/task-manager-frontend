import { FaEllipsisV } from 'react-icons/fa';
import TaskCard from './TaskCard';

const TaskColumn = ({ status, tasks, onEditTask }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Done':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-semibold px-3 py-1 rounded-full ${getStatusColor(status)}`}>
          {status}
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={() => onEditTask(task)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn; 