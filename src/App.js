import React from "react";
import { Router, Route } from "react-router-dom";
import "./App.css";
import history from "./history";
import Home from "./components/Home";
import PostPage from "./components/PostPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Secret from "./components/Secret";

function App() {
  return (
    <Router history={history}>
      <div className="app">
        <Route exact path="/" component={Home} />
        <Route path="/blog-post-details/:id" component={PostPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/secret" component={Secret} />
      </div>
    </Router>
  );
}

export default App;
