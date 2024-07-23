import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SetAuthOtherUsers } from "../../redux/UserSlice";
const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      const otherusers = import.meta.env.VITE_GETOTHERUSERS_API;
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
