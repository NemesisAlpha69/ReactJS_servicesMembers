import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import logo from "./logo.png";
import Members from "./components/members";
import MemberForm from "./components/memberForm";
import NotFound from "./components/notFound";
import "./App.css";

// you should feel free to reorganize the code however you see fit
// including creating additional folders/files and organizing your
// components however you would like.

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">React Programming Exercise</h1>
          </header>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </nav>

        <main className="container">
          <Switch>
            <Route path="/members/:id" component={MemberForm} />
            <Route path="/members" component={Members} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/members" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
