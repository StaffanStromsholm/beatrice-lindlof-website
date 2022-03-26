import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import FrontPage from "./pages/FrontPage";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { Provider } from "./Context";
import EditAboutMe from "./pages/EditPage";
import EditGallery from "./pages/EditGallery";

function App() {
    return (
        <Provider>
            <Router>
                <Switch>
                    <PrivateRoute path="/admin">
                        <AdminPage />
                    </PrivateRoute>
                    <PrivateRoute path="/editaboutme">
                        <EditAboutMe />
                    </PrivateRoute>
                    <PrivateRoute path="/addphoto">
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
        </Provider>
    );
}

export default App;
