import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom"
import LoginContainer from '../containers/LoginContainer'
import RegisterContainer from '../containers/RegisterContainer'


const Public = () => <h3>Plain public page.</h3>

const Protected = () => {
    return(
        <div>
            <h3>Protected Page.</h3>
            <h2>If you are here, that mean you are logged in.</h2>
        </div>
    )
}

const Register = (props) => {
    const { from } = props.location.state || { from: { pathname: '/' } }
    return(
        <div>
            <h3> Register form. </h3>
            < RegisterContainer redirectPath={from}/>
        </div>
    )
}

const Home = (props) => {
    return(
        <div>
            <h1>Home Page</h1>
            <hr/>
            <LoginContainer toggleState={props.toggleState} />
            <hr/>
            <ul>
                <li><Link to="/public"> Public Page </Link></li>
                <li><Link to="/protected"> Protected Page </Link></li>
            </ul>
        </div>
    )
}


const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route {...rest} render={ props => (
        isAuthenticated
            ? <Component {...props} />
            : <Redirect to={ { pathname: '/register', state: { from: props.location } } } />
    )} />
)

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isAuthenticated: false
        }
        this.toggleState = this.toggleState.bind(this)
    }

    toggleState() {
        this.setState( prevState => ({
            isAuthenticated: !prevState.isAuthenticated
        }) )
    }

    render () {
        return (
            <div className="App">
                { this.state.isAuthenticated ? <h1>You are logged in. </h1> : <h1>You are not logged in. </h1>}
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/" render ={ () => <Home toggleState={this.toggleState}/> } />
                            <Route path="/public" component={ Public } />
                            <Route path="/register" component={ Register } />
                            <PrivateRoute path='/protected' isAuthenticated={this.state.isAuthenticated} component={ Protected } />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App;