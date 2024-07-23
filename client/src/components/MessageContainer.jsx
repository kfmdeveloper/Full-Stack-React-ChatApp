import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { SetSelectedUser } from "../../redux/UserSlice";
import { setMessages } from "../../redux/MessageSlice";

const MessageContainer = () => {
  const { selectedUser, authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(SetSelectedUser(null));
      dispatch(setMessages(null)); // Clear messages on unmount or when selectedUser is set to null
    };
  }, [dispatch]);
  return (
    <>
      {selectedUser !== null ? (
        <div className="w-full pr-5 py-2">
          <div className="flex items-center px-4 py-[3px]   gap-2 bg-black ">
            <div className="avatar online">
              <div className="rounded-full w-10 h-10">
                <img
                  className="rounded-full h-10"
                  src={selectedUser?.profilePhoto}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col items-center ">
              <div className="text-white ">{selectedUser?.fullName}</div>
              <p className=" self-start text-sm text-orange-500">Online</p>
            </div>
          </div>
          <Messages />
          <SendInput />
        </div>
      ) : (
        <div className=" flex flex-col items-center justify-center w-full ">
          <h1 className="text-3xl font-bold ">Hi {authUser?.user?.fullName}</h1>
          <br />
          <h1 className="text-3xl text-center">Let's Start a conversation!</h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
