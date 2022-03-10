import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import FrontPage from "./pages/FrontPage";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./AuthContext";
import EditAboutMe from "./pages/EditPage";
import EditGallery from "./pages/EditGallery";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <PrivateRoute path="/admin">
                        <AdminPage />
                    </PrivateRoute>
                    <PrivateRoute path="/edit">
                        <EditAboutMe />
                    </PrivateRoute>
                    <PrivateRoute path="/editgallery">
                        <EditGallery />
                    </PrivateRoute>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/">
                        <FrontPage />
                    </Route>
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;
