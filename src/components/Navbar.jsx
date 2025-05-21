import { useDispatch, useSelector } from 'react-redux';
import { FaSun, FaMoon, FaSearch } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { setSearchQuery, searchTasks } from '../store/taskSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isDarkMode, toggleTheme } = useTheme();
  const searchQuery = useSelector((state) => state.tasks.searchQuery);

  const handleSearch = (e) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query));
    if (query.trim()) {
      dispatch(searchTasks(query));
    } else {
      dispatch(fetchTasks());
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Task Manager
          </h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={handleSearch}
                className="input pl-10"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {isDarkMode ? (
                <FaSun className="text-yellow-400 text-xl" />
              ) : (
                <FaMoon className="text-gray-600 text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 