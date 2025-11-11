import { useState } from "react";

const PropsStateExercise = () => {
  const [showExample, setShowExample] = useState(false);

  const handleToggleExample = () => {
    setShowExample((prev) => !prev);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Exercise 2: Props & State
        </h1>
        <p className="text-gray-600 mb-6">
          Learn to manage component state and pass props
        </p>

        <div className="space-y-6">
          <section className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Your Task
            </h2>
            <p className="text-gray-600">
              Create a{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">
                QuantitySelector
              </code>{" "}
              component that uses state to track and display product quantity.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Instructions
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Create a{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  QuantitySelector
                </code>{" "}
                component
              </li>
              <li>
                Use{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">useState</code>{" "}
                to manage quantity (start at 1)
              </li>
              <li>Add buttons to increment and decrement the quantity</li>
              <li>Display the current quantity</li>
              <li>Ensure quantity cannot go below 1</li>
              <li>
                Accept a{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  productName
                </code>{" "}
                prop to display
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
              <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                <code>{`import { useState } from 'react';

type QuantitySelectorProps = {
  productName: string;
};

const QuantitySelector = ({ productName }: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <h3>{productName}</h3>
      <button onClick={handleDecrement}>-</button>
      <span>Quantity: {quantity}</span>
      <button onClick={handleIncrement}>+</button>
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
              Create your QuantitySelector component and use it here:
            </p>
            <div className="bg-white p-4 rounded border">
              {/* TODO: Import and use your QuantitySelector component here */}
              <p className="text-gray-400">
                QuantitySelector component should appear here for "Smart Watch"
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PropsStateExercise;
