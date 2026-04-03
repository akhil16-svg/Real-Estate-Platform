import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage.jsx";
import ListPage from "./pages/listPage/ListPage.jsx";
import SinglePage from "./pages/singlePage/SinglePage.jsx";
import ProfilePage from "./pages/profilePage/ProfilePage.jsx";
import ProfileUpdatePage from "./pages/profileUpdatePage/ProfileUpdatePage.jsx";
import NewPostPage from "./pages/newPostPage/NewPostPage.jsx";
import UpdatePostPage from "./pages/updatePostPage/UpdatePostPage.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import { postLoader, listPageLoader, singlePageLoader, profilePageLoader } from "./lib/loaders.js";
import Layout from "./components/layout/Layout.jsx";
import RequireAuth from "./components/requireAuth/RequireAuth.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/list", element: <ListPage />, loader: listPageLoader },
      { path: "/:id", element: <SinglePage />, loader: singlePageLoader },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        element: <RequireAuth />,
        children: [
          { path: "/profile", element: <ProfilePage />, loader: profilePageLoader },
          { path: "/profile/update", element: <ProfileUpdatePage /> },
          { path: "/add", element: <NewPostPage /> },
          { path: "/update/:id", element: <UpdatePostPage />, loader: postLoader },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <SocketContextProvider>
        <RouterProvider router={router} />
      </SocketContextProvider>
    </AuthContextProvider>
  );
}

export default App;
