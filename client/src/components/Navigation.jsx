import React from "react";
import { Wrapper } from "../components";

const Navigation = () => {
  return (
    <Wrapper>
      <nav
        className="navigation navbar-dark navbar-expand-md bg-body-secondary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="##">Navbar</a> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/Analytics"
                >
                  Analytics
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/Transactions"
                >
                  Transactions
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Account">
                  Account
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Wrapper>
  );
};

export default Navigation;
