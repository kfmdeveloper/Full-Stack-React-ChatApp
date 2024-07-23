import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = () => {
  useGetOtherUsers();
  const { authOtherUsers } = useSelector((store) => store.user);
  if (!authOtherUsers) return; //early return in react
  return (
    <div className=" overflow-auto pr-2 w-[300px]">
      {authOtherUsers?.map((user) => {
        return <OtherUser key={user._id} user={user} />;
      })}
    </div>
  );
};

export default OtherUsers;
