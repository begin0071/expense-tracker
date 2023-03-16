import React, { useEffect, useState } from "react";
import { Wrapper } from "../components";
import Profile from "../components/AccountPage/Profile";
import SignIn from "../components/AccountPage/SignIn";
import { getMe } from "../utils/APIs";
import auth from "../utils/auth";

const Account = (props) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = auth.loggedIn() ? auth.getToken() : null;

        console.log("token: ", token);

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error("something went wrong!");
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, []);

  console.log("aaa", userData);
  console.log(auth.loggedIn());

  return (
    <>
      <h1>Account</h1>
      {/* <SignIn /> */}
      {auth.loggedIn() ? <Profile user={userData} /> : <SignIn />}
    </>
  );
};

export default Account;
