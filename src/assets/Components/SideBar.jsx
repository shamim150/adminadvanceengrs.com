import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-[360px]  text-white h-full m-10  text-center mt-20 ">
      <div className="">
        <div className="mb-[117px]">
          <h3 className="font-bold text-3xl mt-5 mb-1">Advanced Engineers</h3>
          <a href="mailto:info@advancedengrs.com">info@advancedengrs.com</a>
        </div>

        <ul className="flex flex-col gap-y-7 font-bold text-white">
          <li>
            <NavLink to="/">Gallery</NavLink>
          </li>

          <li>
            <NavLink to="carrier">Career and News</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
