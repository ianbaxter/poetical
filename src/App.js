import React from "react";
import { Router, Route } from "react-router-dom";
import "./App.css";
import history from "./history";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Secret from "./pages/Secret";

function App() {
  return (
    <Router history={history}>
      <div className="app">
        <Route exact path="/" component={Home} />
        <Route path="/post/:id" component={PostPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/secret" component={Secret} />
      </div>
    </Router>
  );
}

export default App;
