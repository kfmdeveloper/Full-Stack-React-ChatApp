import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { authUser, selectedUser } = useSelector((store) => store.user);

  if (!authUser) return;
  const authuser = authUser?.user;
  const createdAt = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <>
      {message ? (
        <div
          ref={scroll}
          className={`chat ${
            message.senderId === authuser._id ? "chat-end" : "chat-start "
          } `}
        >
          <div className="chat-image avatar">
            <div className={`w-10 rounded-full `}>
              <img
                alt="Tailwind CSS chat bubble component"
                src={
                  message.senderId === authuser._id
                    ? authuser.profilePhoto
                    : selectedUser.profilePhoto
                }
              />
            </div>
          </div>

          <div
            className={`chat-bubble ${
              message.senderId === authuser._id
                ? "bg-blue-900 text-white"
                : "bg-black"
            }`}
          >
            {message?.message}
            <div className="flex items-end justify-end text-sm">
              <time className="text-xs opacity-50 self-end text-yellow-200">
                {createdAt}
              </time>
            </div>
          </div>
        </div>
      ) : (
        <h1>Let's start conversation</h1>
      )}
    </>
  );
};

export default Message;
