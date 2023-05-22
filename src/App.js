import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults';
import SignUpForm from "./pages/auth/SignUpForm";
import HomePage from "./pages/HomePage";
import SignInForm from "./pages/auth/SignInForm";
import { useState } from "react";


function App() {

    const[currentUser, setCurrentUser] = useState(null);

    return (
        <div className={styles.App}>
            <NavBar />
            <Container className={styles.Main}>
                <Switch>
                    <Route exact path="/" render={() => <HomePage />} />
                    <Route exact path="/signin" render={() => <SignInForm />} />
                    <Route exact path="/signup" render={() => <SignUpForm />} />
                    <Route render={() => <p>Oh no, this page can't be found!!</p>} />
                </Switch>
            </Container>
        </div>
    );
}

export default App;
