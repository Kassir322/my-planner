import React from "react";
import { usePlanner } from "../MyHooks";
import "./css/TaskInfo.css";

export default function TaskInfo() {
  const { taskInfo, hideTaskInfo } = usePlanner();
  return (
    <>
      {taskInfo.visibility && (
        <div className="taskinfo">
          <div className="closeinfo">
            <button onClick={hideTaskInfo}>X</button>
          </div>
          <div className="info">
            <h1>{taskInfo.title}</h1>
            <div>{taskInfo.content}</div>
          </div>
          <div className="actions">
            <button>Выполнено</button>
            <button>Выполнять</button>
            <button>Удалить</button>
          </div>
        </div>
      )}
    </>
  );
}
