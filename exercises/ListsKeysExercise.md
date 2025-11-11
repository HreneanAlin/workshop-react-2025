# Exercise: Lists & Keys

## Learning Objectives

- Render lists of items using `map()`
- Understand the importance of keys
- Work with arrays of data
- Create dynamic UI from data

## Overview

In this exercise, you'll display a product catalog by rendering a list of products. You'll learn how to use the `map()` method to transform data into JSX elements and why keys are essential for React's reconciliation process.

## Task

Display all products from the `products` array:

- Import the products array
- Use `map()` to render each product
- Use product `id` as the key
- Display name, price, description, and category
- Style each product in a card format

## Step-by-Step Instructions

### Step 1: Import the Products Array

```typescript
import { products } from "../data/products";
```

### Step 2: Render the Product List

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {products.map((product) => (
    <div key={product.id} className="border rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
      <p className="text-blue-600 font-bold text-lg mb-2">
        ${product.price.toFixed(2)}
      </p>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
        {product.category}
      </span>
    </div>
  ))}
</div>
```

### Step 3: Optional - Group by Category

```typescript
const productsByCategory = products.reduce((acc, product) => {
  if (!acc[product.category]) {
    acc[product.category] = [];
  }
  acc[product.category].push(product);
  return acc;
}, {} as Record<string, typeof products>);

return (
  <div>
    {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
      <div key={category} className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{category}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              {/* Product card content */}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
```

## Key Concepts

### The `map()` Method

- Transforms each item in an array into a new value
- Returns a new array (doesn't mutate the original)
- Perfect for rendering lists in React
- Each item becomes a JSX element

### Keys

- **Required** when rendering lists in React
- Help React identify which items have changed
- Should be unique among siblings
- Use stable, unique identifiers (like `id`)
- Never use array index as key (unless list never reorders)

### Why Keys Matter

Without keys, React can't efficiently update the DOM when items are added, removed, or reordered. Keys help React:

- Identify which items changed
- Reuse DOM nodes efficiently
- Maintain component state correctly

### Common Key Patterns

```typescript
// ✅ Good: Use unique ID
{
  items.map((item) => <div key={item.id}>...</div>);
}

// ✅ Good: Use unique property
{
  items.map((item) => <div key={item.email}>...</div>);
}

// ⚠️ Acceptable: Index (only if list never reorders)
{
  items.map((item, index) => <div key={index}>...</div>);
}

// ❌ Bad: Random values
{
  items.map((item) => <div key={Math.random()}>...</div>);
}
```

## Best Practices

1. **Always use keys** when rendering lists
2. **Use stable identifiers** (id, email, etc.)
3. **Avoid index as key** unless list is static
4. **Keep keys unique** among siblings
5. **Extract list items** into separate components for complex items

## Challenge (Optional)

- Group products by category
- Add filtering by category
- Add search functionality
- Sort products by price
- Add pagination (show 6 products per page)

## Solution Checklist

- [ ] Imported products array
- [ ] Used `map()` to render products
- [ ] Used `product.id` as key prop
- [ ] Displayed product name
- [ ] Displayed product price (formatted)
- [ ] Displayed product description
- [ ] Displayed product category
- [ ] Styled with Tailwind CSS
- [ ] Used responsive grid layout

## Common Mistakes to Avoid

- Forgetting the `key` prop
- Using array index as key when items can reorder
- Using `map()` without returning JSX
- Mutating the original array
- Not handling empty arrays

## Advanced: Extracting List Items

For complex list items, extract them into components:

```typescript
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="border rounded-lg p-4">
      <h3>{product.name}</h3>
      {/* ... */}
    </div>
  );
};

// Then use it:
{
  products.map((product) => <ProductCard key={product.id} product={product} />);
}
```
