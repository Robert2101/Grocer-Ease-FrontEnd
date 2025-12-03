import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";
import { Toaster } from "sonner";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Toaster position="top-center" richColors />
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;