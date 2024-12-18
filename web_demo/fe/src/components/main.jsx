import React from "react";
import "../styles/main.css";

function Main({ open, children }) {
  return <main className={`main ${open ? "open" : ""}`}>{children}</main>;
}

export default Main;
