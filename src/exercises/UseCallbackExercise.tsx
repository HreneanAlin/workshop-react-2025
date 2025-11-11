import { useState, useCallback, useMemo, memo } from "react";
import { products } from "../data/products";
import type { Product } from "../types";

type CartItem = {
  productId: number;
  quantity: number;
};

type ProductItemProps = {
  product: Product;
  onAddToCart: (id: number) => void;
  onRemoveFromCart: (id: number) => void;
  cartQuantity: number;
};

// TODO: Wrap this component with React.memo
// const ProductItem = memo(({ product, onAddToCart, onRemoveFromCart, cartQuantity }: ProductItemProps) => {
const ProductItem = ({
  product,
  onAddToCart,
  onRemoveFromCart,
  cartQuantity,
}: ProductItemProps) => {
  console.log(`Rendering ${product.name}`); // For demonstration

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-2">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{product.category}</p>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-blue-600 font-semibold text-xl mb-4">
        ${product.price.toFixed(2)}
      </p>
      <div className="flex gap-2 items-center">
        <button
          onClick={() => onAddToCart(product.id)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          aria-label={`Add ${product.name} to cart`}
          tabIndex={0}
        >
          Add to Cart
        </button>
        {cartQuantity > 0 && (
          <>
            <span className="px-4 py-2 font-semibold">Qty: {cartQuantity}</span>
            <button
              onClick={() => onRemoveFromCart(product.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              aria-label={`Remove ${product.name} from cart`}
              tabIndex={0}
            >
              Remove
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// TODO: Add displayName if using memo
// ProductItem.displayName = "ProductItem";

const UseCallbackExercise = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showExample, setShowExample] = useState(false);

  const handleToggleExample = () => {
    setShowExample((prev) => !prev);
  };

  // Temporary non-memoized versions
  const handleAddToCart = (productId: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Temporary non-memoized versions
  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  const cartTotal = cartItems.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getCartQuantity = (productId: number) => {
    const item = cartItems.find((item) => item.productId === productId);
    return item?.quantity || 0;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Exercise: useCallback Hook
        </h1>
        <p className="text-gray-600 mb-6">
          Learn to memoize functions to prevent unnecessary re-renders
        </p>

        <div className="space-y-6">
          <section className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Your Task
            </h2>
            <p className="text-gray-600">
              Create a product cart component that uses{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">useCallback</code>{" "}
              to memoize event handlers and prevent unnecessary child component
              re-renders.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Instructions
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Import{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  useCallback
                </code>{" "}
                and <code className="bg-gray-200 px-2 py-1 rounded">memo</code>{" "}
                from React
              </li>
              <li>
                Wrap{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  ProductItem
                </code>{" "}
                with{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  React.memo
                </code>
              </li>
              <li>
                Memoize{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  handleAddToCart
                </code>{" "}
                with{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  useCallback
                </code>
              </li>
              <li>
                Memoize{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  handleRemoveFromCart
                </code>{" "}
                and{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  handleClearCart
                </code>
              </li>
              <li>
                Memoize{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  handleSearchChange
                </code>
              </li>
              <li>
                Memoize{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  getCartQuantity
                </code>{" "}
                helper function
              </li>
              <li>
                Check the console - with memoization, each product should only
                re-render when its props actually change
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
                <code>{`// Memoize child component
const ProductItem = memo(({ product, onAddToCart, ... }: ProductItemProps) => {
  // Component code
});

// Memoize handlers
const handleAddToCart = useCallback((productId: number) => {
  setCartItems((prev) => {
    // Use functional update to avoid dependencies
    const existing = prev.find((item) => item.productId === productId);
    if (existing) {
      return prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    return [...prev, { productId, quantity: 1 }];
  });
}, []); // Empty array - uses functional update

// Memoize helper
const getCartQuantity = useCallback(
  (productId: number) => {
    const item = cartItems.find((item) => item.productId === productId);
    return item?.quantity || 0;
  },
  [cartItems] // Include dependency since we access cartItems
);`}</code>
              </pre>
            )}
          </section>

          <section className="bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              📚 Key Concepts
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>useCallback:</strong> Returns a memoized version of a
                function that only changes when dependencies change
              </li>
              <li>
                <strong>React.memo:</strong> Prevents re-renders if props
                haven't changed (works best with useCallback)
              </li>
              <li>
                <strong>Functional Updates:</strong> Using{" "}
                <code className="bg-gray-200 px-1 py-0.5 rounded">
                  {"setState((prev) => ...)"}
                </code>{" "}
                avoids needing state in dependencies
              </li>
              <li>
                <strong>Performance:</strong> Prevents unnecessary child
                re-renders when parent re-renders
              </li>
              <li>
                <strong>When to Use:</strong> Passing callbacks to memoized
                components or using in dependency arrays
              </li>
            </ul>
          </section>

          <section className="border-2 border-dashed border-gray-300 p-8 rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Your Solution Area
            </h2>
            <div className="space-y-6">
              {/* Search and Cart Summary */}
              <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Search products"
                    tabIndex={0}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">
                      Items in cart: {cartItemCount}
                    </p>
                    <p className="text-lg font-bold">
                      Total: ${cartTotal.toFixed(2)}
                    </p>
                  </div>
                  {cartItems.length > 0 && (
                    <button
                      onClick={handleClearCart}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      aria-label="Clear cart"
                      tabIndex={0}
                    >
                      Clear Cart
                    </button>
                  )}
                </div>
              </div>

              {/* Product List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onRemoveFromCart={handleRemoveFromCart}
                    cartQuantity={getCartQuantity(product.id)}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No products found matching "{searchTerm}"
                </div>
              )}

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>💡 Tip:</strong> Open the browser console and watch
                  the "Rendering [Product Name]" logs. With{" "}
                  <code className="bg-gray-200 px-1 py-0.5 rounded">
                    useCallback
                  </code>{" "}
                  and{" "}
                  <code className="bg-gray-200 px-1 py-0.5 rounded">
                    React.memo
                  </code>
                  , each product should only re-render when its specific props
                  change (like cartQuantity), not when other products are added
                  to the cart or when you type in the search box!
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UseCallbackExercise;
