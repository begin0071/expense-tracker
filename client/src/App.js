import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Account, Dashboard, Analytics, Transactions } from "./pages";
import { Header, Wrapper } from "./components"

import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/global.css"

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Header />
        <div className="pt-3 px-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<Analytics />} />
            <Route path="/about" element={<Transactions />} />
            <Route path="/about" element={<Account />} />
          </Routes>
        </div>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
