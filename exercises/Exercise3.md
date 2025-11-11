# Exercise 3: Event Handling

## Learning Objectives

- Handle user interactions with event handlers
- Update state based on user actions
- Work with complex state (arrays of objects)
- Implement cart functionality

## Overview

In this exercise, you'll build a shopping cart feature. Users can add products to the cart, view cart items, see the total price, and clear the cart. This demonstrates how to handle events and manage complex state.

## Task

Implement "Add to Cart" functionality:

- Add products to a cart state
- If product already exists, increase quantity
- Display all cart items with quantities
- Calculate and display total price
- Add a "Clear Cart" button

## Step-by-Step Instructions

### Step 1: Understand the Data Structure

The cart state is an array of `CartItem` objects:

```typescript
type CartItem = {
  product: Product;
  quantity: number;
};
```

### Step 2: Create the Add to Cart Handler

```typescript
const handleAddToCart = (product: Product) => {
  setCart((prevCart) => {
    // Check if product already exists in cart
    const existingItem = prevCart.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      // Increase quantity if product exists
      return prevCart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    // Add new product to cart
    return [...prevCart, { product, quantity: 1 }];
  });
};
```

### Step 3: Calculate Total Price

```typescript
const totalPrice = cart.reduce(
  (sum, item) => sum + item.product.price * item.quantity,
  0
);
```

### Step 4: Create Clear Cart Handler

```typescript
const handleClearCart = () => {
  setCart([]);
};
```

### Step 5: Render Cart Items

```typescript
{
  cart.length === 0 ? (
    <p className="text-gray-400">Your cart is empty</p>
  ) : (
    <div>
      {cart.map((item) => (
        <div key={item.product.id} className="border-b py-2">
          <p className="font-medium">{item.product.name}</p>
          <p className="text-sm text-gray-600">
            ${item.product.price} × {item.quantity} = $
            {(item.product.price * item.quantity).toFixed(2)}
          </p>
        </div>
      ))}
      <div className="mt-4 pt-4 border-t">
        <p className="font-bold text-lg">Total: ${totalPrice.toFixed(2)}</p>
      </div>
      <button
        onClick={handleClearCart}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Clear Cart
      </button>
    </div>
  );
}
```

## Key Concepts

### Event Handlers

- Functions that respond to user interactions
- Passed as props to JSX elements: `onClick={handleClick}`
- Can be inline or extracted functions
- Receive the event object (optional)

### Updating Arrays in State

- Never mutate arrays directly: `cart.push(item)` ❌
- Always create new arrays: `[...cart, newItem]` ✅
- Use `map()` to update items in arrays
- Use `filter()` to remove items from arrays

### Functional State Updates

When new state depends on previous state, use the functional form:

```typescript
setCart((prevCart) => {
  // Use prevCart here
  return newCart;
});
```

### Array Methods

- `find()`: Find an item in an array
- `map()`: Transform each item in an array
- `filter()`: Create a new array with filtered items
- `reduce()`: Accumulate values (great for totals)

## Best Practices

1. **Use functional updates** when state depends on previous state
2. **Extract complex logic** into separate functions
3. **Always create new objects/arrays** when updating state
4. **Use meaningful variable names** (`existingItem`, `totalPrice`)
5. **Handle edge cases** (empty cart, duplicate items)

## Challenge (Optional)

- Add a "Remove Item" button for each cart item
- Add quantity controls (+/-) directly in the cart
- Show cart item count in a badge
- Add a "Checkout" button that shows a success message
- Persist cart to localStorage

## Solution Checklist

- [ ] Created `handleAddToCart` function
- [ ] Function checks if product exists in cart
- [ ] Function increments quantity if product exists
- [ ] Function adds new product if it doesn't exist
- [ ] Created `handleClearCart` function
- [ ] Calculated total price using `reduce`
- [ ] Rendered cart items with proper keys
- [ ] Displayed total price
- [ ] Added "Clear Cart" button
- [ ] Handled empty cart state

## Common Mistakes to Avoid

- Mutating state directly: `cart.push(item)` ❌
- Not using functional updates when needed
- Forgetting to use keys when rendering lists
- Not handling empty states
- Mutating objects in arrays: `item.quantity++` ❌
