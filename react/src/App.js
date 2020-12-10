import "./App.css";
import MedCard from "./containers/MedCardView";
import HomePage from "./containers/HomeView";
import MedCardAdd from "./containers/MedCradAddView";
import MedCardEdit from "./containers/MedCradEditView";
import MedCardAssignment from "./containers/MedCardAssignmentView";
import Register from "./components/Register";
import Login from "./components/Login";
import Hello from "./components/Hello";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Component } from "react";
import { TagList } from "./containers/TagView";
import { TagAdd } from "./containers/TagAddView";
import { TagEdit } from "./containers/TagEditView";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/tag" component={TagList} />
          <Route path="/tag/add" component={TagAdd} />
          <Route path="/tag/edit/:id" component={TagEdit} />

          <Route exact path="/" component={HomePage} />
          <Route path="/medical_card" component={MedCard} />
          <Route path="/assignment/add" component={MedCardAdd} />
          <Route path="/assignment/:id/edit" component={MedCardEdit} />
          <Route path="/assignment/:id" component={MedCardAssignment} />
          <Route exact path="/login/" component={Login} />
          <Route path="/register/" component={Register} />
          <Route path="/hello/" component={Hello} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
