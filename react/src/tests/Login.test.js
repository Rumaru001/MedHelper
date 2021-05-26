import { render, screen } from "@testing-library/react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { createRenderer } from "react-dom/test-utils";
import { axiosLogin, Login } from "../components/Auth/Login";
import { mount, configure, shallow } from "enzyme";
import axiosInstance from "../axiosApi";

configure({ adapter: new Adapter() });

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

// jest.mock("axios", () => {
//     return {
//         create: jest.fn(() => axios),
//         post: jest.fn(() => Promise.resolve()),
//     };
// });

// test("testing axiosLogin", async () => {
//   var axios = require("../axiosApi");
//   jest.mock("../axiosApi", () => {
//     return {
//       post: jest.fn(() => Promise.resolve({ data: {} })),
//     };
//   });
//   axios.post.mockImplementation(() => {
//     console.log("INSIDE");
//     return Promise.resolve({
//       data: {
//         access:
//           "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiemVmcmVzaCIsImV4cCI6MTYxMTM1MDg0NiwianREIjoiZDJlMzc2Y2RmZGY2NDc0ZGI0OWJmODIyOGYwNmI0Y2IiLCJ1c2VyX3R5cGUiOjF9.WVriAkiryjC6dNXyKhi-bQxrn0HJNRuhunYZq_R7wfs",
//         refresh:
//           "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiemVmcmVzaCIsImV4cCI6MTYxMTM1MDg0NiwianREIjoiZDJlMzc2Y2RmZGY2NDc0ZGI0OWJmODIyOGYwNmI0Y2IiLCJ1c2VyX3R5cGUiOjF9.WVriAkiryjC6dNXyKhi-bQxrn0HJNRuhunYZq_R7wfs",
//       },
//     });
//   });
//   console.log(await axios.post())
//   expect(await axiosLogin("email@gmail.com", "password")).toBe(true);
//   expect(localStorage.getItem("access_token")).toBe(
//     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiemVmcmVzaCIsImV4cCI6MTYxMTM1MDg0NiwianREIjoiZDJlMzc2Y2RmZGY2NDc0ZGI0OWJmODIyOGYwNmI0Y2IiLCJ1c2VyX3R5cGUiOjF9.WVriAkiryjC6dNXyKhi-bQxrn0HJNRuhunYZq_R7wfs"
//   );
//   expect(localStorage.getItem("refresh_token")).toBe(
//     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiemVmcmVzaCIsImV4cCI6MTYxMTM1MDg0NiwianREIjoiZDJlMzc2Y2RmZGY2NDc0ZGI0OWJmODIyOGYwNmI0Y2IiLCJ1c2VyX3R5cGUiOjF9.WVriAkiryjC6dNXyKhi-bQxrn0HJNRuhunYZq_R7wfs"
//   );
//   localStorage.clear();
// });

test("renders login", () => {
  render(<Login />);
  const linkElement = screen.getByText(/Account Login/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders login, check for email", () => {
  render(<Login />);
  expect(screen.getByText(/Email/i)).toBeInTheDocument();
});

test("login handleChange func", () => {
  var component = mount(<Login />);
  var instance = component.instance();
  var event = {
    target: {
      name: "name",
      value: "password",
    },
  };
  instance.handleChange(event);
  expect(instance.state["name"]).toBe("password");
});

test("login handleChange email error", () => {
  var component = mount(<Login />);
  var instance = component.instance();
  var event = {
    target: {
      name: "email",
      value: "no_a_real_email",
    },
  };
  instance.handleChange(event);
  expect(instance.state.errors["email"]).toBe("Email is not valid!");
});

test("login handleChange password error", () => {
  var component = mount(<Login />);
  var instance = component.instance();
  var event = {
    target: {
      name: "password",
      value: "short",
    },
  };
  instance.handleChange(event);
  expect(instance.state.errors["password"]).toBe(
    "Password must be 8 characters long!"
  );
});

test("login handle submit fail", async () => {
  var module = require("../components/Auth/Login");
  module.axiosLogin = jest.fn().mockReturnValue(Promise.resolve(false));
  var component = await mount(<Login />);
  var event = {
    preventDefault() {},
    target: {
      name: "name",
      value: "password",
    },
  };
  await component.find("form").simulate("submit", event);
  component.update();
  expect(component.state()).toStrictEqual({
    formValid: false,
    errorCount: false,
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
      message: "Your password or email is not correct!",
    },
  });
});

test("login handle submit success", async () => {
  var module = require("../components/Auth/Login");
  module.axiosLogin = jest.fn().mockReturnValue(Promise.resolve(true));
  var component = await mount(<Login history={[]} />);
  var event = {
    preventDefault() {},
    target: {
      name: "name",
      value: "password",
    },
  };
  await component.find("form").simulate("submit", event);
  component.update();

  var arr = component.instance().props.history;
  expect(arr[arr.length - 1]).toStrictEqual("/personal_account/");
});
