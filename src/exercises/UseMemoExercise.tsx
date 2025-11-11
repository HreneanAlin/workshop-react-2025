import { useState, useMemo } from "react";
import { products } from "../data/products";

const UseMemoExercise = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState<
    "price-asc" | "price-desc" | "name" | "none"
  >("none");
  const [showExample, setShowExample] = useState(false);

  const handleToggleExample = () => {
    setShowExample((prev) => !prev);
  };
  // Temporary non-memoized versions for display
  const categories = ["all", ...new Set(products.map((p) => p.category))];
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });
  const statistics = {
    total: filteredProducts
      .reduce((sum, product) => sum + product.price, 0)
      .toFixed(2),
    average:
      filteredProducts.length > 0
        ? (
            filteredProducts.reduce((sum, product) => sum + product.price, 0) /
            filteredProducts.length
          ).toFixed(2)
        : "0.00",
    count: filteredProducts.length,
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Exercise: useMemo Hook
        </h1>
        <p className="text-gray-600 mb-6">
          Learn to optimize expensive calculations with memoization
        </p>

        <div className="space-y-6">
          <section className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Your Task
            </h2>
            <p className="text-gray-600">
              Create a product filtering and sorting component that uses{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">useMemo</code> to
              optimize expensive calculations and prevent unnecessary
              recalculations.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Instructions
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Import{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">useMemo</code>{" "}
                from React
              </li>
              <li>
                Memoize the categories list (empty dependency array - only
                calculate once)
              </li>
              <li>
                Memoize filtered products (dependencies:{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  selectedCategory, minPrice, maxPrice
                </code>
                )
              </li>
              <li>
                Memoize sorted products (dependencies:{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  filteredProducts, sortBy
                </code>
                )
              </li>
              <li>
                Memoize statistics calculation (dependency:{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  filteredProducts
                </code>
                )
              </li>
              <li>
                Check the console - you should see logs only when dependencies
                change
              </li>
            </ol>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                💡 Example Code Structure
              </h2>
              <button
                onClick={handleToggleExample}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                aria-label={
                  showExample ? "Hide example code" : "Show example code"
                }
                tabIndex={0}
              >
                {showExample ? "Hide Example" : "Show Example"}
              </button>
            </div>
            {showExample && (
              <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
                <code>{`// Memoize filtered products
const filteredProducts = useMemo(() => {
  console.log("Filtering products...");
  return products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= minPrice && product.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });
}, [selectedCategory, minPrice, maxPrice]);

// Memoize sorted products
const sortedProducts = useMemo(() => {
  console.log("Sorting products...");
  const sorted = [...filteredProducts];
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}, [filteredProducts, sortBy]);

// Memoize statistics
const statistics = useMemo(() => {
  console.log("Calculating statistics...");
  const total = filteredProducts.reduce(
    (sum, product) => sum + product.price,
    0
  );
  const average =
    filteredProducts.length > 0 ? total / filteredProducts.length : 0;
  return {
    total: total.toFixed(2),
    average: average.toFixed(2),
    count: filteredProducts.length,
  };
}, [filteredProducts]);`}</code>
              </pre>
            )}
          </section>

          <section className="bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              📚 Key Concepts
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>useMemo:</strong> Memoizes (caches) the result of an
                expensive calculation
              </li>
              <li>
                <strong>Dependency Array:</strong> Only recalculates when
                dependencies change
              </li>
              <li>
                <strong>Performance:</strong> Prevents unnecessary
                recalculations on every render
              </li>
              <li>
                <strong>When to Use:</strong> Expensive operations (filtering
                large arrays, complex calculations)
              </li>
              <li>
                <strong>When NOT to Use:</strong> Simple calculations (overhead
                isn't worth it)
              </li>
            </ul>
          </section>

          <section className="border-2 border-dashed border-gray-300 p-8 rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Your Solution Area
            </h2>
            <div className="space-y-6">
              {/* Filters */}
              <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Filter by category"
                    tabIndex={0}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Min Price
                    </label>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      aria-label="Minimum price"
                      tabIndex={0}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Max Price
                    </label>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      aria-label="Maximum price"
                      tabIndex={0}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Sort products"
                    tabIndex={0}
                  >
                    <option value="none">None</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold">{statistics.count}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold">${statistics.total}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Average Price</p>
                  <p className="text-2xl font-bold">${statistics.average}</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600">Price Range</p>
                  <p className="text-lg font-bold">
                    {filteredProducts.length > 0
                      ? `$${Math.min(
                          ...filteredProducts.map((p) => p.price)
                        ).toFixed(2)} - $${Math.max(
                          ...filteredProducts.map((p) => p.price)
                        ).toFixed(2)}`
                      : "No products"}
                  </p>
                </div>
              </div>

              {/* Product List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 border rounded-lg shadow-md"
                  >
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {product.category}
                    </p>
                    <p className="text-gray-700 mb-2">{product.description}</p>
                    <p className="text-blue-600 font-semibold text-xl">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {sortedProducts.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No products match your filters
                </div>
              )}

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>💡 Tip:</strong> Open the browser console and watch
                  the logs. With{" "}
                  <code className="bg-gray-200 px-1 py-0.5 rounded">
                    useMemo
                  </code>
                  , you should only see "Filtering products...", "Sorting
                  products...", and "Calculating statistics..." when the
                  relevant dependencies change, not on every render!
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UseMemoExercise;
