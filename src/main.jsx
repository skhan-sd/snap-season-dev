import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import PlannerBoard from "./PlannerBoard.jsx";

function Root() {
  const path = window.location.pathname;
  if (path === "/planner") return <PlannerBoard />;
  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
