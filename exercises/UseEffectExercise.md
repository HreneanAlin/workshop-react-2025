# Exercise: useEffect Hook

## Learning Objectives

- Understand what side effects are in React
- Learn to use the `useEffect` hook
- Understand dependency arrays and when effects run
- Learn to clean up effects (timers, subscriptions, etc.)
- Practice using localStorage with useEffect
- Understand the component lifecycle in functional components

## Overview

In this exercise, you'll create a product viewer component that uses `useEffect` to:

- Track how long a user has been viewing a product (timer)
- Update the browser's document title
- Save and load view count from localStorage
- Clean up timers when components unmount or dependencies change

## Task

Create a product viewer that:

- Displays a timer showing how long the current product has been viewed
- Updates the browser tab title with the viewing time
- Tracks total view count and persists it to localStorage
- Increments view count when a product is selected
- Properly cleans up the timer when the component unmounts or product changes

## Step-by-Step Instructions

### Step 1: Import useEffect

```typescript
import { useState, useEffect } from "react";
```

### Step 2: Create a Timer Effect

Use `useEffect` to create a timer that increments `viewTime` every second:

```typescript
useEffect(() => {
  const interval = setInterval(() => {
    setViewTime((prev) => prev + 1);
  }, 1000);

  // Cleanup function - clears the interval
  return () => clearInterval(interval);
}, []); // Empty array = runs once on mount
```

**Key Points:**

- `setInterval` creates a timer that runs every 1000ms (1 second)
- The cleanup function (`return () => clearInterval(interval)`) prevents memory leaks
- Empty dependency array `[]` means this effect runs once when the component mounts

### Step 3: Reset Timer When Product Changes

Update the timer effect to reset when the selected product changes:

```typescript
useEffect(() => {
  // Reset timer when product changes
  setViewTime(0);

  const interval = setInterval(() => {
    setViewTime((prev) => prev + 1);
  }, 1000);

  return () => clearInterval(interval);
}, [selectedProduct]); // Run when selectedProduct changes
```

**Key Points:**

- Adding `selectedProduct` to the dependency array means the effect re-runs when the product changes
- The cleanup function runs before the new effect, clearing the old timer
- Setting `viewTime` to 0 resets the timer for the new product

### Step 4: Update Document Title

Create an effect that updates the browser tab title:

```typescript
useEffect(() => {
  document.title = `Viewing for ${viewTime}s - ${selectedProduct.name}`;
}, [viewTime, selectedProduct.name]);
```

**Key Points:**

- This effect runs whenever `viewTime` or `selectedProduct.name` changes
- `document.title` is a side effect (modifying something outside React)

### Step 5: Load View Count from localStorage

Load the saved view count when the component first mounts:

```typescript
useEffect(() => {
  const saved = localStorage.getItem("viewCount");
  if (saved) {
    setViewCount(parseInt(saved, 10));
  }
}, []); // Run once on mount
```

**Key Points:**

- `localStorage.getItem` returns a string or `null`
- We need to parse it as an integer
- Empty dependency array means this only runs once when the component mounts

### Step 6: Save View Count to localStorage

Save the view count whenever it changes:

```typescript
useEffect(() => {
  localStorage.setItem("viewCount", viewCount.toString());
}, [viewCount]); // Run when viewCount changes
```

**Key Points:**

- `localStorage.setItem` requires a string, so we convert the number
- This effect runs whenever `viewCount` changes

### Step 7: Increment View Count on Product Selection

Update the product selection handler to increment view count:

```typescript
const handleProductSelect = (product: Product) => {
  setSelectedProduct(product);
  setViewCount((prev) => prev + 1);
};
```

Or update the existing button's onClick:

```typescript
onClick={() => {
  setSelectedProduct(product);
  setViewCount((prev) => prev + 1);
}}
```

## Complete Solution Example

```typescript
import { useState, useEffect } from "react";
import { products } from "../data/products";

const UseEffectExercise = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [viewTime, setViewTime] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  // Timer effect - resets when product changes
  useEffect(() => {
    setViewTime(0);

    const interval = setInterval(() => {
      setViewTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedProduct]);

  // Update document title
  useEffect(() => {
    document.title = `Viewing for ${viewTime}s - ${selectedProduct.name}`;
  }, [viewTime, selectedProduct.name]);

  // Load view count from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('viewCount');
    if (saved) {
      setViewCount(parseInt(saved, 10));
    }
  }, []);

  // Save view count to localStorage
  useEffect(() => {
    localStorage.setItem('viewCount', viewCount.toString());
  }, [viewCount]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setViewCount((prev) => prev + 1);
  };

  return (
    // ... JSX ...
  );
};
```

