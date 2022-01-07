import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./component/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import HomeAdmin from "./component/admin/index";
import HomeUser from "./component/user/index";
import Protected from "./component/private/Protected";

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Protected />
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/register" component={Register} exact />
                    <Route path="/login" component={Login} exact />
                    <Route path="/admin" component={HomeAdmin} exact />
                    <Route path="/user" component={HomeUser} exact />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
