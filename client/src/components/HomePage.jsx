import React from "react";
import MessageContainer from "./MessageContainer";
import Sidebar from "./Sidebar";

import ProfilePage from "./ProfilePage";
const HomePage = () => {
  return (
    <div className="flex justify-evenly">
      <div className="h-screen w-80  shadow-md bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-15 border border-gray-100">
        <ProfilePage />
      </div>
      <div className="flex  h-screen w-full shadow-md bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default HomePage;