## Key Concepts

### What is useEffect?

`useEffect` is a React hook that lets you perform side effects in functional components. Side effects are operations that affect something outside the component's render cycle.

### Common Side Effects

- **API calls** - Fetching data from a server
- **Timers** - `setInterval`, `setTimeout`
- **DOM manipulation** - Updating `document.title`, focusing elements
- **Subscriptions** - WebSocket connections, event listeners
- **localStorage/sessionStorage** - Saving and loading data
- **Analytics** - Tracking user behavior

### Dependency Array

The dependency array controls when the effect runs:

```typescript
// Runs once on mount
useEffect(() => {
  // ...
}, []);

// Runs when 'value' changes
useEffect(() => {
  // ...
}, [value]);

// Runs on every render (usually avoid!)
useEffect(() => {
  // ...
});
```

### Cleanup Function

Effects can return a cleanup function that runs:

- Before the effect runs again (if dependencies changed)
- When the component unmounts

```typescript
useEffect(() => {
  const timer = setInterval(() => {
    // ...
  }, 1000);

  // Cleanup function
  return () => {
    clearInterval(timer);
  };
}, []);
```

**Why cleanup is important:**

- Prevents memory leaks
- Cancels ongoing operations
- Removes event listeners
- Clears timers

### Component Lifecycle with useEffect

In functional components, `useEffect` replaces lifecycle methods:

- **componentDidMount**: `useEffect(() => {}, [])`
- **componentDidUpdate**: `useEffect(() => {}, [dependencies])`
- **componentWillUnmount**: `useEffect(() => { return () => {} }, [])`

## Best Practices

1. **Always include dependencies**: If you use a value in the effect, include it in the dependency array
2. **Clean up resources**: Always clean up timers, subscriptions, and event listeners
3. **Separate concerns**: Use multiple `useEffect` hooks for different side effects
4. **Avoid infinite loops**: Be careful with dependency arrays - don't create objects/arrays in the effect that are in dependencies

### Common Mistakes

❌ **Missing dependencies:**

```typescript
useEffect(() => {
  console.log(count); // Uses 'count' but not in dependencies
}, []); // Missing 'count' in array
```

✅ **Correct:**

```typescript
useEffect(() => {
  console.log(count);
}, [count]); // Include all dependencies
```

❌ **Forgetting cleanup:**

```typescript
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  // No cleanup - memory leak!
}, []);
```

✅ **Correct:**

```typescript
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer); // Cleanup
}, []);
```

❌ **Creating objects in dependency array:**

```typescript
useEffect(() => {
  // ...
}, [{ id: 1 }]); // New object every render = infinite loop
```

✅ **Correct:**

```typescript
const productId = 1;
useEffect(() => {
  // ...
}, [productId]); // Use primitive values
```

## Challenge (Optional)

- Add a "Reset Timer" button that resets `viewTime` to 0
- Show a notification when view count reaches milestones (10, 50, 100)
- Add a feature to track view time per product (not just total)
- Implement a "pause timer" functionality
- Add keyboard shortcuts to navigate between products

## Solution Checklist

- [ ] Imported `useEffect` from React
- [ ] Created timer effect with `setInterval`
- [ ] Added cleanup function to clear interval
- [ ] Reset timer when product changes (added `selectedProduct` to dependencies)
- [ ] Updated document title with viewing time
- [ ] Loaded view count from localStorage on mount
- [ ] Saved view count to localStorage when it changes
- [ ] Incremented view count when product is selected
- [ ] Displayed `viewTime` in the UI
- [ ] Displayed `viewCount` in the UI
- [ ] Verified timer stops when component unmounts
- [ ] Verified document title updates correctly

## Common Mistakes to Avoid

- Forgetting to import `useEffect`
- Not including dependencies in the dependency array
- Forgetting to clean up timers/intervals (memory leaks!)
- Creating infinite loops with incorrect dependencies
- Not handling `null` values from `localStorage.getItem`
- Forgetting to convert numbers to strings for `localStorage.setItem`
- Using `viewTime++` instead of `setViewTime((prev) => prev + 1)`

## Additional Resources

- [React useEffect Documentation](https://react.dev/reference/react/useEffect)
- [React Hooks Rules](https://react.dev/reference/rules/rules-of-hooks)
- [useEffect Complete Guide](https://overreacted.io/a-complete-guide-to-useeffect/)
