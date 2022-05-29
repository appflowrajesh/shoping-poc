import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

import MobileNav from "../MobileNav";
import Search from "./Search";

const Layout = () => {
  return (
    <>
      <div className="main_wrapper">
        <Sidebar />
        <div className="content_wrap">
          <MobileNav />
          <Search />
          <div className="outlet_wrap">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
