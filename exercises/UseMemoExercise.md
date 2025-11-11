# Exercise: useMemo Hook

## Learning Objectives

- Understand what memoization is and why it's useful
- Learn to use the `useMemo` hook to optimize expensive calculations
- Understand when to use `useMemo` vs regular variables
- Learn to prevent unnecessary recalculations
- Practice optimizing component performance
- Understand dependency arrays in `useMemo`

## Overview

In this exercise, you'll create a product filtering and sorting component that uses `useMemo` to:

- Memoize expensive filtering operations
- Memoize sorted product lists
- Memoize computed statistics (total price, average price, etc.)
- Optimize performance by preventing unnecessary recalculations

## Task

Create a product management component that:

- Filters products by category and price range
- Sorts products by price, name, or category
- Calculates statistics (total value, average price, product count)
- Uses `useMemo` to optimize all expensive calculations
- Only recalculates when dependencies change

## Step-by-Step Instructions

### Step 1: Import useMemo

```typescript
import { useState, useMemo } from "react";
```

### Step 2: Create Filtered Products with useMemo

Memoize the filtered products list to avoid recalculating on every render:

```typescript
const filteredProducts = useMemo(() => {
  return products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });
}, [selectedCategory, minPrice, maxPrice]);
```

**Key Points:**

- `useMemo` takes a function that returns a value
- The second argument is a dependency array
- The value is only recalculated when dependencies change
- This prevents expensive operations from running on every render

### Step 3: Create Sorted Products with useMemo

Memoize the sorted products list, depending on the filtered products:

```typescript
const sortedProducts = useMemo(() => {
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
```

**Key Points:**

- `sortedProducts` depends on `filteredProducts`
- We create a copy with `[...filteredProducts]` to avoid mutating the original
- The sort only runs when `filteredProducts` or `sortBy` changes

### Step 4: Memoize Statistics

Calculate and memoize product statistics:

```typescript
const statistics = useMemo(() => {
  const total = filteredProducts.reduce(
    (sum, product) => sum + product.price,
    0
  );
  const average =
    filteredProducts.length > 0 ? total / filteredProducts.length : 0;
  const count = filteredProducts.length;

  return {
    total: total.toFixed(2),
    average: average.toFixed(2),
    count,
  };
}, [filteredProducts]);
```

**Key Points:**

- Statistics depend on `filteredProducts`
- We calculate multiple values and return an object
- The calculation only runs when `filteredProducts` changes

### Step 5: Memoize Category List

Extract and memoize unique categories:

```typescript
const categories = useMemo(() => {
  const uniqueCategories = new Set(products.map((product) => product.category));
  return ["all", ...Array.from(uniqueCategories)];
}, []);
```

**Key Points:**

- Empty dependency array means this only runs once
- Categories don't change, so we don't need to recalculate
- Using `Set` ensures uniqueness

### Step 6: Memoize Expensive Formatting

Memoize formatted price ranges:

```typescript
const priceRange = useMemo(() => {
  if (filteredProducts.length === 0) {
    return "No products";
  }
  const prices = filteredProducts.map((p) => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return `$${min.toFixed(2)} - $${max.toFixed(2)}`;
}, [filteredProducts]);
```

## Complete Solution Example

```typescript
import { useState, useMemo } from "react";
import { products } from "../data/products";
import type { Product } from "../types";

const UseMemoExercise = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState<
    "price-asc" | "price-desc" | "name" | "none"
  >("none");

  // Memoize unique categories (only calculate once)
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      products.map((product) => product.category)
    );
    return ["all", ...Array.from(uniqueCategories)];
  }, []);

  // Memoize filtered products (only recalculate when filters change)
  const filteredProducts = useMemo(() => {
    console.log("Filtering products..."); // For demonstration
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesPrice =
        product.price >= minPrice && product.price <= maxPrice;
      return matchesCategory && matchesPrice;
    });
  }, [selectedCategory, minPrice, maxPrice]);

  // Memoize sorted products (depends on filtered products)
  const sortedProducts = useMemo(() => {
    console.log("Sorting products..."); // For demonstration
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

  // Memoize statistics (depends on filtered products)
  const statistics = useMemo(() => {
    console.log("Calculating statistics..."); // For demonstration
    const total = filteredProducts.reduce(
      (sum, product) => sum + product.price,
      0
    );
    const average =
      filteredProducts.length > 0 ? total / filteredProducts.length : 0;
    const count = filteredProducts.length;

    return {
      total: total.toFixed(2),
      average: average.toFixed(2),
      count,
    };
  }, [filteredProducts]);

  // Memoize price range display
  const priceRange = useMemo(() => {
    if (filteredProducts.length === 0) {
      return "No products";
    }
    const prices = filteredProducts.map((p) => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return `$${min.toFixed(2)} - $${max.toFixed(2)}`;
  }, [filteredProducts]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Product Filter & Sort (Optimized)
      </h1>

      {/* Filters */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
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
            <label className="block text-sm font-medium mb-2">Min Price</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Max Price</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg"
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="none">None</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-4 gap-4">
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
          <p className="text-lg font-bold">{priceRange}</p>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <div key={product.id} className="p-4 border rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.category}</p>
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
    </div>
  );
};

export default UseMemoExercise;
```

## Key Concepts

### What is useMemo?

