import { useState } from "react";
import { products } from "../data/products";

const UseEffectExercise = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [viewTime, setViewTime] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [showExample, setShowExample] = useState(false);

  const handleToggleExample = () => {
    setShowExample((prev) => !prev);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Exercise 3: useEffect Hook
        </h1>
        <p className="text-gray-600 mb-6">
          Learn to handle side effects and lifecycle events in React
        </p>

        <div className="space-y-6">
          <section className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Your Task
            </h2>
            <p className="text-gray-600">
              Create a product viewer that tracks viewing time and saves view
              count to localStorage using the{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">useEffect</code>{" "}
              hook.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Instructions
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Import{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">useEffect</code>{" "}
                from React
              </li>
              <li>
                Use{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">useEffect</code>{" "}
                to create a timer that increments{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">viewTime</code>{" "}
                every second
              </li>
              <li>
                Update the document title to show the current viewing time
              </li>
              <li>
                Load the view count from localStorage when the component mounts
              </li>
              <li>Save the view count to localStorage whenever it changes</li>
              <li>Increment view count when a product is selected</li>
              <li>
                Clean up the timer when the component unmounts or product
                changes
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
                <code>{`import { useState, useEffect } from 'react';

// Timer effect - runs every second
useEffect(() => {
  const interval = setInterval(() => {
    setViewTime((prev) => prev + 1);
  }, 1000);

  // Cleanup function
  return () => clearInterval(interval);
}, []); // Empty dependency array = runs once on mount

// Document title effect - runs when viewTime changes
useEffect(() => {
  document.title = \`Viewing for \${viewTime}s - \${selectedProduct.name}\`;
}, [viewTime, selectedProduct.name]);

// Load from localStorage on mount
useEffect(() => {
  const saved = localStorage.getItem('viewCount');
  if (saved) {
    setViewCount(parseInt(saved, 10));
  }
}, []); // Run once on mount

// Save to localStorage when viewCount changes
useEffect(() => {
  localStorage.setItem('viewCount', viewCount.toString());
}, [viewCount]);`}</code>
              </pre>
            )}
          </section>

          <section className="bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              📚 Key Concepts
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Dependency Array:</strong> Controls when the effect runs
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>
                    <code className="bg-gray-200 px-1 py-0.5 rounded">[]</code>{" "}
                    = runs once on mount
                  </li>
                  <li>
                    <code className="bg-gray-200 px-1 py-0.5 rounded">
                      [value]
                    </code>{" "}
                    = runs when value changes
                  </li>
                  <li>No array = runs on every render (usually avoid this)</li>
                </ul>
              </li>
              <li>
                <strong>Cleanup Function:</strong> Return a function to clean up
                (clear timers, cancel requests, etc.)
              </li>
              <li>
                <strong>Side Effects:</strong> Operations that affect something
                outside the component (API calls, timers, DOM manipulation,
                etc.)
              </li>
            </ul>
          </section>

          <section className="border-2 border-dashed border-gray-300 p-8 rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Your Solution Area
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Select a Product</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {products.slice(0, 3).map((product) => (
                    <button
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className={`p-3 border-2 rounded-lg text-left transition-colors ${
                        selectedProduct.id === product.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      aria-label={`Select ${product.name}`}
                      tabIndex={0}
                    >
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-blue-600 text-xs mt-1">
                        ${product.price}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-xl font-bold mb-4">
                  {selectedProduct.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedProduct.description}
                </p>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <strong>Viewing Time:</strong>{" "}
                    <span className="text-blue-600 font-mono">
                      {/* TODO: Display viewTime here */}
                      {viewTime}s
                    </span>
                  </p>
                  <p className="text-gray-700">
                    <strong>Total Views:</strong>{" "}
                    <span className="text-blue-600 font-mono">
                      {/* TODO: Display viewCount here */}
                      {viewCount}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 italic mt-4">
                    {/* TODO: Check browser tab title - it should update! */}
                    Check the browser tab title - it should show the viewing
                    time
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UseEffectExercise;
