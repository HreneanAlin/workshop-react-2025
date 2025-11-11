import { useState } from "react";
import ComponentsExercise from "./exercises/ComponentsExercise";
import PropsStateExercise from "./exercises/PropsStateExercise";
import EventHandlingExercise from "./exercises/EventHandlingExercise";
import ListsKeysExercise from "./exercises/ListsKeysExercise";
import FormsExercise from "./exercises/FormsExercise";
import RouterExercise from "./exercises/RouterExercise";

type Exercise = {
  id: number;
  title: string;
  description: string;
  component: React.ComponentType;
};

const exercises: Exercise[] = [
  {
    id: 1,
    title: "Components & JSX",
    description: "Create product card components",
    component: ComponentsExercise,
  },
  {
    id: 2,
    title: "Props & State",
    description: "Build a product counter",
    component: PropsStateExercise,
  },
  {
    id: 3,
    title: "Event Handling",
    description: "Add to cart functionality",
    component: EventHandlingExercise,
  },
  {
    id: 4,
    title: "Lists & Keys",
    description: "Display product catalog",
    component: ListsKeysExercise,
  },
  {
    id: 5,
    title: "Forms & Controlled Components",
    description: "Create checkout form",
    component: FormsExercise,
  },
  {
    id: 6,
    title: "React Router",
    description: "Navigation & routing",
    component: RouterExercise,
  },
];

const App = () => {
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);

  const handleExerciseSelect = (id: number) => {
    setSelectedExercise(id);
  };

  const handleBackToMenu = () => {
    setSelectedExercise(null);
  };

  const SelectedComponent = selectedExercise
    ? exercises.find((ex) => ex.id === selectedExercise)?.component
    : null;

  if (SelectedComponent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={handleBackToMenu}
            className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Back to exercises menu"
            tabIndex={0}
          >
            ← Back to Exercises
          </button>
          <SelectedComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              🛒 React E-Commerce Workshop
            </h1>
            <p className="text-xl text-gray-600">
              Build an e-commerce store while learning React fundamentals
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <button
                key={exercise.id}
                onClick={() => handleExerciseSelect(exercise.id)}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow text-left"
                aria-label={`Start ${exercise.title} exercise`}
                tabIndex={0}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl font-bold text-blue-600">
                    {exercise.id}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {exercise.title}
                </h2>
                <p className="text-gray-600">{exercise.description}</p>
              </button>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              📚 Exercise Instructions
            </h2>
            <p className="text-gray-600 mb-4">
              Each exercise includes detailed instructions. Check the{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">exercises/</code>{" "}
              folder for markdown files with step-by-step guides.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>ComponentsExercise.md - Components & JSX</li>
              <li>PropsStateExercise.md - Props & State</li>
              <li>EventHandlingExercise.md - Event Handling</li>
              <li>ListsKeysExercise.md - Lists & Keys</li>
              <li>FormsExercise.md - Forms & Controlled Components</li>
              <li>RouterExercise.md - React Router & Navigation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
