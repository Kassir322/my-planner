import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ParticipantWindow from "./components/ParticipantWindow";
import reportWebVitals from "./reportWebVitals";
import PlannerProvider from "./MyHooks";
import AppWrapper from "./components/AppWrapper";
import NewTaskForm from "./components/NewTaskForm/NewTaskForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <ParticipantsProvider>
  //   <ParticipantWindow />
  // </ParticipantsProvider>

  <PlannerProvider>
    <AppWrapper />
    <NewTaskForm />
  </PlannerProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
