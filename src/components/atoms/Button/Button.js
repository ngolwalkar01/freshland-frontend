import React from "react";
import styles from "./Button.module.css";
import PropTypes from "prop-types";

const Button = ({ text, icon, variant }) => {
  const buttonClassName =
    variant === "custom" ? styles.customButton : styles.defaultButton;
  return (
    <button className={`${styles.button} ${buttonClassName}`}>
      <span>{text}</span>
      {icon && <span className="icon">{icon}</span>}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element, // React element for icon
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["default", "custom"]), // Variant of the button};
};

Button.defaultProps = {
  variant: "default",
};

export default Button;
