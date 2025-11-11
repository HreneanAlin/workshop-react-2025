# Exercise 6: React Router - Navigation & Routing

## Learning Objectives

- Set up React Router in your application
- Create and configure routes
- Use `Link` and `NavLink` components for navigation
- Implement programmatic navigation with `useNavigate`
- Work with dynamic routes using `useParams`
- Create nested routes and layouts
- Handle route parameters and query strings

## Overview

In this exercise, you'll transform the e-commerce application into a multi-page experience using React Router. You'll learn how to set up routing, navigate between pages, and create dynamic routes for product details.

## Prerequisites

- React Router v7+ installed (`react-router` package)
- Understanding of React components and hooks
- Basic knowledge of URL structure

## Task

Create a multi-page e-commerce application with:

1. **Home Page** - Display all products with links to product details
2. **Product Detail Page** - Show individual product information using dynamic routes
3. **Navigation** - Add a navigation bar with links to different pages
4. **404 Page** - Handle unknown routes gracefully

## Step-by-Step Instructions

### Step 1: Set Up the Router

First, update `main.tsx` to use React Router's `RouterProvider`:

```typescript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
```

### Step 2: Create Route Components

Create separate components for different pages:

```typescript
// HomePage.tsx
const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Our Store</h1>
      {/* Product list */}
    </div>
  );
};

// ProductDetailPage.tsx
const ProductDetailPage = () => {
  return (
    <div>
      <h1>Product Details</h1>
      {/* Product details */}
    </div>
  );
};
```

### Step 3: Configure Routes

Update your router configuration:

```typescript
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "product/:id",
        element: <ProductDetailPage />,
      },
    ],
  },
]);
```

### Step 4: Add Navigation Links

Use `Link` component for navigation:

```typescript
import { Link } from "react-router";

const Navigation = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
};
```

### Step 5: Use Outlet for Nested Routes

In your `App.tsx`, use `Outlet` to render child routes:

```typescript
import { Outlet, Link } from "react-router";

const App = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};
```

### Step 6: Access Route Parameters

Use `useParams` to get dynamic route parameters:

```typescript
import { useParams } from "react-router";

const ProductDetailPage = () => {
  const { id } = useParams();

  // Find product by id
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
};
```

### Step 7: Programmatic Navigation

Use `useNavigate` for programmatic navigation:

```typescript
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={handleViewDetails}>View Details</button>
    </div>
  );
};
```

## Key Concepts

### Router Setup

React Router v7 uses `createBrowserRouter` for data-first routing:

- **createBrowserRouter**: Creates a router using browser history API
- **RouterProvider**: Renders the router and manages navigation
- **Routes**: Array of route objects defining paths and components

### Route Configuration

```typescript
{
  path: "/product/:id",  // Dynamic route with parameter
  element: <ProductDetail />,
}
```

- **path**: URL pattern (use `:param` for dynamic segments)
- **element**: Component to render
- **index**: true for default child route
- **children**: Nested routes

### Navigation Components

#### Link Component

```typescript
<Link to="/products">Products</Link>
```

- Declarative navigation
- Prevents full page reload
- Accessible by default
- Active state styling with `NavLink`

#### NavLink Component

```typescript
<NavLink
  to="/products"
  className={({ isActive }) => (isActive ? "active" : "")}
>
  Products
</NavLink>
```

- Same as `Link` but with active state
- Useful for navigation menus
- `isActive` prop for styling

### Hooks

#### useNavigate

```typescript
const navigate = useNavigate();
navigate("/products");
navigate("/products", { replace: true }); // Replace history
navigate(-1); // Go back
```

#### useParams

```typescript
const { id } = useParams();
```

- Returns object of URL parameters
- Type-safe with TypeScript

#### useLocation

```typescript
const location = useLocation();
// location.pathname, location.search, location.hash
```

#### useSearchParams

```typescript
const [searchParams, setSearchParams] = useSearchParams();
const category = searchParams.get("category");
setSearchParams({ category: "electronics" });
```

### Outlet Component

Renders child routes in nested routing:

```typescript
<Outlet />
```

### Error Handling

Create an error boundary:

```typescript
{
  path: "*",
  element: <NotFoundPage />,
}
```

## Best Practices

1. **Use Link instead of anchor tags** - Prevents full page reloads
2. **Extract navigation into a component** - Reusable navigation bar
3. **Use TypeScript for route params** - Type safety for dynamic routes
4. **Handle loading states** - Show loading indicators during navigation
5. **Implement 404 pages** - Better user experience
6. **Use nested routes** - Organize complex applications
7. **Lazy load routes** - Code splitting for better performance

## Challenge (Optional)

- Add a "Cart" page with route `/cart`
- Create a category filter using query parameters (`/products?category=electronics`)
- Add breadcrumb navigation
- Implement protected routes (require authentication)
- Add route transitions/animations
- Create a search page with results

## Solution Checklist

- [ ] Installed `react-router` package
- [ ] Set up `RouterProvider` in `main.tsx`
- [ ] Created `createBrowserRouter` with routes
- [ ] Created HomePage component
- [ ] Created ProductDetailPage component
- [ ] Added Navigation component with `Link` components
- [ ] Used `Outlet` in App component
- [ ] Implemented dynamic routes with `:id` parameter
- [ ] Used `useParams` to get product ID
- [ ] Added links from product list to product details
- [ ] Implemented 404 page for unknown routes
- [ ] Used `useNavigate` for programmatic navigation
- [ ] Styled navigation with Tailwind CSS

## Common Mistakes to Avoid

- Forgetting to wrap app with `RouterProvider`
- Not using `Outlet` for nested routes
- Using anchor tags (`<a>`) instead of `Link`
- Not handling undefined route parameters
- Forgetting to handle 404 cases
- Not using keys in route arrays
- Mixing `react-router-dom` with `react-router` (v7 uses `react-router`)

## Advanced: Data Loading

React Router v7 supports data loading:

```typescript
{
  path: "/product/:id",
  element: <ProductDetail />,
  loader: async ({ params }) => {
    const product = await fetchProduct(params.id)
    return product
  },
}
```

Access loaded data with `useLoaderData`:

```typescript
const product = useLoaderData();
```

## TypeScript Tips

Type your route parameters:

```typescript
type ProductParams = {
  id: string;
};

const ProductDetail = () => {
  const { id } = useParams<ProductParams>();
  // id is typed as string
};
```
