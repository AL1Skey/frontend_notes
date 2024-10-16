import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NotesDetail from "./pages/notes/NotesDetail";
import { Outlet } from "react-router-dom";
import NotesForm from "./pages/notes/NotesForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    loader: async () => {
      if (!localStorage.getItem("Authorization")) {
        throw redirect("/login");
      }
      return null;
    },
    children: [
      {
        path:"",
        element:<Home />,
      },
      {
        path:"/add",
        element:<NotesForm />,
      },
      {
        path:"/edit/:id",
        element:<NotesForm />,
      },
      {
        path:"/detail/:id",
        element:<NotesDetail />,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,

  },
  {
    path: "/register",
    element: <Register />,
  }
]);

function NavbarWrapper() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}





export default App;