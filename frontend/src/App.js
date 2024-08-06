import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common'; // Ensure this file contains the necessary API configuration
import Context from './context'; // Ensure this file exports the Context object
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.success) {
        dispatch(setUserDetails(data.data));
      }
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const fetchUserAddToCart = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setCartProductCount(data?.data?.count || 0);
    } catch (error) {
      console.error('Failed to fetch cart product count:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, [dispatch]);

  return (
    <Context.Provider
      value={{
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart,
      }}
    >
      <ToastContainer position='top-center' />
      <Header />
      <main className='min-h-[calc(100vh-120px)] pt-16'>
        <Outlet />
      </main>
  
      <Footer />
    </Context.Provider>
  );
}

export default App;
