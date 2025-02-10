import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export const Button = ({ children, variant, size, ...props }) => {
  const buttonClass = classNames(
    "inline-flex items-center justify-center border font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2",
    {
      "border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500":
        variant === "primary",
      "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500":
        variant === "outline",
      "px-4 py-2 text-sm": size === "md",
      "px-2.5 py-1.5 text-xs": size === "sm",
      "p-2": size === "icon",
    }
  );

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "outline"]),
  size: PropTypes.oneOf(["sm", "md", "icon"]),
};

Button.defaultProps = {
  variant: "primary",
  size: "md",
};
