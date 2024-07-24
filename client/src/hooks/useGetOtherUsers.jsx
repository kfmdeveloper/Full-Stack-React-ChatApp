import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SetAuthOtherUsers } from "../../redux/UserSlice";
const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      const otherusers = "https://full-stack-react-chat-app-frontend.vercel.app/api/v1/user";
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(otherusers);
        dispatch(SetAuthOtherUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, []);
};

export default useGetOtherUsers;
