import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetSelectedUser } from "../../redux/UserSlice";

const OtherUser = ({ user }) => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const SelectedUserhandler = async (user) => {
    dispatch(SetSelectedUser(user));
  };
  return (
    <>
      <div
        onClick={() => SelectedUserhandler(user)}
        className={`${
          selectedUser?._id === user?._id ? "bg-stone-900" : ""
        } flex items-center  gap-2 hover:bg-stone-900 hover:duration-150 p-[4px] rounded-lg`}
      >
        <div className="avatar online">
          <div className="rounded-full w-10 h-10">
            <img
              className="rounded-full h-10"
              src={user?.profilePhoto}
              alt=""
            />
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col items-center ">
            <div className="text-white ">
              {user?.fullName &&
                user.fullName.charAt(0).toUpperCase() + user.fullName.slice(1)}
            </div>
            <p className=" self-start text-sm text-orange-500">Online</p>
          </div>
          <p>{user?.gender}</p>
        </div>
      </div>

      <div className="divider my-0 py-0"></div>
    </>
  );
};

export default OtherUser;
