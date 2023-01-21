import React from "react";
import { usePlanner } from "../../MyHooks";
import TaskInfo from "../TaskInfo";

export default function ContentItem({ type, title, content }) {
  const { showTaskInfo } = usePlanner();
  return (
    <div
      className="content__item"
      onClick={() => {
        showTaskInfo(type, title, content);
      }}
    >
      <h1 className="item__title">{title}</h1>
      {content ? <div className="item__text">{content}</div> : null}
    </div>
  );
}
