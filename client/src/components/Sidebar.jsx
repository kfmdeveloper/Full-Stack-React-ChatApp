import React, { useState } from "react";
import { BsSearchHeart } from "react-icons/bs";
import { HiOutlineSearch } from "react-icons/hi";
import OtherUsers from "./OtherUsers";
const Sidebar = () => {
  const [preUser, setPreUser] = useState("");

  return (
    <div id="sidebar" className="flex flex-col p-2 px-3">
      <form action="" className="flex items-center gap-2 ">
        <input
          type="text"
          value={preUser}
          onChange={(e) => setPreUser(e.target.value)}
          className="input text-white input-bordered bg-black rounded-lg "
          placeholder="Search..."
        />
        <button className="btn bg-slate-900 hover:text-black hover:bg-green-300">
          <HiOutlineSearch className="w-4 h-4" />
        </button>
      </form>
      <div className="divider font-semibold text-sm">KF</div>
      <div className=" overflow-auto">
        <OtherUsers />
      </div>
    </div>
  );
};

export default Sidebar;
