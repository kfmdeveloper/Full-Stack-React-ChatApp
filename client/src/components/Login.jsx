import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import { MdGppGood } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SetAuthUser } from "../../redux/UserSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setuser] = useState({
    username: "",
    password: "",
  });
  const [show, setshow] = useState({
    Uerror: "hidden",
    Ucheck: "hidden",
    Perror: "hidden",
    Pcheck: "hidden",
  });
  const removeSpaces = (str) => str.replace(/\s+/g, " ");
  const LoginSubmitHandler = (e) => {
    e.preventDefault();
    toast.dismiss();
    const loadingToastId = toast.loading("Validating...", {
      duration: 1200,
      style: {
        letterSpacing: "2px",
      },
    });

    const toastStyle = {
      style: {
        backgroundColor: "red",
        color: "black",
      },
      iconTheme: {
        primary: "yellow",
        secondary: "black",
      },
    };

    setTimeout(() => {
      const username = user.username;
      const password = user.password;
      if (username === "" && password === "") {
        toast.error("All fields are required!", toastStyle);
        setshow((pre) => ({ ...pre, Uerror: "" }));
        setshow((pre) => ({ ...pre, Perror: "" }));
      } else if (username.length < 4) {
        toast.error("Invalid username!", toastStyle);
      } else if (password.length < 8) {
        toast.error("Invalid Password!", toastStyle);
      } else {
        const SignIn = async () => {
          const apiEndpoint ="https://full-stack-react-chat-app-frontend.vercel.app/api/v1/user/login";
          if (!apiEndpoint) {
            toast.error("API endpoint is not defined.", toastStyle);
            return;
          }
          try {
            const res = await axios.post(apiEndpoint, user, {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            });
            toast.success(res.data.message, toastStyle);
            dispatch(SetAuthUser(res.data));
            navigate("/home");
          } catch (error) {
            if (
              error.response &&
              error.response.data &&
              error.response.data.message
            ) {
              toast.error(error.response.data.message, toastStyle);
              setshow((pre) => ({ ...pre, Uerror: "" }));
              setshow((pre) => ({ ...pre, Perror: "" }));
              setshow((pre) => ({ ...pre, Ucheck: "hidden" }));
              setshow((pre) => ({ ...pre, Pcheck: "hidden" }));
            } else {
              toast.error(error.message, toastStyle);
            }
          }
        };
        SignIn();
      }

      toast.dismiss(loadingToastId);
    }, 1200); // 2 seconds delay
  };
  const UsernameChangeHandler = (e) => {
    setuser({ ...user, username: e.target.value });
    const Username = removeSpaces(e.target.value);
    if (Username.length < 4) {
      setshow((pre) => ({ ...pre, Uerror: "" }));
      setshow((pre) => ({ ...pre, Ucheck: "hidden" }));
    } else {
      setshow((pre) => ({ ...pre, Uerror: "hidden" }));
      setshow((pre) => ({ ...pre, Ucheck: "" }));
    }
  };
  const PasswordChangeHandler = (e) => {
    setuser({ ...user, password: e.target.value });
    const Password = e.target.value;
    if (Password.length < 8) {
      setshow((pre) => ({ ...pre, Perror: "" }));
      setshow((pre) => ({ ...pre, Pcheck: "hidden" }));
    } else {
      setshow((pre) => ({ ...pre, Perror: "hidden" }));
      setshow((pre) => ({ ...pre, Pcheck: "" }));
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[350px]">
        <div className=" w-full rounded-lg shadow-md p-6 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-black">Login</h1>
          <div className="mt-6">
            <form className="text-black" onSubmit={LoginSubmitHandler}>
              <div className=" ">
                <label className="label lab">
                  <span className="text-black label-text font-semibold">
                    Username
                  </span>
                </label>
                <div className="bg-white flex justify-center items-center font-semibold input-primary w-full input input-bordered h-10">
                  <input
                    placeholder="Username"
                    className="input-primary w-full h-10"
                    type="text"
                    name="fullName"
                    id=""
                    value={user.username}
                    onChange={UsernameChangeHandler}
                  />
                  <MdGppGood
                    className={`${show.Ucheck}`}
                    size={"21px"}
                    color="blue"
                  />
                  <MdError
                    className={`${show.Uerror}`}
                    size={"21px"}
                    color="red"
                  />
                </div>
              </div>
              <div className=" ">
                <label className="label lab">
                  <span className=" label-text text-black font-semibold">
                    Password
                  </span>
                </label>
                <div className="bg-white flex justify-center items-center font-semibold input-primary w-full input input-bordered h-10">
                  <input
                    placeholder="Password"
                    className="input-primary w-full h-10"
                    type="password"
                    name="fullName"
                    onChange={PasswordChangeHandler}
                    id="mypassword"
                    value={user.password}
                  />
                  <MdGppGood
                    className={`${show.Pcheck}`}
                    size={"21px"}
                    color="blue"
                  />
                  <MdError
                    className={`${show.Perror}`}
                    size={"21px"}
                    color="red"
                  />
                </div>
              </div>
              <p className="text-sm mt-3 hver:cursor-no-drop text-center">
                Don't have an account?
                <Link to={"/register"}>
                  <span className="hover:text-blue-400 text-orange-950 underline font-bold">
                    SignUp
                  </span>
                </Link>
              </p>
              <div className="my-2 mt-4">
                <button
                  type="submit"
                  className="  text-black hover:text-gray-100 btn btn-block btn-sm bg-gray-200"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
