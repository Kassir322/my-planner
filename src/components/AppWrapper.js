import React from "react";
import "./css/AppWrapper.css";
import UnderHeader from "./UnderHeader";
import Header from "./Header";
import Content from "./Content/Content";

export default function AppWrapper() {
  return (
    <div className="app__wrapper">
      <div className="app__wrapper__inner">
        <Header />
        <UnderHeader />
        <Content />
      </div>
    </div>
  );
}
