import './App.css';
import './pages/login';
import { BrowserRouter as Router, Switch, Route, Redirect, } from "react-router-dom";
import LoginPage from './pages/login';
import Home from './pages/home';
import Register from './pages/register'
import ForgotPassword from './pages/forgotPassword';

function App() {
    return (
        <>
            {/* TODO: Check comment de biet cach check log in roi moi cho vao page home
            https://stackoverflow.com/questions/70171991/navigate-is-not-a-route-component-all-component-children-of-routes-must-be */}
            <Router>
                <Switch>
                    <Route exact path="/" component={LoginPage} />
                    {/* <Route path='/login' component={LoginPage} /> */}
                    {/* <Navigate to="/" /> */}
                    <Route path="/home" component={Home} />
                    <Route path="/register" component={Register} />
                    <Route path="/forgot-password" component={ForgotPassword} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </>
    );
}

export default App;
