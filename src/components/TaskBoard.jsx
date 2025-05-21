import { useSelector } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import TaskColumn from './TaskColumn';
import TaskModal from './TaskModal';
import { useState } from 'react';

const TaskBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const tasks = useSelector((state) => state.tasks.items);
  const filterStatus = useSelector((state) => state.tasks.filterStatus);

  const statuses = ['To Do', 'In Progress', 'Done'];

  const filteredTasks = tasks.filter(task => 
    filterStatus === 'All' || task.status === filterStatus
  );

  const tasksByStatus = statuses.reduce((acc, status) => {
    acc[status] = filteredTasks.filter(task => task.status === status);
    return acc;
  }, {});

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Task Board
        </h2>
        <button
          onClick={handleAddTask}
          className="btn btn-primary flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statuses.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasksByStatus[status]}
            onEditTask={handleEditTask}
          />
        ))}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={editingTask}
      />
    </div>
  );
};

export default TaskBoard; 