# Exercise: useCallback Hook

## Learning Objectives

- Understand what `useCallback` is and when to use it
- Learn to memoize functions to prevent unnecessary re-renders
- Understand the relationship between `useCallback` and `useMemo`
- Learn to optimize child components with `React.memo`
- Practice preventing function recreation on every render
- Understand dependency arrays in `useCallback`

## Overview

In this exercise, you'll create a product list with interactive features that uses `useCallback` to:

- Memoize event handlers to prevent child component re-renders
- Optimize callbacks passed to child components
- Prevent unnecessary function recreations
- Work with `React.memo` to optimize performance

## Task

Create a product management component that:

- Displays a list of products with add/remove buttons
- Has a search functionality
- Uses `useCallback` to memoize all event handlers
- Uses `React.memo` to prevent unnecessary child re-renders
- Tracks cart items and total price

## Step-by-Step Instructions

### Step 1: Import useCallback and useMemo

```typescript
import { useState, useCallback, useMemo } from "react";
```

### Step 2: Memoize Event Handlers with useCallback

Wrap event handlers in `useCallback` to prevent recreation on every render:

```typescript
const handleAddToCart = useCallback((productId: number) => {
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
}, []);
```

**Key Points:**

- `useCallback` returns a memoized version of the function
- The function is only recreated when dependencies change
- Empty dependency array `[]` means the function never changes
- This prevents child components from re-rendering unnecessarily

### Step 3: Memoize Handlers with Dependencies

When handlers depend on state or props, include them in the dependency array:

```typescript
const handleRemoveFromCart = useCallback((productId: number) => {
  setCartItems((prev) => prev.filter((item) => item.productId !== productId));
}, []); // No dependencies needed - uses functional update

const handleUpdateQuantity = useCallback(
  (productId: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  },
  []
); // No dependencies - uses functional update
```

**Key Points:**

- Using functional updates (`prev => ...`) avoids needing dependencies
- If you access state directly, include it in dependencies

### Step 4: Memoize Search Handler

Memoize the search handler with the search term as a dependency:

```typescript
const handleSearchChange = useCallback((value: string) => {
  setSearchTerm(value);
}, []); // No dependency - just updates state

// Or if you need to use searchTerm in the handler:
const handleSearchSubmit = useCallback(() => {
  console.log("Searching for:", searchTerm);
  // Perform search...
}, [searchTerm]); // Include searchTerm if used in handler
```

### Step 5: Create Memoized Child Component

Use `React.memo` to prevent re-renders when props haven't changed:

```typescript
type ProductItemProps = {
  product: Product;
  onAddToCart: (id: number) => void;
  onRemoveFromCart: (id: number) => void;
  cartQuantity: number;
};

const ProductItem = React.memo(
  ({
    product,
    onAddToCart,
    onRemoveFromCart,
    cartQuantity,
  }: ProductItemProps) => {
    return (
      <div className="p-4 border rounded-lg">
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-blue-600 font-semibold">
          ${product.price.toFixed(2)}
        </p>
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => onAddToCart(product.id)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add to Cart
          </button>
          {cartQuantity > 0 && (
            <>
              <span className="px-4 py-2">{cartQuantity}</span>
              <button
                onClick={() => onRemoveFromCart(product.id)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
);
```

**Key Points:**

- `React.memo` prevents re-renders if props haven't changed
- Works best with `useCallback` for function props
- Only re-renders when props actually change

### Step 6: Memoize Derived Values

Use `useMemo` for computed values that depend on callbacks:

```typescript
const cartTotal = useMemo(() => {
  return cartItems.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);
}, [cartItems]);
```

## Complete Solution Example

```typescript
import { useState, useCallback, useMemo } from "react";
import { memo } from "react";
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

// Memoized child component
const ProductItem = memo(
  ({
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
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add to Cart
          </button>
          {cartQuantity > 0 && (
            <>
              <span className="px-4 py-2 font-semibold">
                Qty: {cartQuantity}
              </span>
              <button
                onClick={() => onRemoveFromCart(product.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
);

ProductItem.displayName = "ProductItem";

const UseCallbackExercise = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Memoized handlers - prevent recreation on every render
  const handleAddToCart = useCallback((productId: number) => {
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
  }, []); // Empty array - function never changes

  const handleRemoveFromCart = useCallback((productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []); // Empty array - uses functional update

  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  ); // No dependencies - just updates state

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Memoized cart total
  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  }, [cartItems]);

  // Memoized cart item count
  const cartItemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // Helper function to get cart quantity for a product
  const getCartQuantity = useCallback(
    (productId: number) => {
      const item = cartItems.find((item) => item.productId === productId);
      return item?.quantity || 0;
    },
    [cartItems]
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Product Cart (Optimized)</h1>

      {/* Search and Cart Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
        <div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">
              Items in cart: {cartItemCount}
            </p>
            <p className="text-lg font-bold">Total: ${cartTotal.toFixed(2)}</p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
    </div>
  );
};

export default UseCallbackExercise;
```

## Key Concepts

### What is useCallback?

`useCallback` is a React hook that returns a memoized version of a callback function. It only recreates the function when its dependencies change, preventing unnecessary re-renders of child components.

### Why Use useCallback?

- **Prevent re-renders**: Child components wrapped in `React.memo` won't re-render if callback props haven't changed
- **Stability**: Provides stable function references for dependency arrays
- **Performance**: Avoids recreating functions on every render

