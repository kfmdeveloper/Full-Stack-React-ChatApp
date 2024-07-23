import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);

const App = () => {
  const [socket, setSocket] = useState(null);
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:8080", {
        transports: ["websocket", "polling"],
      });

      newSocket.on("connect", () => {
        console.log("Connected to socket server");
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from socket server");
      });

      // Example of sending a message to the server
      newSocket.emit("message", "Hello server!");

      setSocket(newSocket);
    } else {
      // Clear socket connection if authUser is false or null
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }

    // Clean up function
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [authUser]);

  return (
    <div className="">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
};

export default App;
