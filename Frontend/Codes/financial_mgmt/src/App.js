import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch, useRouteMatch, useParams } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/inbox">Inbox</Link></li>
          </ul>
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/"><App /></Route>
        <Route path="/about"><About /></Route>
        <Route path="/inbox"><Inbox /></Route>
        <Route path="/messages"><Messages /></Route>
      </Switch>
    </Router>
  );
}

function About() {
  return (<h3>About</h3>);
}

function Inbox() {
  return (
    <div>
      <h2>Inbox</h2>
      {"Welcome to your Inbox"}
    </div>
  )
}

function Messages() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Messages</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Messages page has its own <Switch> with more routes
          that build on the /messages URL path. You can think of the
          2nd <Route> here as an "index" page for all messages, or
          the page that is shown when no message is selected */}
      <Switch>
        <Route path={`${match.path}/:id`}>
          <Message />
        </Route>
        <Route path={match.path}>
          <h3>Please select a msg.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Message() {
  let { id } = useParams();
  return <h3>Requested message ID: {id}</h3>;
}

export default App;
