import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useAppStore from "../store/appStore"; 
import { ChevronLeft, Loader } from "lucide-react";

const ProductDetailsPage = () => {
    const { productId } = useParams();

    const { products, addToCart, fetchProducts, isLoading } = useAppStore();

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [products.length, fetchProducts]);

    const product = products.find((p) => p.id === productId);

    if (isLoading && !product) {
        return (
            <div className="flex h-[50vh] justify-center items-center">
                <Loader className="animate-spin text-green-600" size={40} />
            </div>
        );
    }

    if (!product && !isLoading) {
        return (
            <div className="text-center py-12">
                <h1 className="text-3xl font-bold text-gray-800">Product not found.</h1>
                <p className="text-gray-600 mt-2">The product you are looking for does not exist.</p>
                <Link to="/" className="text-green-600 hover:underline mt-4 inline-block font-medium">
                    &larr; Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link
                to= "/"
                className="inline-flex items-center text-green-600 hover:underline mb-6"
            >
                <ChevronLeft size={20} />
                Back to category
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full rounded-lg object-cover aspect-square"
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-3 text-gray-800">{product.name}</h1>

                    <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-3xl font-bold text-green-600">
                            ${product.price.toFixed(2)}
                        </span>
                        {product.unit && (
                            <span className="text-lg text-gray-500">{product.unit}</span>
                        )}
                    </div>

                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {product.isOrganic && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                Organic
                            </span>
                        )}
                        {product.isGlutenFree && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                Gluten-Free
                            </span>
                        )}
                        {product.isVegan && (
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                Vegan
                            </span>
                        )}
                    </div>

                    <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-green-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;