import { render, screen } from "@testing-library/react";
import App, { getUserRole, checkAccess } from "../App";
import rules from "../components/Main/rules";
import { Forbidden } from "../components/Main/Fordidden";
import { links } from "../components/Main/Links";
import { Login } from "../components/Auth/Login";
import HomePage from "../containers/Main/HomeView";

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Medical card/i);
  expect(linkElement).toBeInTheDocument();
});

test.each([
  [
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiemVmcmVzaCIsImV4cCI6MTYxMTM1MDg0NiwianREIjoiZDJlMzc2Y2RmZGY2NDc0ZGI0OWJmODIyOGYwNmI0Y2IiLCJ1c2VyX3R5cGUiOjF9.WVriAkiryjC6dNXyKhi-bQxrn0HJNRuhunYZq_R7wfs",
    1,
  ],
  [
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiemVmcmVzaCIsImV4cCI6MTYxMTM1MDg0NiwianREIjoiZDJlMzc2Y2RmZGY2NDc0ZGI0OWJmODIyOGYwNmI0Y2IiLCJ1c2VyX3R5cGUiOjJ9.UhKD3JUDA_Bl8HQyloyICFVHLL1UV5YEPdgVn_7wfjU",
    2,
  ],
])("getting user role (%s, %s)", (token, role) => {
  localStorage.setItem("access_token", token);
  expect(getUserRole()).toEqual(role);
  localStorage.removeItem("access_token");
});

test.each([
  [1, links.doctors, true],
  [1, links.patients, false],
  [2, links.patients, true],
])("checking access", (role, action, expected) => {
  expect(checkAccess(rules, role, action)).toBe(expected);
});

test.each([
  [true, 1, HomePage],
  [false, 2, Forbidden],
])("render component func", (permision, role, component) => {
  const App_module = require("../App.js");

  App_module.defaultFunctions.checkAccess = jest
    .fn()
    .mockReturnValue(permision);
  App_module.defaultFunctions.getUserRole = jest.fn().mockReturnValue(role);
  expect(App_module.render_component("", HomePage)).toBe(component);
});

test("render component raise error", () => {
  const App_module = require("../App.js");
  App_module.defaultFunctions.getUserRole = App_module.getUserRole;
  expect(App_module.render_component("", HomePage)).toBe(Login);
});
