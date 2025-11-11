# Exercise: useRef Hook

## Learning Objectives

- Understand what refs are and when to use them
- Learn to use the `useRef` hook to access DOM elements
- Learn to use `useRef` to persist values across renders without causing re-renders
- Practice focusing input fields programmatically
- Understand the difference between refs and state
- Learn to measure DOM elements using refs

## Overview

In this exercise, you'll create a product search and filter component that uses `useRef` to:

- Focus the search input when a button is clicked
- Track the previous search term without causing re-renders
- Measure and display the dimensions of a product card
- Scroll to a specific product when selected

## Task

Create a product search component that:

- Has a search input that can be focused programmatically
- Displays a "Focus Search" button that focuses the input
- Shows the previous search term when the current search changes
- Displays the dimensions of the product list container
- Scrolls to a selected product in the list

## Step-by-Step Instructions

### Step 1: Import useRef

```typescript
import { useState, useRef } from "react";
```

### Step 2: Create a Ref for the Input Element

Create a ref to reference the search input element:

```typescript
const searchInputRef = useRef<HTMLInputElement>(null);
```

**Key Points:**

- `useRef` returns a mutable object with a `current` property
- The initial value is `null` (or any value you provide)
- The ref object persists across renders without causing re-renders

### Step 3: Attach the Ref to the Input

Attach the ref to the input element using the `ref` attribute:

```typescript
<input
  ref={searchInputRef}
  type="text"
  placeholder="Search products..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

**Key Points:**

- The `ref` attribute is a special React attribute
- When attached to a DOM element, `ref.current` points to that element
- You can access DOM methods like `focus()`, `scrollIntoView()`, etc.

### Step 4: Focus the Input Programmatically

Create a handler that focuses the input when a button is clicked:

```typescript
const handleFocusSearch = () => {
  searchInputRef.current?.focus();
};
```

**Key Points:**

- Use optional chaining (`?.`) to safely access `current`
- `focus()` is a native DOM method that focuses the input
- This doesn't cause a re-render, unlike state updates

### Step 5: Track Previous Value with useRef

Use `useRef` to track the previous search term without causing re-renders:

```typescript
const prevSearchTermRef = useRef<string>("");

useEffect(() => {
  prevSearchTermRef.current = searchTerm;
}, [searchTerm]);
```

**Key Points:**

- Refs can store any value, not just DOM elements
- Updating `ref.current` doesn't trigger a re-render
- This is useful for tracking previous values or storing mutable values

### Step 6: Create a Ref for Measuring Elements

Create a ref to measure the dimensions of the product list:

```typescript
const productListRef = useRef<HTMLDivElement>(null);
```

### Step 7: Measure Element Dimensions

Create a function to get and display the dimensions:

```typescript
const handleMeasureList = () => {
  if (productListRef.current) {
    const { width, height } = productListRef.current.getBoundingClientRect();
    setDimensions({ width, height });
  }
};
```

**Key Points:**

- `getBoundingClientRect()` returns the element's size and position
- This is useful for animations, layouts, and responsive design

### Step 8: Scroll to Element

Create a ref for each product item and scroll to it when selected:

```typescript
const productRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

const handleProductSelect = (productId: number) => {
  const productElement = productRefs.current[productId];
  productElement?.scrollIntoView({ behavior: "smooth", block: "center" });
};
```

**Key Points:**

- You can use an object to store multiple refs
- `scrollIntoView()` smoothly scrolls the element into view
- This is useful for navigation and highlighting

## Complete Solution Example

```typescript
import { useState, useRef, useEffect } from "react";
import { products } from "../data/products";
import type { Product } from "../types";

