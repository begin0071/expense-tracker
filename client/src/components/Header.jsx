import icon from "./images/cash-favicon.png";

const Header = () => {
  return (
    <header
      className="header-container"
      style={{ borderBottom: "1px solid #333" }}
    >
      <h1 className="page-name-h1">
        {" "}
        <a className="page-name" href="/">
          Spend Sense
        </a>
      </h1>
      <img
        className="moneybag"
        src={icon}
        alt="Moneybag Icon"
        width="80px"
        height="80px"
      ></img>

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
            <ul className="nav flex-row">
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
    </header>
  );
};

export default Header;
