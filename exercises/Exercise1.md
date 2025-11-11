# Exercise 1: Components & JSX

## Learning Objectives

- Understand what React components are
- Learn JSX syntax
- Create reusable components
- Pass data to components using props

## Overview

In this exercise, you'll create a `ProductCard` component that displays product information in a card format. This is a fundamental building block for any e-commerce application.

## Task

Create a reusable `ProductCard` component that accepts product information as props and displays it in a styled card.

## Step-by-Step Instructions

### Step 1: Create the Component File

1. Create a new file: `src/components/ProductCard.tsx`
2. Import React at the top of the file

### Step 2: Define the Component Props

Create a TypeScript type for the component props:

```typescript
type ProductCardProps = {
  name: string;
  price: number;
  description: string;
};
```

### Step 3: Create the Component

Write a functional component that receives props and returns JSX:

```typescript
const ProductCard = ({ name, price, description }: ProductCardProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-blue-600 font-bold text-lg mb-2">
        ${price.toFixed(2)}
      </p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ProductCard;
```

### Step 4: Use the Component

1. Import the component in `Exercise1.tsx`
2. Use it to display a sample product:

```typescript
<ProductCard
  name="Wireless Headphones"
  price={99.99}
  description="Premium wireless headphones with noise cancellation"
/>
```

## Key Concepts

### JSX

- JSX allows you to write HTML-like syntax in JavaScript
- It must return a single parent element (or use React Fragment `<>`)
- Use `className` instead of `class` (since `class` is a reserved word in JavaScript)

### Components

- Components are reusable pieces of UI
- They can accept props (properties) to customize their behavior
- Props are read-only - components should not modify their props

### Props

- Props are passed to components like HTML attributes
- They allow components to be dynamic and reusable
- Use TypeScript to define prop types for better code safety

## Challenge (Optional)

- Add an optional `image` prop and display it if provided
- Add a `category` prop and display it as a badge
- Style the card with hover effects

## Solution Checklist

- [ ] Created `ProductCard.tsx` file
- [ ] Defined TypeScript types for props
- [ ] Component accepts name, price, and description props
- [ ] Component displays all product information
- [ ] Used Tailwind CSS for styling
- [ ] Imported and used the component in Exercise1
- [ ] Component is properly exported

## Common Mistakes to Avoid

- Forgetting to export the component
- Not defining prop types
- Using `class` instead of `className`
- Not returning JSX from the component
- Missing the key prop when rendering lists (we'll cover this in Exercise 4)
