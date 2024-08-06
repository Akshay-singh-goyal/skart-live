import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import displayINRCurrency from '../helpers/displayCurrency';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import Context from '../context';

const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollElement = useRef();

    

    const fetchData = async () => {
        setLoading(true);
        try {
            const categoryProduct = await fetchCategoryWiseProduct(category);
            setData(categoryProduct.data || []); // Ensure data is always an array
        } catch (error) {
            console.error('Error fetching data:', error);
            setData([]); // Clear data or handle error state appropriately
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]); // Fetch data when category changes

    const handleOpenWebsite = () => {
        window.open(data.productLink);
      };

    const scrollRight = () => {
        if (scrollElement.current) {
            scrollElement.current.scrollLeft += 300;
        }
    };

    const scrollLeft = () => {
        if (scrollElement.current) {
            scrollElement.current.scrollLeft -= 300;
        }
    };

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
            <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>
                {loading ? (
                    new Array(13).fill(null).map((_, index) => (
                        <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'></div>
                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                                <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                    <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                </div>
                                <button className='text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse'></button>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product) => (
                        <Link key={product._id} to={'/product/' + product._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                <img src={product.productImage[0]} alt={product.productName} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                            </div>
                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                <p className='capitalize text-slate-500'>{product?.category}</p>
                                <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                    <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                </div>
                                <button type="button" onClick={handleOpenWebsite} className='border-2 border-blue-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-blue-600 hover:text-blue-600 hover:bg-white'>Buy At Amazon</button>

                            </div>
                        </Link>
                    ))
                )}
            </div>
            <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>
            <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight /></button>
        </div>
    );
};

export default VerticalCardProduct;
