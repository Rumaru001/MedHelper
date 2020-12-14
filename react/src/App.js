import React from "react";
import "./App.css";

import MedCard from "./containers/MedCard/MedCardView";
import HomePage from "./containers/Main/HomeView";
import MedCardAdd from "./containers/MedCard/AddView";
import MedCardEdit from "./containers/MedCard/EditView";
import MedCardAssignment from "./containers/MedCard/AssignmentView";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Hello from "./components/Auth/Hello";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Component} from "react";
import {TagList} from "./containers/MedCard/Tag/TagView";
import {TagAdd} from "./containers/MedCard/Tag/TagAddView";
import {TagEdit} from "./containers/MedCard/Tag/TagEditView";
import PersonalAccount from "./containers/PersonalAccount/AccountView";
import Reminders from "./containers/Reminders/RemindersView";
import SettingsView from "./containers/PersonalAccount/SettingsView";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/tag" component={TagList}/>
                    <Route path="/tag/add" component={TagAdd}/>
                    <Route path="/tag/edit/:id" component={TagEdit}/>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/medical_card" component={MedCard}/>
                    <Route path="/personal_account/settings" component={SettingsView}/>
                    <Route path="/personal_account" component={PersonalAccount}/>
                    <Route path="/:user_id/reminders" component={Reminders}/>
                    <Route path="/assignment/add" component={MedCardAdd}/>
                    <Route path="/assignment/:id/edit" component={MedCardEdit}/>
                    <Route path="/assignment/:id" component={MedCardAssignment}/>
                    <Route exact path="/login/" component={Login}/>
                    <Route path="/register/" component={Register}/>
                    <Route path="/hello/" component={Hello}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
