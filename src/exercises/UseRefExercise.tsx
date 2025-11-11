import { useState, useRef, useEffect } from "react";
import { products } from "../data/products";
import type { Product } from "../types";

const UseRefExercise = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [showExample, setShowExample] = useState(false);

  const handleToggleExample = () => {
    setShowExample((prev) => !prev);
  };

  // TODO: Implement these handlers
  const handleFocusSearch = () => {};

  const handleMeasureList = () => {};

  const handleProductSelect = (productId: number) => {
    setSelectedProductId(productId);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Exercise: useRef Hook
        </h1>
        <p className="text-gray-600 mb-6">
          Learn to access DOM elements and persist values without re-renders
        </p>

        <div className="space-y-6">
          <section className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Your Task
            </h2>
            <p className="text-gray-600">
              Create a product search component that uses{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">useRef</code> to
              focus inputs, track previous values, measure elements, and scroll
              to products.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Instructions
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Import{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">useRef</code>{" "}
                from React
              </li>
              <li>
                Create a ref for the search input:{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  useRef{"<"}HTMLInputElement{">"}(null)
                </code>
              </li>
              <li>
                Attach the ref to the input using the{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">ref</code>{" "}
                attribute
              </li>
              <li>
                Implement{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  handleFocusSearch
                </code>{" "}
                to focus the input
              </li>
              <li>
                Create a ref to track the previous search term (use{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">useEffect</code>{" "}
                to update it)
              </li>
              <li>
                Create a ref for the product list container and implement{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  handleMeasureList
                </code>
              </li>
              <li>
                Create refs for individual products and implement scroll
                functionality in{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  handleProductSelect
                </code>
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
                <code>{`// Create refs
const searchInputRef = useRef<HTMLInputElement>(null);
const prevSearchTermRef = useRef<string>("");

// Track previous value
useEffect(() => {
  prevSearchTermRef.current = searchTerm;
}, [searchTerm]);

// Focus input
const handleFocusSearch = () => {
  searchInputRef.current?.focus();
};

// Attach to element
<input
  ref={searchInputRef}
  type="text"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

// Measure element
const productListRef = useRef<HTMLDivElement>(null);
const handleMeasureList = () => {
  if (productListRef.current) {
    const { width, height } = productListRef.current.getBoundingClientRect();
    setDimensions({ width, height });
  }
};`}</code>
              </pre>
            )}
          </section>

          <section className="bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              📚 Key Concepts
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>useRef:</strong> Returns a mutable ref object that
                persists across renders
              </li>
              <li>
                <strong>DOM Access:</strong> Use refs to access DOM methods like{" "}
                <code className="bg-gray-200 px-1 py-0.5 rounded">focus()</code>
                ,{" "}
                <code className="bg-gray-200 px-1 py-0.5 rounded">
                  scrollIntoView()
                </code>
                , etc.
              </li>
              <li>
                <strong>No Re-renders:</strong> Updating{" "}
                <code className="bg-gray-200 px-1 py-0.5 rounded">
                  ref.current
                </code>{" "}
                doesn't trigger re-renders
              </li>
              <li>
                <strong>Optional Chaining:</strong> Always use{" "}
                <code className="bg-gray-200 px-1 py-0.5 rounded">?.</code> when
                accessing{" "}
                <code className="bg-gray-200 px-1 py-0.5 rounded">
                  ref.current
                </code>
              </li>
            </ul>
          </section>

          <section className="border-2 border-dashed border-gray-300 p-8 rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Your Solution Area
            </h2>
            <div className="space-y-6">
              {/* Search Section */}
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    // TODO: Add ref attribute here
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Search products"
                    tabIndex={0}
                  />
                  <button
                    onClick={handleFocusSearch}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    aria-label="Focus search input"
                    tabIndex={0}
                  >
                    Focus Search
                  </button>
                </div>
              </div>

              {/* Dimensions Section */}
              <div>
                <button
                  onClick={handleMeasureList}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors mb-2"
                  aria-label="Measure product list dimensions"
                  tabIndex={0}
                >
                  Measure Product List
                </button>
                {dimensions.width > 0 && (
                  <p className="text-sm text-gray-600">
                    List dimensions: {Math.round(dimensions.width)}px ×{" "}
                    {Math.round(dimensions.height)}px
                  </p>
                )}
              </div>

              {/* Product List */}
              <div
                // TODO: Add ref attribute here
                className="space-y-4 max-h-96 overflow-y-auto border rounded-lg p-4"
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedProductId === product.id
                        ? "bg-blue-100 border-blue-500"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleProductSelect(product.id)}
                    aria-label={`Select ${product.name}`}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleProductSelect(product.id);
                      }
                    }}
                  >
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="text-blue-600 font-semibold mt-2">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UseRefExercise;
