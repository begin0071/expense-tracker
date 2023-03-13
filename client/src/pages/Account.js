import React, { useEffect, useState } from "react";
import { Wrapper } from "../components";

import SignIn from "../components/AccountPage/SignIn";
import { getMe } from "../utils/APIs";
import Auth from "../utils/auth";

const Account = (props) => {
  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

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
  }, [userDataLength]);

  console.log(userData);
  console.log(Auth.loggedIn());

  return (
    <Wrapper>
      <h1>Account</h1>
      {/* <SignIn /> */}
      {Auth.loggedIn() ? (
        <button onClick={Auth.logout}>Logout</button>
      ) : (
        <SignIn />
      )}
    </Wrapper>
  );
};

export default Account;
