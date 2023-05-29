import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import HomePage from "./pages/HomePage";
import SignInForm from "./pages/auth/SignInForm";
import PostShareForm from "./pages/posts/PostShareForm";
import PostDetailPage from "./pages/posts/PostDetailPage";
import PostsFeedPage from "./pages/posts/PostsFeedPage";

function App() {
    return (
        <div className={styles.App}>
            <NavBar />
            <Container className={styles.Main}>
                <Switch>
                    {/* <Route exact path="/" render={() => <HomePage />} /> */}
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <PostsFeedPage message="No search results found. Adjust the search keyword(s)" />
                        )}
                    />
                    <Route exact path="/signin" render={() => <SignInForm />} />
                    <Route exact path="/signup" render={() => <SignUpForm />} />
                    <Route
                        exact
                        path="/posts/share"
                        render={() => <PostShareForm />}
                    />
                    <Route
                        exact
                        path="/posts/:id"
                        render={() => <PostDetailPage />}
                    />
                    <Route
                        render={() => (
                            <p className={styles.PageNotFound}>
                                Oh no, this page can't be found!!
                            </p>
                        )}
                    />
                </Switch>
            </Container>
        </div>
    );
}

export default App;
