import React, { useEffect } from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../redux/MessageSlice";

const Messages = () => {
  useGetMessages();
  const dispatch = useDispatch();
  const { messages } = useSelector((store) => store.message);

  return (
    <>
      {messages ? (
        <div className="h-[423px] overflow-auto px-6">
          {messages &&
            messages.map((message) => {
              return <Message key={message?._id} message={message} />;
            })}
        </div>
      ) : (
        <h1>Lets Start message</h1>
      )}
    </>
  );
};

export default Messages;
