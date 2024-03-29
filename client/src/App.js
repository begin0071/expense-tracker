import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Account, Dashboard, Analytics, Transactions } from "./pages";
import { Header, Wrapper } from "./components";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Analytics" element={<Analytics />} />
            <Route path="/Transactions" element={<Transactions />} />
            <Route path="/Account" element={<Account />} />
          </Routes>
        </div>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
