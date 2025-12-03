import { useNavigate, Link } from "react-router-dom";
import useAppStore from "../store/appStore";
import { useState } from "react";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cartItems, user, placeOrder } = useAppStore();

    const [formData, setFormData] = useState({
        fullName: user?.name || "",
        address: "",
        email: user?.email || ""
    });

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    ).toFixed(2);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        const orderData = {
            userEmail: user.email, 
            date: new Date().toISOString(),
            items: cartItems,
            totalAmount: cartTotal,
            shippingDetails: formData,
            status: "Processing"
        };

        const success = await placeOrder(orderData);

        if (success) {
            navigate("/order-success");
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="text-center mt-10">
                <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
                <Link to="/" className="bg-green-600 text-white px-6 py-2 rounded-lg">
                    Start Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Shipping Information</h2>
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" id="fullName" value={formData.fullName} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <input type="text" id="address" value={formData.address} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" value={formData.email} onChange={handleInputChange} required readOnly className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100" />
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
                    <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
                    <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span>{item.name} x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between text-xl font-bold mb-6">
                        <span>Total</span>
                        <span>${cartTotal}</span>
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
                        Confirm & Pay
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;