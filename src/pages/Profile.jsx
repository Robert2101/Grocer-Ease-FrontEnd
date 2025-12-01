import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAppStore from "../store/appStore.js"; 

const Profile = () => {
    const navigate = useNavigate();

    const { user, logout } = useAppStore();

    useEffect(() => {
        if (!user) {
            toast.error("Please log in to view your profile.");
            navigate("/");
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        toast.success("You have been logged out.");
        navigate("/");
    };

    if (!user) {
        return null;
    }

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">My Profile</h1>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-lg text-gray-800">{user.name}</p>
                </div>
                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-lg text-gray-800">{user.email}</p>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-500">Member Since</label>
                    <p className="text-lg text-gray-800">{user.joined}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Order History</h2>
                <p className="text-gray-600 text-center py-4">
                    You have no past orders.
                </p>
            </div>

            <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-600 transition-colors"
            >
                Logout
            </button>
        </div>
    );
};

export default Profile;