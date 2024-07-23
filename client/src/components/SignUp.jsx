import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import { MdGppGood } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const HandleCheckBox = (gender) => {
    setuser({ ...user, gender });
  };
  const [show, setshow] = useState({
    Ferror: "hidden",
    Fcheck: "hidden",
    Uerror: "hidden",
    Ucheck: "hidden",
    Perror: "hidden",
    Pcheck: "hidden",
    CPerror: "hidden",
    CPcheck: "hidden",
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const removeSpaces = (str) => str.replace(/\s+/g, " ");
  const SignUpSubmitHanlder = (e) => {
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
        backgroundColor: "black",
        color: "white",
      },
      iconTheme: {
        primary: "yellow",
        secondary: "black",
      },
    };

    setTimeout(() => {
      const fullName = user.fullName;
      const username = user.username;
      const password = user.password;
      const confirmPassword = user.confirmPassword;

      if (
        fullName === "" &&
        username === "" &&
        password === "" &&
        confirmPassword === ""
      ) {
        toast.error("All fields are required!", toastStyle);
        setshow((pre) => ({ ...pre, Ferror: "" }));
        setshow((pre) => ({ ...pre, Uerror: "" }));
        setshow((pre) => ({ ...pre, Perror: "" }));
        setshow((pre) => ({ ...pre, CPerror: "" }));
      } else if (fullName.length < 5) {
        toast.error("FullName at least 8 characters", toastStyle);
      } else if (username.length < 4) {
        toast.error("Username at least 4 characters", toastStyle);
      } else if (password.length < 8) {
        toast.error("Password at least 8 characters", toastStyle);
      } else if (password !== confirmPassword) {
        toast.error("Passwords do not match.", toastStyle);
      } else {
        const SignIn = async () => {
          const apiEndpoint = import.meta.env.VITE_SIGNUP_API;
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
            console.log(res.data);
            toast.success(res.data.message, toastStyle);
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          } catch (error) {
            if (
              error.response &&
              error.response.data &&
              error.response.data.message
            ) {
              toast.error(error.response.data.message, toastStyle);
            } else {
              toast.error(
                "An unexpected error occurred. Please try again.",
                toastStyle
              );
            }
          }
        };
        SignIn();
      }

      toast.dismiss(loadingToastId);
    }, 1200); // 2 seconds delay
  };

  const fulnameChangeHandler = (e) => {
    setuser({ ...user, fullName: e.target.value });
    const fullName = e.target.value;
    if (fullName.length < 5) {
      setshow((pre) => ({ ...pre, Ferror: "" }));
      setshow((pre) => ({ ...pre, Fcheck: "hidden" }));
    } else {
      setshow((pre) => ({ ...pre, Ferror: "hidden" }));
      setshow((pre) => ({ ...pre, Fcheck: "" }));
    }
  };

  const UsernameChangeHandler = (e) => {
    setuser({ ...user, username: e.target.value });
    const fullName = removeSpaces(e.target.value);
    if (fullName.length < 4) {
      setshow((pre) => ({ ...pre, Uerror: "" }));
      setshow((pre) => ({ ...pre, Ucheck: "hidden" }));
    } else {
      setshow((pre) => ({ ...pre, Uerror: "hidden" }));
      setshow((pre) => ({ ...pre, Ucheck: "" }));
    }
  };

  const PasswordChangeHandler = (e) => {
    setuser({ ...user, password: e.target.value });
    const fullName = e.target.value;
    if (fullName.length < 8) {
      setshow((pre) => ({ ...pre, Perror: "" }));
      setshow((pre) => ({ ...pre, Pcheck: "hidden" }));
    } else {
      setshow((pre) => ({ ...pre, Perror: "hidden" }));
      setshow((pre) => ({ ...pre, Pcheck: "" }));
    }
  };

  const CPasswordChangeHandler = (e) => {
    setuser({ ...user, confirmPassword: e.target.value });
    const fullName = e.target.value;
    const myPassword = document.getElementById("mypassword").value;
    if (fullName === myPassword) {
      setshow((pre) => ({ ...pre, CPerror: "hidden" }));
      setshow((pre) => ({ ...pre, CPcheck: "" }));
    } else {
      setshow((pre) => ({ ...pre, CPerror: "" }));
      setshow((pre) => ({ ...pre, CPcheck: "hidden" }));
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[350px]">
        <div></div>
        <div className="w-full rounded-lg shadow-md p-6 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-black">SignUp</h1>
          <div>
            <form className="text-black" onSubmit={SignUpSubmitHanlder}>
              <div className=" ">
                <label className="label lab">
                  <span className="text-black label-text font-semibold">
                    Full Name
                  </span>
                </label>
                <div className="bg-white flex justify-center items-center font-semibold input-primary w-full input input-bordered h-10">
                  <input
                    placeholder="Full Name"
                    className="input-primary w-full h-10"
                    type="text"
                    name="fullName"
                    id="fullName"
                    onChange={fulnameChangeHandler}
                    value={user.fullName}
                  />
                  <MdGppGood
                    className={`${show.Fcheck}`}
                    size={"21px"}
                    color="blue"
                  />
                  <MdError
                    className={`${show.Ferror}`}
                    size={"21px"}
                    color="red"
                  />
                </div>
              </div>
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
                    name="username"
                    id="username"
                    onChange={UsernameChangeHandler}
                    value={user.username}
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
                    name="password"
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
              <div className="">
                <label className="label ">
                  <span className=" label-text text-black font-semibold">
                    Confirm Password
                  </span>
                </label>
                <div className="bg-white flex justify-center items-center font-semibold input-primary w-full input input-bordered h-10">
                  <input
                    placeholder="Confirm Password"
                    className="input-primary w-full h-10"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={CPasswordChangeHandler}
                    value={user.confirmPassword}
                  />
                  <MdGppGood
                    className={`${show.CPcheck}`}
                    size={"21px"}
                    color="blue"
                  />
                  <MdError
                    className={`${show.CPerror}`}
                    size={"21px"}
                    color="red"
                  />
                </div>
              </div>
              <div className="flex my-3 space-x-2">
                <div className="flex items-center space-x-2">
                  <p>Male </p>
                  <input
                    type="checkbox"
                    onChange={() => HandleCheckBox("male")}
                    checked={user.gender === "male"}
                    className="checkbox border-red-600"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <p>Female </p>
                  <input
                    type="checkbox"
                    onChange={() => HandleCheckBox("female")}
                    checked={user.gender === "female"}
                    className="checkbox border-red-600"
                  />
                </div>
              </div>

              <div className="my-2">
                <button
                  disabled={isDisabled}
                  className=" text-black hover:text-gray-100 btn btn-block btn-sm bg-gray-200"
                >
                  SignUp
                </button>
              </div>
              <p className="text-sm hover:cursor-no-drop text-center">
                Already have an account?
                <Link to={"/login"}>
                  <span className="hover:text-blue-500 text-orange-950 underline font-bold">
                    {" "}
                    Login
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
