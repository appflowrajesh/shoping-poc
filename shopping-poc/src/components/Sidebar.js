import React from "react";
import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <ListGroup variant="flush">
          {/* <ListGroup.Item>
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to="/create-new-order"
            >
              New Order
            </NavLink>
          </ListGroup.Item> */}
          <ListGroup.Item>
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to="/product-list"
            >
              Product List
            </NavLink>
          </ListGroup.Item>
          <ListGroup.Item>
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to="/order-list"
            >
              Order List
            </NavLink>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </>
  );
};

export default Sidebar;
