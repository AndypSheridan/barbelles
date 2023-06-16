import UserPasswordEditForm from "./pages/profiles/UserPasswordEditForm";
import UserProfileEditForm from "./pages/profiles/UserProfileEditForm";
import TutorialDetailPage from "./pages/tutorials/TutorialDetailPage";
import TutorialShareForm from "./pages/tutorials/TutorialShareForm";
import TutorialsFeedPage from "./pages/tutorials/TutorialsFeedPage";
import TutorialEditForm from "./pages/tutorials/TutorialEditForm";
import UsernameEditForm from "./pages/profiles/UsernameEditForm";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostDetailPage from "./pages/posts/PostDetailPage";
import PostsFeedPage from "./pages/posts/PostsFeedPage";
import PostShareForm from "./pages/posts/PostShareForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import PostEditForm from "./pages/posts/PostEditForm";
import PageNotFound from "./components/PageNotFound";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import About from "./pages/About";
import "./api/axiosDefaults";

function App() {
    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id || "";

    return (
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
                    <Route exact path="/signup" render={() => <SignUpForm />} />
                    <Route exact path="/signin" render={() => <SignUpForm />} />
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
                            <PageNotFound />
                        )}
                    />
                </Switch>
            </Container>
        </div>
    );
}

export default App;
