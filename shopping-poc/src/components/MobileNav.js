import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const MobileNav = () => {
  return (
    <>
      <div className="mobile_nav">
        <Nav as="ul">
          <Nav.Item as="li">
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to="/product-list"
            >
              Product List
            </NavLink>
          </Nav.Item>
          <Nav.Item as="li">
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to="/order-list"
            >
              Order List
            </NavLink>
          </Nav.Item>
        </Nav>
      </div>
    </>
  );
};

export default MobileNav;
