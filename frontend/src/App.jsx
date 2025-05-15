import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddUser from "./addUser/AddUser";
import User from "./getUser/User";
import UpdateUser from "./updateUser/UpdateUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <User />,
    errorElement: <h1>Oops! Something went wrong.</h1>,
  },
  {
    path: "/add",
    element: <AddUser />,
    errorElement: <h1>Oops! Something went wrong.</h1>,
  },
  {
    path: "/update/:id",
    element: <UpdateUser />,
    errorElement: <h1>Oops! Something went wrong.</h1>,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
