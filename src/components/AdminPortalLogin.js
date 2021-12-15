import React, { useEffect } from "react";
import { useState } from "react";

import Button from "@material-ui/core/Button";

import NavAdmin from "./NavAdmin";
import Admin from "./Admin";
import jwt from "jsonwebtoken";

export default function AdminPortalLogin() {
  const [authToken, setAuthToken] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //checking if a token exists in local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      //   const user = jwt.decode(token);
      //   if (user) {
      //     setAuthToken(true);
      //     console.log("Logged in from token in local storage");
      //     console.log(token)
      //     console.log(user);
      //   }
      setAuthToken(true);
    }
  }, []);

  //function handling submission of the login form
  async function loginSubmit(evt) {
    evt.preventDefault();
    console.log(username);
    console.log(password);
    const response = await fetch("/attemptLogin", {
      method: "POST",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });

    const data = await response.json();

    if (data.userID) {
      localStorage.setItem("token", data.user);
      alert("Login Successful");
      setAuthToken(true);
    } else {
      alert("Please Check Your Username and Password");
    }
  }

  //condition render based on the presence of a web token
  if (authToken) {
    return <Admin authToken={authToken} setAuthToken={setAuthToken} />;
  } else {
    return (
      <>
        <NavAdmin />
        <div id="login-screen">
          <h1>Admin Login Portal</h1>
          <form onSubmit={loginSubmit}>
            <label for="username">Username: </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
            />
            <label for="password">Password: </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
            <input type="submit" value="Login" />
          </form>
        </div>
        {/* <div id="login-screen">
          <form action="/register" method="POST">
            <label for="username">Username: </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
            />
            <label for="password">Password: </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
            <input type="submit" value="Login" />
          </form>
        </div> */}
      </>
    );
  }
}
