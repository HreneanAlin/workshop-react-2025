const RouterExercise = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Exercise: React Router - Navigation & Routing
          </h1>
          <p className="text-gray-600 mb-6">
            Learn to create multi-page applications with React Router
          </p>

          <div className="space-y-6">
            <section className="border-l-4 border-blue-500 pl-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Your Task
              </h2>
              <p className="text-gray-600">
                Set up React Router and create a multi-page e-commerce
                application with navigation, product listing, and product detail
                pages.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Instructions
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>
                  Install{" "}
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    react-router
                  </code>{" "}
                  package
                </li>
                <li>
                  Set up{" "}
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    RouterProvider
                  </code>{" "}
                  in{" "}
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    main.tsx
                  </code>
                </li>
                <li>
                  Create routes using{" "}
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    createBrowserRouter
                  </code>
                </li>
                <li>
                  Add{" "}
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    Navigation
                  </code>{" "}
                  component with{" "}
                  <code className="bg-gray-200 px-2 py-1 rounded">Link</code>{" "}
                  components
                </li>
                <li>
                  Use{" "}
                  <code className="bg-gray-200 px-2 py-1 rounded">Outlet</code>{" "}
                  to render child routes
                </li>
                <li>
                  Create dynamic route for product details using{" "}
                  <code className="bg-gray-200 px-2 py-1 rounded">:id</code>{" "}
                  parameter
                </li>
                <li>
                  Use{" "}
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    useParams
                  </code>{" "}
                  to get product ID
                </li>
                <li>
                  Implement{" "}
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    useNavigate
                  </code>{" "}
                  for programmatic navigation
                </li>
                <li>Add 404 page for unknown routes</li>
                <li>Style everything with Tailwind CSS</li>
              </ol>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                💡 Key Concepts
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    createBrowserRouter
                  </code>{" "}
                  - Creates router with browser history
                </li>
                <li>
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    RouterProvider
                  </code>{" "}
                  - Renders router and manages navigation
                </li>
                <li>
                  <code className="bg-gray-200 px-2 py-1 rounded">Link</code> -
                  Declarative navigation component
                </li>
                <li>
                  <code className="bg-gray-200 px-2 py-1 rounded">Outlet</code>{" "}
                  - Renders child routes
                </li>
                <li>
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    useParams
                  </code>{" "}
                  - Access route parameters
                </li>
                <li>
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    useNavigate
                  </code>{" "}
                  - Programmatic navigation
                </li>
              </ul>
            </section>

            <section className="border-2 border-dashed border-gray-300 p-8 rounded-lg bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                🎯 Your Solution Area
              </h2>
              <p className="text-gray-500 italic mb-4">
                Follow the instructions above to set up React Router in{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">main.tsx</code>{" "}
                and create your routes. Once you've set up the router, your
                navigation and routing will work throughout the application.
              </p>
              <p className="text-gray-600 text-sm mt-4">
                💡 Tip: Check the code comments in this file for example
                component structures you can use as reference.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouterExercise;
