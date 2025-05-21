import { useDispatch } from 'react-redux';
import { FaEllipsisV, FaExclamationTriangle } from 'react-icons/fa';
import { updateTask, deleteTask } from '../store/taskSlice';

const TaskCard = ({ task, onEdit }) => {
  const dispatch = useDispatch();
  const isOverdue = task.deadline && new Date(task.deadline) < new Date();

  const handleStatusChange = (newStatus) => {
    dispatch(updateTask({
      id: task._id,
      taskData: { ...task, status: newStatus }
    }));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task._id));
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-800 dark:text-white line-clamp-1">
          {task.title}
        </h4>
        <div className="relative group">
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <FaEllipsisV className="text-gray-500" />
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg hidden group-hover:block z-10">
            <div className="py-1">
              <button
                onClick={onEdit}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
        {task.description}
      </p>

      {task.deadline && (
        <div className="flex items-center justify-between text-sm">
          <span className={`${isOverdue ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
            Due: {new Date(task.deadline).toLocaleDateString()}
          </span>
          {isOverdue && (
            <span className="flex items-center text-red-500">
              <FaExclamationTriangle className="mr-1" />
              Overdue
            </span>
          )}
        </div>
      )}

      <div className="mt-3 flex space-x-2">
        {['To Do', 'In Progress', 'Done'].map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            className={`text-xs px-2 py-1 rounded ${
              task.status === status
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskCard; 