import { Outlet, NavLink } from "react-router-dom";
import { Home, Star ,TrendingUp, Calendar, Film } from "lucide-react";

export default function RootLayout() {
  
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
    }`;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        
          <NavLink to="/" className="text-2xl font-bold text-blue-700 flex gap-1 mt-2.5 j ">
          <Film size={35}/>
            MovieHub
            
          </NavLink>
        

        <nav className="flex-1 py-6 px-3 space-y-2">
          <NavLink to="/" className={linkClass}><Home size={25} /> Home</NavLink>
          <NavLink to="/popular" className={linkClass}><Star size={25} fill="blue" color="blue" /> Popular</NavLink>
          <NavLink to="/top-rated" className={linkClass}><TrendingUp size={25} /> Top Rated</NavLink>
          <NavLink to="/upcoming" className={linkClass}><Calendar size={25} /> Upcoming</NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}