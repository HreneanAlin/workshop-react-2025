import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: "credit" | "debit" | "paypal";
};

const FormsExercise = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "credit",
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Exercise 5: Forms & Controlled Components
        </h1>
        <p className="text-gray-600 mb-6">
          Learn to create controlled form inputs and handle form submission
        </p>

        <div className="space-y-6">
          <section className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Your Task
            </h2>
            <p className="text-gray-600">
              Create a checkout form with controlled inputs for customer
              information and payment method selection.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Instructions
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Create controlled inputs for: name, email, address, city, zip
                code
              </li>
              <li>
                Add a select dropdown for payment method (credit, debit, paypal)
              </li>
              <li>
                Use{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">onChange</code>{" "}
                handlers to update state
              </li>
              <li>
                Add form validation (all fields required, valid email format)
              </li>
              <li>
                Create a submit handler that prevents default and logs form data
              </li>
              <li>Display a success message after successful submission</li>
            </ol>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              💡 Example Code Structure
            </h2>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
              <code>{`const [formData, setFormData] = useState({
  name: '',
  email: '',
  // ... other fields
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Handle form submission
  console.log(formData);
};`}</code>
            </pre>
          </section>

          <section className="border-2 border-dashed border-gray-300 p-8 rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Your Solution Area
            </h2>
            <p className="text-gray-500 italic mb-4">
              Create your checkout form here:
            </p>
            <div className="bg-white p-6 rounded border">
              {/* TODO: Create the checkout form */}
              <form>
                {/* TODO: Add form inputs */}
                <p className="text-gray-400 italic">
                  Form inputs should appear here:
                  <br />
                  - Name (text input)
                  <br />
                  - Email (email input)
                  <br />
                  - Address (text input)
                  <br />
                  - City (text input)
                  <br />
                  - Zip Code (text input)
                  <br />
                  - Payment Method (select dropdown)
                  <br />- Submit button
                </p>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FormsExercise;