### useCallback Syntax

```typescript
const memoizedCallback = useCallback(() => {
  // Function body
  doSomething(a, b);
}, [a, b]); // Dependencies
```

### When to Use useCallback

✅ **Good Use Cases:**

- Passing callbacks to memoized child components (`React.memo`)
- Callbacks in dependency arrays of other hooks
- Expensive function creation
- Preventing unnecessary child re-renders

❌ **Avoid Using useCallback For:**

- Simple event handlers that aren't passed to memoized components
- Functions that change on every render anyway
- Premature optimization (measure first!)

### useCallback vs useMemo

```typescript
// useCallback - memoizes a function
const handleClick = useCallback(() => {
  doSomething();
}, [deps]);

// useMemo - memoizes a value
const result = useMemo(() => {
  return computeValue();
}, [deps]);
```

**Key difference**: `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`

### React.memo and useCallback

`React.memo` and `useCallback` work together:

```typescript
// Without useCallback - child re-renders on every parent render
const Child = memo(({ onClick }) => {
  // Re-renders even if onClick does the same thing
});

// With useCallback - child only re-renders when onClick actually changes
const handleClick = useCallback(() => {}, []);
<Child onClick={handleClick} />;
```

## Best Practices

1. **Use with React.memo**: `useCallback` is most useful when combined with `React.memo`
2. **Functional updates**: Use functional state updates to avoid dependencies
3. **Don't overuse**: Only use when actually preventing re-renders
4. **Include dependencies**: Always include all dependencies in the array
5. **Measure performance**: Use React DevTools to verify it helps

### Common Mistakes

❌ **Missing dependencies:**

```typescript
const handleClick = useCallback(() => {
  console.log(count); // Uses count but not in dependencies
}, []); // Missing count!
```

✅ **Correct:**

```typescript
const handleClick = useCallback(() => {
  console.log(count);
}, [count]); // Include count

// Or use functional update:
const handleClick = useCallback(() => {
  setCount((prev) => {
    console.log(prev);
    return prev + 1;
  });
}, []); // No dependency needed
```

❌ **Using useCallback without React.memo:**

```typescript
// Child component not memoized - useCallback doesn't help
const Child = ({ onClick }) => <button onClick={onClick}>Click</button>;
const handleClick = useCallback(() => {}, []); // Unnecessary
```

✅ **Correct:**

```typescript
// Memoize child component
const Child = memo(({ onClick }) => <button onClick={onClick}>Click</button>);
const handleClick = useCallback(() => {}, []); // Now it helps!
```

❌ **Creating new functions in dependency array:**

```typescript
const handleClick = useCallback(() => {
  doSomething();
}, [() => {}]); // New function every render = always recreates!
```

✅ **Correct:**

```typescript
const config = useMemo(() => ({ id: 1 }), []);
const handleClick = useCallback(() => {
  doSomething(config);
}, [config]); // Stable reference
```

❌ **Overusing useCallback:**

```typescript
// Simple handler that's not passed to memoized component
const handleClick = useCallback(() => {
  setCount(count + 1);
}, [count]); // Unnecessary if not passed to memoized child
```

✅ **Correct:**

```typescript
// Simple handler - no need for useCallback
const handleClick = () => {
  setCount((prev) => prev + 1);
};
```

## Functional State Updates

Using functional updates avoids needing dependencies:

```typescript
// ❌ Needs dependency
const handleIncrement = useCallback(() => {
  setCount(count + 1);
}, [count]); // count in dependencies

// ✅ No dependency needed
const handleIncrement = useCallback(() => {
  setCount((prev) => prev + 1);
}, []); // No dependencies!
```

## Challenge (Optional)

- Add a "Favorite Products" feature with memoized toggle handler
- Implement bulk actions (select multiple products, add all to cart)
- Add keyboard shortcuts with memoized handlers
- Create a "Recently Viewed" section with memoized handlers
- Implement product comparison with memoized comparison handlers
- Add undo/redo functionality with memoized action handlers
- Create a debounced search with memoized debounce function

## Solution Checklist

- [ ] Imported `useCallback` from React
- [ ] Memoized all event handlers with `useCallback`
- [ ] Used functional state updates to minimize dependencies
- [ ] Created memoized child component with `React.memo`
- [ ] Passed memoized callbacks to child components
- [ ] Included all necessary dependencies in dependency arrays
- [ ] Used `useMemo` for computed values (cart total, etc.)
- [ ] Verified that child components don't re-render unnecessarily
- [ ] All handlers are properly typed
- [ ] No unnecessary `useCallback` usage

## Common Mistakes to Avoid

- Forgetting to import `useCallback`
- Missing dependencies in the dependency array
- Using `useCallback` without `React.memo` on child components
- Creating new functions/objects in dependency arrays
- Overusing `useCallback` for simple handlers
- Not using functional state updates when possible
- Forgetting that `useCallback` returns a function, not a value
- Using `useCallback` for side effects (use `useEffect` instead)

## Additional Resources

- [React useCallback Documentation](https://react.dev/reference/react/useCallback)
- [React.memo Documentation](https://react.dev/reference/react/memo)
- [When to Use useCallback](https://react.dev/reference/react/useCallback#should-you-add-usecallback-everywhere)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