`useMemo` is a React hook that memoizes (caches) the result of an expensive calculation. It only recalculates when its dependencies change, preventing unnecessary work on every render.

### Why Use useMemo?

- **Performance**: Avoid recalculating expensive operations on every render
- **Optimization**: Only recompute when dependencies actually change
- **Stability**: Returns the same reference for the same dependencies (useful for `useEffect` dependencies)

### useMemo Syntax

```typescript
const memoizedValue = useMemo(() => {
  // Expensive calculation
  return computeExpensiveValue(a, b);
}, [a, b]); // Dependencies
```

### When to Use useMemo

✅ **Good Use Cases:**

- Expensive calculations (filtering large arrays, complex math)
- Derived data that depends on other state/props
- Creating objects/arrays that are used as dependencies in other hooks
- Preventing unnecessary recalculations in child components

❌ **Avoid Using useMemo For:**

- Simple calculations (overhead isn't worth it)
- Primitive values (numbers, strings, booleans)
- Values that change on every render anyway
- Premature optimization (measure first!)

### Dependency Array

The dependency array works the same as in `useEffect`:

```typescript
// Recalculates when 'value' changes
useMemo(() => compute(value), [value]);

// Only calculates once (on mount)
useMemo(() => compute(), []);

// Recalculates on every render (defeats the purpose!)
useMemo(() => compute(value));
```

### useMemo vs Regular Variables

```typescript
// Regular variable - recalculates on every render
const filtered = products.filter((p) => p.price > 100);

// useMemo - only recalculates when products or minPrice changes
const filtered = useMemo(
  () => products.filter((p) => p.price > minPrice),
  [products, minPrice]
);
```

## Best Practices

1. **Measure first**: Don't optimize prematurely - use React DevTools Profiler
2. **Memoize expensive operations**: Only use for calculations that are actually slow
3. **Include all dependencies**: Missing dependencies can cause bugs
4. **Don't overuse**: Simple calculations don't need memoization
5. **Use for object/array stability**: When passing to `useEffect` or `useCallback` dependencies

### Common Mistakes

❌ **Missing dependencies:**

```typescript
const filtered = useMemo(
  () => products.filter((p) => p.price > minPrice),
  [products] // Missing minPrice!
);
```

✅ **Correct:**

```typescript
const filtered = useMemo(
  () => products.filter((p) => p.price > minPrice),
  [products, minPrice] // All dependencies included
);
```

❌ **Memoizing simple calculations:**

```typescript
const doubled = useMemo(() => count * 2, [count]); // Unnecessary!
```

✅ **Correct:**

```typescript
const doubled = count * 2; // Simple enough, no memoization needed
```

❌ **Creating new objects in the dependency array:**

```typescript
const result = useMemo(
  () => compute(data),
  [{ id: 1 }] // New object every render = always recalculates!
);
```

✅ **Correct:**

```typescript
const config = { id: 1 };
const result = useMemo(() => compute(data), [config.id]); // Use primitive
```

❌ **Forgetting to return a value:**

```typescript
const filtered = useMemo(() => {
  products.filter((p) => p.price > 100); // Missing return!
}, [products]);
```

✅ **Correct:**

```typescript
const filtered = useMemo(() => {
  return products.filter((p) => p.price > 100);
}, [products]);
```

## Performance Considerations

### When Memoization Helps

- Large arrays (1000+ items)
- Complex calculations (nested loops, recursive functions)
- Frequent re-renders with same dependencies
- Expensive string operations or data transformations

### When Memoization Doesn't Help

- Small arrays (< 100 items)
- Simple calculations (addition, multiplication)
- Values that change on every render anyway
- The overhead of memoization is greater than the calculation

### Measuring Performance

Use React DevTools Profiler to measure:

1. Open React DevTools
2. Go to Profiler tab
3. Click "Record"
4. Interact with your component
5. Stop recording
6. Check render times and see if `useMemo` helps

## Challenge (Optional)

- Add a search input that filters products by name (memoize the search results)
- Create a "Featured Products" section that shows the top 3 most expensive products (memoized)
- Add pagination and memoize the current page's products
- Implement a price history chart (memoize the chart data)
- Add a "Compare Products" feature that memoizes comparison calculations
- Create a debounced search that only filters after the user stops typing

## Solution Checklist

- [ ] Imported `useMemo` from React
- [ ] Memoized filtered products with correct dependencies
- [ ] Memoized sorted products depending on filtered products
- [ ] Memoized statistics calculations
- [ ] Memoized category list (empty dependency array)
- [ ] Memoized price range display
- [ ] All dependencies are included in dependency arrays
- [ ] Verified that calculations only run when dependencies change (check console logs)
- [ ] No unnecessary memoization of simple calculations
- [ ] Properly typed all memoized values

## Common Mistakes to Avoid

- Forgetting to import `useMemo`
- Missing dependencies in the dependency array
- Memoizing simple calculations that don't need it
- Creating new objects/arrays in dependency arrays
- Forgetting to return a value from the memoized function
- Overusing `useMemo` (premature optimization)
- Not measuring performance before optimizing
- Using `useMemo` for side effects (use `useEffect` instead)

## Additional Resources

- [React useMemo Documentation](https://react.dev/reference/react/useMemo)
- [When to Use useMemo](https://react.dev/reference/react/useMemo#should-you-add-usememo-everywhere)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [React DevTools Profiler](https://react.dev/learn/react-developer-tools)
