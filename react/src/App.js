import "./App.css";
import MedCard from "./containers/MedCardView";
import HomePage from "./containers/HomeView";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/:user_id/medical_card" component={MedCard} />
    </Switch>
  );
}

export default App;
