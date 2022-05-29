import React from "react";
import { Form } from "react-bootstrap/";

const CustomInput = ({
  onChange,
  name,
  value,
  label,
  placeholder,
  className,
  iconPosition,
  icon,
  type,
  ...rest
}) => {
  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === "left") {
        return "row";
      } else if (iconPosition === "right") {
        return "row-reverse";
      }
    }
  };
  return (
    <>
      <div className={`mb-3 input_wrap`}>
        {label && <Form.Label htmlFor="">{label}</Form.Label>}
        <div
          style={{
            display: "flex",
            flexDirection: getFlexDirection(),
            height: "100%",
          }}
        >
          {icon && <div className={"icon_text"}>{icon}</div>}
          <Form.Control
            {...rest}
            onChange={onChange}
            name={name}
            type={type || "text"}
            value={value}
            placeholder={placeholder}
            autoComplete="off"
          />
        </div>
      </div>
    </>
  );
};

export default CustomInput;
