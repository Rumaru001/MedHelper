import React from "react";
import "./App.css";
import { links } from "./components/Main/Links";
import MedCard from "./containers/MedCard/MedCardView";
import HomePage from "./containers/Main/HomeView";
import MedCardAdd from "./containers/MedCard/AddView";
import MedCardEdit from "./containers/MedCard/EditView";
import MedCardAssignment from "./containers/MedCard/AssignmentView";
import Register from "./components/Auth/Register";
import { Login } from "./components/Auth/Login";
import Hello from "./components/Auth/Hello";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Component } from "react";
import { TagList } from "./containers/MedCard/Tag/TagView";
import { TagAdd } from "./containers/MedCard/Tag/TagAddView";
import { TagEdit } from "./containers/MedCard/Tag/TagEditView";
import PersonalAccount from "./containers/PersonalAccount/AccountView";
import Reminders from "./containers/Reminders/RemindersView";
import SettingsView from "./containers/PersonalAccount/SettingsView";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={links.tag.list} component={TagList} />
          <Route path={links.tag.add} component={TagAdd} />
          <Route path={links.tag.edit} component={TagEdit} />
          <Route exact path={links.home} component={HomePage} />
          <Route path={links.medical_card} component={MedCard} />
          <Route
            path={links.personal_account.settings}
            component={SettingsView}
          />
          <Route
            path={links.personal_account.page}
            component={PersonalAccount}
          />
          <Route path={links.reminders} component={Reminders} />
          <Route path={links.assignment.add} component={MedCardAdd} />
          <Route path={links.assignment.edit} component={MedCardEdit} />
          <Route path={links.assignment.view} component={MedCardAssignment} />
          <Route exact path={links.auth.login} component={Login} />
          <Route path={links.auth.register} component={Register} />
          <Route path="/hello/" component={Hello} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
