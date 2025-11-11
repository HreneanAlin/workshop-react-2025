import { useState } from "react";
import { products } from "../data/products";
import type { CartItem } from "../types";

const EventHandlingExercise = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Exercise 4: Event Handling
        </h1>
        <p className="text-gray-600 mb-6">
          Learn to handle user interactions and update state
        </p>

        <div className="space-y-6">
          <section className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Your Task
            </h2>
            <p className="text-gray-600">
              Create an "Add to Cart" button that adds products to a shopping
              cart. Display the cart items and total price.
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
                  handleAddToCart
                </code>{" "}
                function
              </li>
              <li>The function should add a product to the cart state</li>
              <li>
                If the product already exists in cart, increase its quantity
              </li>
              <li>Display all cart items with their quantities</li>
              <li>Calculate and display the total price</li>
              <li>Add a "Clear Cart" button that empties the cart</li>
            </ol>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              💡 Example Code Structure
            </h2>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
              <code>{`const handleAddToCart = (product: Product) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find(
      (item) => item.product.id === product.id
    );
    
    if (existingItem) {
      return prevCart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    
    return [...prevCart, { product, quantity: 1 }];
  });
};

const totalPrice = cart.reduce(
  (sum, item) => sum + item.product.price * item.quantity,
  0
);`}</code>
            </pre>
          </section>

          <section className="border-2 border-dashed border-gray-300 p-8 rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Your Solution Area
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Products</h3>
                <div className="space-y-2">
                  {products.slice(0, 3).map((product) => (
                    <div
                      key={product.id}
                      className="border rounded p-3 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-blue-600">${product.price}</p>
                      </div>
                      {/* TODO: Add "Add to Cart" button here */}
                      <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded">
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Shopping Cart</h3>
                <div className="border rounded p-4 bg-white">
                  {/* TODO: Display cart items here */}
                  <p className="text-gray-400 italic">
                    Cart items will appear here
                  </p>
                  {/* TODO: Display total price */}
                  <p className="mt-4 font-bold">Total: $0.00</p>
                  {/* TODO: Add "Clear Cart" button */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EventHandlingExercise;
