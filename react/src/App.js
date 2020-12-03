import "./App.css";
import MedCard from "./containers/MedCardView";
import HomePage from "./containers/HomeView";
import MedCardAdd from "./containers/MedCradAddView";
import MedCardEdit from "./containers/MedCradEditView";
import MedCardAssignment from "./containers/MedCardAssignmentView";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/:user_id/medical_card" component={MedCard} />
      <Route path="/assignment/add" component={MedCardAdd} />
      <Route path="/assignment/:id/edit" component={MedCardEdit} />
      <Route path="/assignment/:id" component={MedCardAssignment} />
    </Switch>
  );
}

export default App;
