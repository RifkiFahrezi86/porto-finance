import { RouterProvider } from "react-router";
import { router } from "./routes.tsx";
import { DataProvider } from "./components/DataContext";

export default function App() {
  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  );
}
