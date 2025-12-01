import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useAppStore from "../store/appStore.js";
import { allCategories, dietaryNeeds, getCategoryIcon } from "../data/staticData";
import { LayoutGrid, Loader } from "lucide-react";

const Home = () => {
    const { products, fetchProducts, isLoading } = useAppStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
    const [selectedDietaryNeeds, setSelectedDietaryNeeds] = useState([]);
    const [sortOption, setSortOption] = useState("most-popular");

    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === "all" || product.category === selectedCategory;

        const matchesPrice =
            product.price >= priceRange.min && product.price <= priceRange.max;

        const matchesDietary =
            selectedDietaryNeeds.length === 0 ||
            selectedDietaryNeeds.every((need) => {
                const key = `is${need.charAt(0).toUpperCase() + need.slice(1).replace("-", "")}`;
                return product[key];
            });

        return matchesCategory && matchesPrice && matchesDietary;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case "price-asc":
                return a.price - b.price;
            case "price-desc":
                return b.price - a.price;
            case "name-asc":
                return a.name.localeCompare(b.name);
            case "name-desc":
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });

    const handleDietaryChange = (e) => {
        const { id, checked } = e.target;
        if (checked) {
            setSelectedDietaryNeeds((prev) => [...prev, id]);
        } else {
            setSelectedDietaryNeeds((prev) => prev.filter((need) => need !== id));
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[70vh] justify-center items-center">
                <Loader className="animate-spin text-green-600" size={48} />
                <span className="ml-3 text-xl text-gray-600">Loading groceries...</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 min-h-[70vh]">
            {/* Sidebar Filters */}
            <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <LayoutGrid size={20} />
                    Filters
                </h2>

                {/* Category Filter */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Category</h3>
                    <div className="space-y-2">
                        {allCategories.map((cat) => {
                            const Icon = getCategoryIcon(cat.icon);
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex items-center gap-3 w-full p-3 rounded-lg
                    ${selectedCategory === cat.id
                                            ? "bg-green-100 text-green-700 font-semibold"
                                            : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    <Icon size={20} />
                                    {cat.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Price Filter */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                    <p className="text-sm mb-2">Max: ${priceRange.max}</p>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={priceRange.max}
                        onChange={(e) =>
                            setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }))
                        }
                        className="w-full accent-green-600"
                    />
                </div>

                {/* Dietary Needs */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Dietary Needs</h3>
                    <div className="space-y-2">
                        {dietaryNeeds.map((need) => (
                            <label key={need.id} className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    id={need.id}
                                    checked={selectedDietaryNeeds.includes(need.id)}
                                    onChange={handleDietaryChange}
                                    className="mr-2"
                                />
                                {need.name}
                            </label>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Products Grid */}
            <div className="w-full md:w-3/4">
                {/* Title & Sort */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">
                        {allCategories.find((cat) => cat.id === selectedCategory)?.name ||
                            "All Products"}
                    </h1>

                    <select
                        className="border rounded-lg px-3 py-2"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="most-popular">Most Popular</option>
                        <option value="price-asc">Price: Low → High</option>
                        <option value="price-desc">Price: High → Low</option>
                        <option value="name-asc">Name: A → Z</option>
                        <option value="name-desc">Name: Z → A</option>
                    </select>
                </div>

                {/* Breadcrumb */}
                <p className="text-sm text-gray-500 mb-4">
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>{" "}
                    ›{" "}
                    <span className="text-green-600 font-semibold">
                        {allCategories.find((cat) => cat.id === selectedCategory)?.name ||
                            "All Products"}
                    </span>
                </p>

                {/* Products */}
                {sortedProducts.length === 0 ? (
                    <p className="text-center text-xl text-gray-600 py-12">
                        No products found matching your filters.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;