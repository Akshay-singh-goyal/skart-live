import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from 'react-icons/fa6';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import ROLE from '../common/role';


const AdminPanel = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  // Redirect if user is not admin
  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate('/');
    }
  }, [user, navigate]);

  

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
     
      {/* Sidebar */}
      <aside className="bg-white min-h-full w-full max-w-xs p-4 shadow-lg">
        <div className="h-32 flex justify-center items-center flex-col mb-4">
          <div className="text-5xl cursor-pointer relative flex justify-center mb-2">
            {user?.profilePic ? (
              <img src={user.profilePic} className="w-20 h-20 rounded-full" alt={user.name} />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm text-gray-600">{user?.role}</p>
        </div>

        {/* Navigation */}
        <nav className="grid gap-2">
          <Link to="all-users" className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded">
            All Users
          </Link>
          <Link to="all-products" className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded">
            All Products
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
