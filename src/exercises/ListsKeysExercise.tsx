import { useState } from "react";
import { products } from "../data/products";

const ListsKeysExercise = () => {
  const [showExample, setShowExample] = useState(false);

  const handleToggleExample = () => {
    setShowExample((prev) => !prev);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Exercise 5: Lists & Keys
        </h1>
        <p className="text-gray-600 mb-6">
          Learn to render lists of items with proper keys
        </p>

        <div className="space-y-6">
          <section className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Your Task
            </h2>
            <p className="text-gray-600">
              Display a list of products from the products array. Each product
              should be rendered in a card format with proper keys.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Instructions
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Import the{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">products</code>{" "}
                array from{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  ../data/products
                </code>
              </li>
              <li>
                Use <code className="bg-gray-200 px-2 py-1 rounded">map()</code>{" "}
                to render each product
              </li>
              <li>
                Use the product{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">id</code> as the
                key prop
              </li>
              <li>Display product name, price, description, and category</li>
              <li>Style each product card with Tailwind CSS</li>
              <li>Group products by category (optional challenge)</li>
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
                <code>{`import { products } from '../data/products';

const ProductList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded p-4">
          <h3 className="font-bold">{product.name}</h3>
          <p className="text-blue-600">{product.price}</p>
          <p className="text-gray-600">{product.description}</p>
          <span className="text-sm text-gray-500">{product.category}</span>
        </div>
      ))}
    </div>
  );
};`}</code>
              </pre>
            )}
          </section>

          <section className="border-2 border-dashed border-gray-300 p-8 rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Your Solution Area
            </h2>
            <p className="text-gray-500 italic mb-4">
              Display all products from the products array:
            </p>
            <div className="bg-white p-4 rounded border">
              {/* TODO: Map over products array and display each product */}
              <p className="text-gray-400 italic">
                Product list should appear here. Use products.map() to render
                each product.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ListsKeysExercise;
