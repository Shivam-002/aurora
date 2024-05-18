import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
const routes = [
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/main",
    component: Main,
  },
];

export default routes;
