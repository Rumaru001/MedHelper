import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

const LinkButton = (props) => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    className,
    value,
  } = props;
  return (
    <button
      onClick={(event) => {
        onClick && onClick(event);

        history.push(to);
      }}
      className={className}
      value={value}
      staticContext={staticContext}
    />
  );
};

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default withRouter(LinkButton);
