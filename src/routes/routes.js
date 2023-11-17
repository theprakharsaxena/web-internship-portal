import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";
import HomePage from "../pages/User/HomePage";
import ALLBlogs from "../pages/User/ALLBlogs";
import Blog from "../pages/User/Blog";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/allblogs" element={<ALLBlogs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
