import React from "react";
import SideBar from "./assets/Components/SideBar";
import { Outlet } from "react-router-dom";

const RootLayOut = () => {
  return (
    <div className="bg-red-100 h-dvh py-20">
      <div className="w-[1440px] bg-black mx-auto h-full rounded-[35px] flex">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayOut;
