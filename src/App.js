import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./component/homepage";
import NotFoundPage from "./component/notefoundpage";
import Login from "./component/login";
import Signup from "./component/sighup";
import AddNewTask from "./component/addnewtask";
import EditTask from "./component/edittask";

import "./App.css";
import "./style/home.css";
import "./style/pagenotfound.css";
import "./style/login.css";
import "./style/addnewtask.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={HomePage} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/addnewtask" Component={AddNewTask} />
        <Route path="/edittask/:id" Component={EditTask} />
        <Route path="*" Component={NotFoundPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
