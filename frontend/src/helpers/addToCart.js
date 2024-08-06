import SummaryApi from "../common";
import { toast } from 'react-toastify';

const addToCart = async (e, id) => {
    if (e && typeof e.stopPropagation === 'function') {
        e.stopPropagation();
        e.preventDefault();
    }

    // Rest of the function remains unchanged
    const response = await fetch(SummaryApi.addToCartProduct.url, {
        method: SummaryApi.addToCartProduct.method,
        credentials: 'include',
        headers: {
            "content-type": 'application/json'
        },
        body: JSON.stringify({ productId: id })
    });

    const responseData = await response.json();

    if (responseData.success) {
        toast.success(responseData.message);
    }

    if (responseData.error) {
        toast.error(responseData.message);
    }

    return responseData;
};


export default addToCart;
