import React, { Suspense, lazy } from "react";
import { Router, Route } from "react-router-dom";
import "./styles/App.css";
import history from "./history";
import Home from "./pages/Home";
import StatusMessage from "./components/StatusMessage";

const PostPage = lazy(() => import("./pages/PostPage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const User = lazy(() => import("./pages/User"));

function App() {
  return (
    <Router history={history}>
      <div className="app">
        <Suspense fallback={<StatusMessage message={"Loading..."} />}>
          <Route exact path="/" component={Home} />
          <Route path="/post/:id" component={PostPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/user/:id" component={User} />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
