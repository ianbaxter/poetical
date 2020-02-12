import React from "react";
import { Router, Route } from "react-router-dom";
import "./App.css";
import history from "./history";

import BlogHome from "./components/BlogHome/BlogHome";
import BlogPostDetails from "./components/BlogPostDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import Secret from "./components/Secret";

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Route exact path="/" component={BlogHome} />
        <Route path="/blog-post-details/:id" component={BlogPostDetails} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/secret" component={Secret} />
      </div>
    </Router>
  );
}

export default App;
