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
import RequestView from "./containers/Requests/RequestList";
import { ListOfDoctors } from "./containers/Lists/ListOfDoctors";
import { Forbidden } from "./components/Main/Fordidden";
import rules from "./components/Main/rules";
import jwtDecode from "jwt-decode";

const getUserRole = () => {
  var token = localStorage.getItem("access_token");
  var decoded = jwtDecode(token);
  return decoded["user_type"];
};

const checkAccess = (rules, role, action) => {
  var str = action.replace(/[0-9]+/, ":id").replace(/\/$/, "");
  var reg = new RegExp(str);
  var res = reg.test(rules[role].static);
  return res;
};

function render_component(path, Component_) {
  return checkAccess(rules, getUserRole(), path) ? Component_ : Forbidden;
}

function Route_to(props) {
  return (
    <Route
      exect={props.exect ? true : false}
      path={props.path}
      component={render_component(props.path, props.component)}
    />
  );
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route_to exact path={links.tag.list} component={TagList} />
          <Route_to path={links.tag.add} component={TagAdd} />
          <Route_to path={links.tag.edit} component={TagEdit} />
          <Route_to path={links.medical_card} component={MedCard} />
          <Route_to
            path={links.personal_account.settings}
            component={SettingsView}
          />
          <Route_to
            path={links.personal_account.page}
            component={PersonalAccount}
          />
          <Route_to path={links.reminders} component={Reminders} />
          <Route_to path={links.assignment.add} component={MedCardAdd} />
          <Route_to path={links.assignment.edit} component={MedCardEdit} />
          <Route_to
            path={links.assignment.view}
            component={MedCardAssignment}
          />
          <Route_to path={links.requests} component={RequestView} />
          <Route_to path={links.doctors} component={ListOfDoctors} />

          <Route path="/hello/" component={Hello} />
          <Route exact path={links.auth.login} component={Login} />
          <Route path={links.auth.register} component={Register} />
          <Route exact path={links.home} component={HomePage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
