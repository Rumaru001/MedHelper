import React from "react";
import "./App.css";
import MedCard from "./containers/MedCard/MedCardView";
import HomePage from "./containers/Main/HomeView";
import MedCardAdd from "./containers/MedCard/AddView";
import MedCardEdit from "./containers/MedCard/EditView";
import MedCardAssignment from "./containers/MedCard/AssignmentView";
import {Route, Switch } from "react-router-dom";
import PersonalAccount from "./containers/PersonalAccount/AccountView";
import Reminders from "./containers/Reminders/RemindersView";
import SettingsView from "./containers/PersonalAccount/SettingsView";


function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/:user_id/medical_card" component={MedCard} />
      <Route path="/:user_id/personal_account" component={PersonalAccount} />
      <Route path="/personal_account/settings" component={SettingsView} />
      <Route path="/:user_id/reminders" component={Reminders} />
      <Route path="/assignment/add" component={MedCardAdd} />
      <Route path="/assignment/:id/edit" component={MedCardEdit} />
      <Route path="/assignment/:id" component={MedCardAssignment} />
    </Switch>
  );
}

export default App;
