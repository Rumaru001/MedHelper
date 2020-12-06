import "./App.css";
import MedCard from "./containers/MedCardView";
import HomePage from "./containers/HomeView";
import MedCardAdd from "./containers/MedCradAddView";
import MedCardEdit from "./containers/MedCradEditView";
import MedCardAssignment from "./containers/MedCardAssignmentView";
import Register from "./components/Register";
import Login from "./components/Login";
import Hello from "./components/Hello";
import {Route, Switch} from "react-router-dom";
import {Component} from "react";

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/:user_id/medical_card" component={MedCard}/>
                <Route path="/assignment/add" component={MedCardAdd}/>
                <Route path="/assignment/:id/edit" component={MedCardEdit}/>
                <Route path="/assignment/:id" component={MedCardAssignment}/>
                <Route exact path="/login/" component={Login}/>
                <Route path="/register/" component={Register}/>
                <Route path="/hello/" component={Hello}/>
            </Switch>
        );
    }
}

export default App;
