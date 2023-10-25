import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './Component/login';
import Dashboard from './Component/default';
import OnlyMe from './Component/eachuser';
import Register from './Component/register';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/OnlytheUser" component={OnlyMe} />
                <Route exact path="/" component={Dashboard} />
                <Route path="/dashboard" component={Register} />
                <Route path="/dash" component={LoginForm} />
            </Switch>
        </Router>
    );
}

export default App;