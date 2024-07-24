import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { authUser } = useSelector((store) => store.user);
  if (!authUser) return;
  const user = authUser?.user;
  const toastStyle = {
    style: {
      backgroundColor: "black",
      color: "white",
    },
    iconTheme: {
      primary: "yellow",
      secondary: "black",
    },
  };
  const Logouthandler = async () => {
    try {
      const logoutApi = "https://full-stack-react-chat-app-frontend.vercel.app/api/v1/user/logout";
      axios.defaults.withCredentials = true;
      const res = await axios.get(logoutApi);
      if (res.data.success) {
        toast.success(res.data.message, toastStyle);
        navigate("/login");
      } else {
        toast.error(res.data.message, toastStyle);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="mb-4 bg-slate-900 w-full p-3 mt-1">
        <p className="text-center font-bold text-lg text-white">Logged In</p>
      </div>
      <div className="flex space-y-3  p-6 flex-col justify-center items-center">
        <img
          src={user?.profilePhoto}
          alt=""
          className="w-[120px] online h-[120px] rounded-full"
        />

        <p className="text-2xl text-orange-600">Welcome back </p>
        <div className="flex justify-center items-center">
          <h1 className="text-3xl text-white font-bold">
            {user?.fullName &&
              user.fullName.charAt(0).toUpperCase() + user.fullName.slice(1)}
          </h1>
        </div>
        <div className="flex justify-between space-x-2">
          <p>Username: </p>
          <p className="font-bold text-white">{user?.username}</p>
        </div>
        <div className="flex justify-between space-x-2">
          <p>Gender: </p>
          <p className="font-bold text-white">{user?.gender}</p>
        </div>
        <div className="flex justify-between space-x-3">
          <p>Status: </p>
          <p className="text-orange-500 font-bold ">Online</p>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-center">DEVELOPED BY </p>
          <p className="text-pretty font-bold rounded-md">KHALID FAROOQ </p>
        </div>
        <div className="w-full">
          <button
            onClick={Logouthandler}
            className="h-9 w-full bg-white rounded-lg mt-3 hover:bg-slate-900  hover:text-white duration-150 text-black"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
