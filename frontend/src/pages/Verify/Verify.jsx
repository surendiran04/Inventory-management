import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
const { VITE_BACKEND_URL } = import.meta.env;

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
 // Context URL for API
    const navigate = useNavigate();

    // Function to verify payment using fetch
    const verifyPayment = async () => {
        try {
            const response = await fetch(`${VITE_BACKEND_URL}/api/order/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ success, orderId }),
            });

            const data = await response.json();

            if (data.success) {
                // Redirect to 'myorders' if payment is successful
                navigate("/myorders");
            } else {
                // Redirect to home if payment failed
                navigate("/");
            }
        } catch (error) {
            console.error("Payment verification failed:", error);
            // In case of an error, redirect to home page
            navigate("/");
        }
    }

    // Call verifyPayment on component mount
    useEffect(() => {
        if (success && orderId) {
            verifyPayment();
        } else {
            navigate("/");  // If there's no success or orderId, redirect to homepage
        }
    }, [success, orderId, navigate]);

    return (
        <div className='verify'>
            <div className="spinner"></div>
            <p>Verifying your payment...</p>
        </div>
    )
}

export default Verify;

