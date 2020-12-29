import React from "react";
import { Forbidden } from "./Fordidden.js";
import rules from "./rules.js";

const checkAccess = (rules, role, action) => {
  var str = action.replace(/[0-9]+/, ":id").replace(/\/$/, "");
  var reg = new RegExp(str);
  var res = reg.test(rules[role].static);
  return res;
};

class Access extends React.Component {
  render() {
    return checkAccess(rules, this.props.role, this.props.action)
      ? this.props.yes()
      : this.props.no();
  }
}

Access.defaultProps = {
  yes: () => null,
  no: () => <Forbidden />,
};

export default Access;
