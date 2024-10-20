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
    path: "",
    element: <NavbarWrapper />,
    
    children: [
      {
        path:"/",
        element:<Home isPublic={true} />,
      },
      {
        path:"/detail/:id",
        element:<NotesDetail isPublic={true} />,
      },
      {
        path:"/notes",
        element:<Home  />,
        loader: async () => {
          if (!localStorage.getItem("Authorization")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path:"/notes/:id",
        element:<NotesDetail  />,
        loader: async () => {
          if (!localStorage.getItem("Authorization")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path:"/add",
        element:<NotesForm />,
        loader: async () => {
          if (!localStorage.getItem("Authorization")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path:"/edit/:id",
        element:<NotesForm />,
        loader: async () => {
          if (!localStorage.getItem("Authorization")) {
            throw redirect("/login");
          }
          return null;
        },
      },
 
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