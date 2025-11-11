# Exercise: Forms & Controlled Components

## Learning Objectives

- Create controlled form inputs
- Handle form submission
- Validate form data
- Understand controlled vs uncontrolled components

## Overview

In this exercise, you'll create a checkout form for the e-commerce store. You'll learn how to create controlled inputs, handle form submission, and validate user input.

## Task

Create a checkout form with:

- Controlled inputs for customer information
- A select dropdown for payment method
- Form validation
- Submit handler that prevents default behavior
- Success message after submission

## Step-by-Step Instructions

### Step 1: Set Up Form State

```typescript
type FormData = {
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: "credit" | "debit" | "paypal";
};

const [formData, setFormData] = useState<FormData>({
  name: "",
  email: "",
  address: "",
  city: "",
  zipCode: "",
  paymentMethod: "credit",
});
```

### Step 2: Create Change Handler

```typescript
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
```

### Step 3: Create Submit Handler

```typescript
const [submitted, setSubmitted] = useState(false);

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Validation
  if (!formData.name || !formData.email || !formData.address) {
    alert("Please fill in all required fields");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Handle submission
  console.log("Form submitted:", formData);
  setSubmitted(true);

  // Reset form after 3 seconds
  setTimeout(() => {
    setFormData({
      name: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      paymentMethod: "credit",
    });
    setSubmitted(false);
  }, 3000);
};
```

### Step 4: Create Form JSX

```typescript
<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label htmlFor="name" className="block text-sm font-medium mb-1">
      Full Name *
    </label>
    <input
      type="text"
      id="name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
      className="w-full border rounded px-3 py-2"
    />
  </div>

  <div>
    <label htmlFor="email" className="block text-sm font-medium mb-1">
      Email *
    </label>
    <input
      type="email"
      id="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
      className="w-full border rounded px-3 py-2"
    />
  </div>

  <div>
    <label htmlFor="address" className="block text-sm font-medium mb-1">
      Address *
    </label>
    <input
      type="text"
      id="address"
      name="address"
      value={formData.address}
      onChange={handleChange}
      required
      className="w-full border rounded px-3 py-2"
    />
  </div>

  <div>
    <label htmlFor="city" className="block text-sm font-medium mb-1">
      City *
    </label>
    <input
      type="text"
      id="city"
      name="city"
      value={formData.city}
      onChange={handleChange}
      required
      className="w-full border rounded px-3 py-2"
    />
  </div>

  <div>
    <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
      Zip Code *
    </label>
    <input
      type="text"
      id="zipCode"
      name="zipCode"
      value={formData.zipCode}
      onChange={handleChange}
      required
      className="w-full border rounded px-3 py-2"
    />
  </div>

  <div>
    <label htmlFor="paymentMethod" className="block text-sm font-medium mb-1">
      Payment Method *
    </label>
    <select
      id="paymentMethod"
      name="paymentMethod"
      value={formData.paymentMethod}
      onChange={handleChange}
      className="w-full border rounded px-3 py-2"
    >
      <option value="credit">Credit Card</option>
      <option value="debit">Debit Card</option>
      <option value="paypal">PayPal</option>
    </select>
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
  >
    Complete Order
  </button>
</form>;

{
  submitted && (
    <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
      Order submitted successfully! Thank you for your purchase.
    </div>
  );
}
```

## Key Concepts

### Controlled Components

- React controls the value of form inputs
- Input value comes from state
- Changes update state via `onChange`
- Single source of truth for form data

### Uncontrolled Components

- Browser controls the input value
- Use `ref` to access values
- Less common in modern React
- Useful for simple forms or third-party libraries

### Form Events

- `onSubmit`: Fired when form is submitted
- `onChange`: Fired when input value changes
- `onBlur`: Fired when input loses focus
- `onFocus`: Fired when input gains focus

### Preventing Default Behavior

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault(); // Prevents page reload
  // Handle form submission
};
```

### Form Validation

- HTML5 validation: `required`, `type="email"`, etc.
- Custom validation: Check values in submit handler
- Show error messages for invalid inputs
- Prevent submission if validation fails

## Best Practices

1. **Use controlled components** for most forms
2. **Validate on submit** (and optionally on blur)
3. **Show clear error messages**
4. **Use proper input types** (`email`, `tel`, `number`, etc.)
5. **Accessible labels** with `htmlFor` and `id`
6. **Disable submit button** while processing

## Challenge (Optional)

- Add real-time validation (show errors as user types)
- Add field-level error messages
- Add a "Reset Form" button
- Add loading state during submission
- Format zip code input (auto-format)
- Add credit card number input with formatting

## Solution Checklist

- [ ] Created form state with all fields
- [ ] Created `handleChange` function
- [ ] Created `handleSubmit` function
- [ ] Added `e.preventDefault()` in submit handler
- [ ] All inputs are controlled (value + onChange)
- [ ] Added validation for required fields
- [ ] Added email format validation
- [ ] Created select dropdown for payment method
- [ ] Added submit button
- [ ] Display success message after submission
- [ ] Used proper labels with `htmlFor`
- [ ] Added `required` attributes

## Common Mistakes to Avoid

- Forgetting `e.preventDefault()` in submit handler
- Not using controlled inputs (missing `value` prop)
- Not updating state in `onChange` handler
- Using `class` instead of `className` in JSX
- Not validating user input
- Forgetting to reset form after submission

## Advanced: Custom Validation Hook

```typescript
const useFormValidation = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? "" : "Invalid email";
      case "zipCode":
        return value.length === 5 ? "" : "Zip code must be 5 digits";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  return { values, errors, handleChange };
};
```
