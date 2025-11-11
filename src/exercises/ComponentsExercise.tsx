import { useState } from "react";

const ComponentsExercise = () => {
  const [showExample, setShowExample] = useState(false);

  const handleToggleExample = () => {
    setShowExample((prev) => !prev);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Exercise: Components & JSX
        </h1>
        <p className="text-gray-600 mb-6">
          Learn to create reusable React components with JSX
        </p>

        <div className="space-y-6">
          <section className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Your Task
            </h2>
            <p className="text-gray-600">
              Create a{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">ProductCard</code>{" "}
              component that displays product information in a card format.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Instructions
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Create a new component file:{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  ProductCard.tsx
                </code>
              </li>
              <li>
                The component should accept props:{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">name</code>,{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">price</code>,
                and{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  description
                </code>
              </li>
              <li>
                Display the product name as a heading, price with a dollar sign,
                and description
              </li>
              <li>Style it with Tailwind CSS classes</li>
              <li>Use the component below to display a sample product</li>
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
                <code>{`type ProductCardProps = {
  name: string;
  price: number;
  description: string;
};

const ProductCard = ({ name, price, description }: ProductCardProps) => {
  return (
    <div className="border rounded-lg p-4">
      <h3>{name}</h3>
      <p className="text-blue-600 font-bold">{price}</p>
      <p>{description}</p>
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
              Create your ProductCard component and use it here:
            </p>
            <div className="bg-white p-4 rounded border">
              {/* TODO: Import and use your ProductCard component here */}
              <p className="text-gray-400">
                ProductCard component should appear here with:
                <br />
                Name: &quot;Wireless Headphones&quot;
                <br />
                Price: $99.99
                <br />
                Description: &quot;Premium wireless headphones with noise
                cancellation&quot;
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ComponentsExercise;
