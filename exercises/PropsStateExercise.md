# Exercise: Props & State

## Learning Objectives

- Understand the difference between props and state
- Learn to use the `useState` hook
- Update component state based on user interactions
- Understand when to use props vs state

## Overview

In this exercise, you'll create a `QuantitySelector` component that manages its own state to track product quantity. This demonstrates how components can maintain internal state that changes over time.

## Task

Create a `QuantitySelector` component that:

- Displays a product name (from props)
- Shows the current quantity (from state)
- Has buttons to increment and decrement quantity
- Prevents quantity from going below 1

## Step-by-Step Instructions

### Step 1: Create the Component File

1. Create a new file: `src/components/QuantitySelector.tsx`
2. Import React and `useState` hook

### Step 2: Define Props Type

```typescript
type QuantitySelectorProps = {
  productName: string;
};
```

### Step 3: Create the Component with State

```typescript
import { useState } from "react";

const QuantitySelector = ({ productName }: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-bold mb-4">{productName}</h3>
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          }}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          -
        </button>
        <span className="text-lg font-semibold">Quantity: {quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
```

### Step 4: Use the Component

Import and use it in `PropsStateExercise.tsx`:

```typescript
<QuantitySelector productName="Smart Watch" />
```

## Key Concepts

### Props vs State

- **Props**: Data passed from parent to child (read-only)
- **State**: Data that belongs to the component and can change over time

### useState Hook

- `useState` is a React hook that lets you add state to functional components
- Returns an array: `[currentValue, setterFunction]`
- The setter function updates the state and triggers a re-render
- Always use the setter function to update state (never mutate state directly)

### Event Handlers

- Functions that handle user interactions (clicks, input changes, etc.)
- In React, use `onClick`, `onChange`, etc. (camelCase)
- Can be inline arrow functions or separate named functions

## Best Practices

1. **Extract handlers**: For complex logic, extract event handlers:

```typescript
const handleDecrement = () => {
  if (quantity > 1) {
    setQuantity(quantity - 1);
  }
};
```

2. **Functional updates**: For state that depends on previous state:

```typescript
setQuantity((prevQuantity) => prevQuantity + 1);
```

3. **Validation**: Always validate state updates (e.g., prevent negative quantities)

## Challenge (Optional)

- Add a maximum quantity limit (e.g., 10)
- Display a message when quantity reaches the limit
- Add a "Reset" button that sets quantity back to 1
- Calculate and display total price (quantity × price)

## Solution Checklist

- [ ] Created `QuantitySelector.tsx` file
- [ ] Imported `useState` hook
- [ ] Defined props type with `productName`
- [ ] Initialized state with `useState(1)`
- [ ] Created increment button
- [ ] Created decrement button
- [ ] Prevented quantity from going below 1
- [ ] Displayed current quantity
- [ ] Used Tailwind CSS for styling
- [ ] Imported and used component in PropsStateExercise

## Common Mistakes to Avoid

- Mutating state directly: `quantity++` ❌ (use `setQuantity(quantity + 1)` ✅)
- Forgetting to import `useState`
- Not preventing invalid state values (negative quantities)
- Using `this.state` in functional components (that's for class components)