const UseRefExercise = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  // Ref for the search input
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Ref for tracking previous search term
  const prevSearchTermRef = useRef<string>("");

  // Ref for the product list container
  const productListRef = useRef<HTMLDivElement>(null);

  // Refs for individual product items
  const productRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Track previous search term
  useEffect(() => {
    prevSearchTermRef.current = searchTerm;
  }, [searchTerm]);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Focus the search input
  const handleFocusSearch = () => {
    searchInputRef.current?.focus();
  };

  // Measure the product list dimensions
  const handleMeasureList = () => {
    if (productListRef.current) {
      const { width, height } = productListRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  };

  // Scroll to selected product
  const handleProductSelect = (productId: number) => {
    setSelectedProductId(productId);
    const productElement = productRefs.current[productId];
    productElement?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Product Search with Refs</h1>

      {/* Search Section */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-2">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleFocusSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Focus Search
          </button>
        </div>

        {prevSearchTermRef.current &&
          prevSearchTermRef.current !== searchTerm && (
            <p className="text-sm text-gray-600">
              Previous search: "{prevSearchTermRef.current}"
            </p>
          )}
      </div>

      {/* Dimensions Section */}
      <div className="mb-6">
        <button
          onClick={handleMeasureList}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mb-2"
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
        ref={productListRef}
        className="space-y-4 max-h-96 overflow-y-auto border rounded-lg p-4"
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            ref={(el) => {
              productRefs.current[product.id] = el;
            }}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedProductId === product.id
                ? "bg-blue-100 border-blue-500"
                : "hover:bg-gray-50"
            }`}
            onClick={() => handleProductSelect(product.id)}
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
  );
};

export default UseRefExercise;
```

## Key Concepts

### What is useRef?

`useRef` is a React hook that returns a mutable ref object. The ref object has a `current` property that can hold any value and persists across renders without causing re-renders.

### Two Main Use Cases

1. **Accessing DOM Elements**: Store a reference to a DOM element to access its properties and methods
2. **Storing Mutable Values**: Store values that persist across renders but don't need to trigger re-renders

### Refs vs State

| Feature                                | useRef | useState           |
| -------------------------------------- | ------ | ------------------ |
| Triggers re-render                     | ❌ No  | ✅ Yes             |
| Mutable                                | ✅ Yes | ❌ No (use setter) |
| Persists across renders                | ✅ Yes | ✅ Yes             |
| Use for DOM access                     | ✅ Yes | ❌ No              |
| Use for values that trigger UI updates | ❌ No  | ✅ Yes             |

### Accessing DOM Elements

```typescript
const inputRef = useRef<HTMLInputElement>(null);

// Attach to element
<input ref={inputRef} />;

// Access the element
inputRef.current?.focus();
inputRef.current?.value;
inputRef.current?.scrollIntoView();
```

### Storing Mutable Values

```typescript
const renderCountRef = useRef(0);

// Update without re-render
renderCountRef.current += 1;

// Access the value
console.log(renderCountRef.current);
```

### Multiple Refs

You can store multiple refs in an object or Map:

```typescript
const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});

<div ref={(el) => { refs.current['item1'] = el; }} />
<div ref={(el) => { refs.current['item2'] = el; }} />
```

## Best Practices

1. **Use refs for DOM access**: When you need to focus, scroll, or measure DOM elements
2. **Use refs for mutable values**: When you need to store values that don't trigger re-renders
3. **Always use optional chaining**: `ref.current?.method()` to avoid errors if ref is null
4. **Type your refs**: Use TypeScript to specify the element type: `useRef<HTMLInputElement>(null)`
5. **Don't overuse refs**: Most of the time, state is what you need

### Common Mistakes

❌ **Accessing ref before it's attached:**

```typescript
const inputRef = useRef<HTMLInputElement>(null);
inputRef.current.focus(); // Error: current is null
```

✅ **Correct:**

```typescript
const inputRef = useRef<HTMLInputElement>(null);
inputRef.current?.focus(); // Safe with optional chaining
```

❌ **Using refs for values that should trigger re-renders:**

```typescript
const countRef = useRef(0);
countRef.current += 1; // UI won't update!
```

✅ **Correct:**

```typescript
const [count, setCount] = useState(0);
setCount(count + 1); // UI updates
```

❌ **Creating refs inside conditionals or loops:**

```typescript
if (condition) {
  const ref = useRef(null); // Wrong! Hooks must be at top level
}
```

✅ **Correct:**

```typescript
const ref = useRef(null); // Always at top level
if (condition) {
  // Use ref here
}
```

## When to Use useRef

### ✅ Good Use Cases

- Focusing input fields
- Scrolling to elements
- Measuring element dimensions
- Integrating with third-party DOM libraries
- Storing previous values for comparison
- Storing timer IDs or interval references
- Storing mutable values that don't need to trigger renders

### ❌ Avoid Using useRef For

- Values that should trigger re-renders (use `useState`)
- Derived values (use regular variables or `useMemo`)
- Managing component state (use `useState` or `useReducer`)

## Challenge (Optional)

- Add a "Clear Search" button that clears the input and focuses it
- Implement a "Scroll to Top" button that scrolls the product list to the top
- Add keyboard navigation (arrow keys to navigate products, Enter to select)
- Create a ref that tracks how many times the search input was focused
- Add a feature that highlights the search term in product names
- Implement auto-focus on the search input when the component mounts

## Solution Checklist

- [ ] Imported `useRef` from React
- [ ] Created a ref for the search input element
- [ ] Attached the ref to the input using the `ref` attribute
- [ ] Created a handler that focuses the input programmatically
- [ ] Created a ref to track the previous search term
- [ ] Created a ref for the product list container
- [ ] Implemented dimension measurement functionality
- [ ] Created refs for individual product items
- [ ] Implemented scroll-to-product functionality
- [ ] Used optional chaining when accessing ref.current
- [ ] Properly typed all refs with TypeScript
- [ ] Verified that ref updates don't cause re-renders

## Common Mistakes to Avoid

- Forgetting to import `useRef`
- Not using optional chaining when accessing `ref.current`
- Trying to access ref before it's attached to an element
- Using refs for values that should trigger re-renders
- Creating refs inside conditionals or loops (violates Rules of Hooks)
- Not typing refs properly in TypeScript
- Forgetting that refs are mutable and don't trigger re-renders
- Using `ref.current` in the dependency array of `useEffect` (it won't trigger updates)

## Additional Resources

- [React useRef Documentation](https://react.dev/reference/react/useRef)
- [Refs and the DOM](https://react.dev/learn/manipulating-the-dom-with-refs)
- [When to Use Refs](https://react.dev/learn/referencing-values-with-refs)
- [React Hooks Rules](https://react.dev/reference/rules/rules-of-hooks)
