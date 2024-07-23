import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setMessages } from "../../redux/MessageSlice";
const SendInput = () => {
  const { selectedUser } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const [Msg, setMsg] = useState("");
  const { messages } = useSelector((store) => store.message);

  const toastStyle = {
    style: {
      backgroundColor: "red",
      color: "black",
    },

    iconTheme: {
      primary: "yellow",
      secondary: "black",
    },
    position: "top-right",
  };
  const SubmitHandler = async (e) => {
    e.preventDefault();

    const messageInput = e.target[0].value;

    if (messageInput === "") {
      toast.error("Cannot send empty Messages..!", toastStyle);
    } else {
      try {
        const res = await axios.post(
          `http://localhost:8080/api/v1/message/send/${selectedUser?._id}`,
          { message: messageInput }, // Use messageInput instead of Message
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        dispatch(setMessages([...messages, res?.data?.newMessage])); // Correctly update messages state
        if (res?.data?.success) {
          toast.success(res?.data?.message, toastStyle);
        }
        setMsg("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={SubmitHandler} action="">
      <div className="w-full mt-7 my-2 bg-cyan-950 flex justify-between">
        <input
          type="text"
          value={Msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Send a Message..."
          className="bg-cyan-950 w-full  text-white h-13 rounded-lg p-3 outline-none border-none"
        />
        <button
          type="submit"
          className="flex items-center justify-center hover:bg-red-500 w-20"
        >
          <IoSend size={"24px"} className="hover:text-black text-white" />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
