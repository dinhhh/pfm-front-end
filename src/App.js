import './App.css';
import './pages/login';
import { BrowserRouter as Router, Switch, Route, Redirect, } from "react-router-dom";
import LoginPage from './pages/login';
import Home from './pages/home';
import Register from './pages/register'
import ForgotPassword from './pages/forgotPassword';
import AddRecord from './pages/income-expense/addRecord';
import Statistic from './pages/income-expense/statistic';
import BudgetPage from './pages/budget/budget';
import Categories from './pages/income-expense-categories/categories';
import RecurringTransactions from './pages/recurring-transactions/recurringTransactions';
import WalletsManagement from './pages/wallet/walletsManagement';
import ChangePassword from './pages/changePassword';

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
                    <Route path="/income-expense/add-record" component={AddRecord} />
                    <Route path="/income-expense/statistic" component={Statistic} />
                    <Route path="/budget/general" component={BudgetPage} />
                    <Route path="/income-expense-categories/categories" component={Categories}/>
                    <Route path="/recurring-transactions/transactions" component={RecurringTransactions} />
                    <Route path="/wallet/management" component={WalletsManagement} />
                    <Route path="/change-password" component={ChangePassword} />
                    
                    <Redirect to="/" />
                </Switch>
            </Router>
        </>
    );
}

export default App;
