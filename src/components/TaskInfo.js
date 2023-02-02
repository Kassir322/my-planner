import React from "react";
import { usePlanner } from "../MyHooks";
import "./css/TaskInfo.css";

export default function TaskInfo() {
  const { taskInfo, hideTaskInfo, deleteTask, tasks, setTaskType } =
    usePlanner();
  return (
    <>
      {taskInfo.visibility && (
        <div className="taskinfo">
          <div className="closeinfo">
            <button>fav</button>
            <button onClick={hideTaskInfo}>X</button>
          </div>
          <div className="info">
            <h1>{taskInfo.title}</h1>
            <div>{taskInfo.content}</div>
          </div>
          <div className="actions">
            {(taskInfo.type === "planned" || taskInfo.type === "doing") && (
              <button onClick={() => setTaskType("completed")}>
                Выполнено
              </button>
            )}
            {taskInfo.type === "planned" && (
              <button onClick={() => setTaskType("doing")}>Выполнять</button>
            )}
            <button
              onClick={() => {
                deleteTask();
                console.log(tasks);
              }}
            >
              Удалить
            </button>
          </div>
        </div>
      )}
    </>
  );
}
