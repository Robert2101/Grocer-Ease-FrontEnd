import React, { useEffect } from 'react';
import useAppStore from '../store/appStore';
import { User, Package, LogOut, MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout, orders, fetchOrders } = useAppStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.email) {
            fetchOrders(user.email);
        }
    }, [user, fetchOrders]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
            case 'shipping': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        }
    };

    if (!user) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24 border border-gray-100">
                        <div className="h-32 bg-gradient-to-r from-green-500 to-emerald-600"></div>

                        <div className="px-6 pb-8 text-center relative">
                            <div className="-mt-12 mb-4 relative inline-block">
                                <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md mx-auto">
                                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${user.name}&background=10b981&color=fff&size=128`}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                            <p className="text-sm text-gray-500 mb-6">{user.email}</p>

                            <div className="space-y-3 text-left">
                                <div className="flex items-center gap-3 text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                                    <Calendar size={18} className="text-green-600" />
                                    <span>Joined {user.joined || 'Recently'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                                    <MapPin size={18} className="text-green-600" />
                                    <span>India</span>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="mt-8 w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl font-medium hover:bg-red-100 hover:shadow-md transition-all duration-200"
                            >
                                <LogOut size={18} /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                            <span className="p-2 bg-green-100 text-green-600 rounded-lg">
                                <Package size={24} />
                            </span>
                            Order History
                        </h2>
                        <span className="text-gray-500 text-sm font-medium">{orders.length} Orders placed</span>
                    </div>

                    {orders.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                                <Package size={40} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders yet</h3>
                            <p className="text-gray-500 mb-6">Looks like you haven't made your first purchase.</p>
                            <button
                                onClick={() => navigate('/')}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                                >
                                    <div className="bg-gray-50/50 p-4 sm:p-6 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Order ID</p>
                                                <p className="text-sm font-bold text-gray-900">#{order.id.toString().slice(-6).toUpperCase()}</p>
                                            </div>
                                            <div className="hidden sm:block w-px h-8 bg-gray-300"></div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Date Placed</p>
                                                <div className="flex items-center gap-1 text-sm text-gray-700 font-medium">
                                                    <Clock size={14} className="text-gray-400" />
                                                    {new Date(order.date).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)} uppercase tracking-wider`}>
                                                {order.status}
                                            </span>
                                            <p className="text-xl font-bold text-gray-900">${order.totalAmount}</p>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row gap-6">

                                            <div className="flex-1">
                                                <h4 className="text-sm font-semibold text-gray-600 mb-3">Items Ordered</h4>
                                                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="flex-shrink-0 group relative w-20 space-y-2">
                                                            <div className="w-20 h-20 rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                                                                />
                                                            </div>
                                                            <div className="text-xs text-gray-500 text-center truncate px-1">
                                                                <span className="font-semibold text-gray-800">{item.quantity}x</span> {item.name}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="md:w-64 md:border-l border-gray-100 md:pl-6 flex flex-col justify-center">
                                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Shipping To</h4>
                                                <p className="font-medium text-gray-900 text-sm mb-1">{order.shippingDetails?.fullName || user.name}</p>
                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    {order.shippingDetails?.address || "Address not available"}
                                                </p>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;