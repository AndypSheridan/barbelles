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
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UserProfileEditForm from "./pages/profiles/UserProfileEditForm";
import UserPasswordEditForm from "./pages/profiles/UserPasswordEditForm";
import UsernameEditForm from "./pages/profiles/UsernameEditForm";
import TutorialShareForm from "./pages/tutorials/TutorialShareForm";
import TutorialDetailPage from "./pages/tutorials/TutorialDetailPage";
import TutorialsFeedPage from "./pages/tutorials/TutorialsFeedPage";
import TutorialEditForm from "./pages/tutorials/TutorialEditForm";
import About from "./pages/About";
// import { ToastContainer } from "react-toastify";

function App() {
    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id || "";

    return (
        // <Container className={styles.Container}>
        <div className={`${styles.App} ${styles.MainDiv}`}>
            <NavBar />
            <Container className={styles.Main}>
                <Switch>
                    {currentUser ? (
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <PostsFeedPage message="No search results found. Adjust the search keyword(s)" />
                            )}
                        />
                    ) : (
                        <Route exact path="/" render={() => <SignUpForm />} />
                    )}
                    <Route exact path="/about" render={() => <About />} />
                    <Route
                        exact
                        path="/posts"
                        render={() => (
                            <PostsFeedPage message="No search results found. Adjust the search keyword(s)" />
                        )}
                    />
                    <Route
                        exact
                        path="/posts-feed"
                        render={() => (
                            <PostsFeedPage
                                message="No search results found. Adjust the search keyword(s) or follow someone in the community"
                                filter={`owner__followed__owner__profile=${profile_id}&`}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/liked"
                        render={() => (
                            <PostsFeedPage
                                message="No search results found. Adjust the search keyword(s) or like a post"
                                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
                            />
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
                        exact
                        path="/posts/:id/edit"
                        render={() => <PostEditForm />}
                    />
                    <Route
                        exact
                        path="/tutorials"
                        render={() => (
                            <TutorialsFeedPage message="No search results found. Adjust the search keyword(s)" />
                        )}
                    />

                    <Route
                        exact
                        path="/tutorials/share"
                        render={() => <TutorialShareForm />}
                    />
                    <Route
                        exact
                        path="/tutorials/:id"
                        render={() => <TutorialDetailPage />}
                    />
                    <Route
                        exact
                        path="/tutorials/:id/edit"
                        render={() => <TutorialEditForm />}
                    />
                    <Route
                        exact
                        path="/favourited"
                        render={() => (
                            <TutorialsFeedPage
                                message="No search results found. Adjust the search keyword(s) or favourite a tutorial"
                                filter={`favourites__owner__profile=${profile_id}&ordering=-favourites__created_at&`}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/profiles/:id/"
                        render={() => <ProfilePage />}
                    />
                    <Route
                        exact
                        path="/profiles/:id/edit/username"
                        render={() => <UsernameEditForm />}
                    />
                    <Route
                        exact
                        path="/profiles/:id/edit/password"
                        render={() => <UserPasswordEditForm />}
                    />
                    <Route
                        exact
                        path="/profiles/:id/edit"
                        render={() => <UserProfileEditForm />}
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
        // </Container>
    );
}

export default App;
