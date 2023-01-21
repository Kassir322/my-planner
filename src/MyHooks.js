import React, { createContext, useContext, useState } from "react";
import participantsData from "./data/participants-data.json";
import tasksData from "./data/tasks-data.json";

const PlannerContext = createContext();
export const usePlanner = () => useContext(PlannerContext);

export default function PlannerProvider({ children }) {
  const [participants, setParticipants] = useState(participantsData);

  const addParticipant = (ava, name) => {
    setParticipants([
      ...participants,
      {
        ava: ava,
        name: name,
      },
    ]);
  };

  const [formData, setFormData] = useState({
    taskTitle: "",
    taskDescription: "",
    taskDedline: "",
  });

  const [form, setForm] = useState(false);

  const showForm = () => {
    setForm(true);
  };

  const hideForm = () => {
    setForm(false);
  };

  const [tasks, setTasks] = useState(tasksData);

  const filterTask = (filterType) => {
    return tasks.filter((obj) => obj.type === filterType);
  };

  const addPlannedTask = () => {
    setTasks([
      ...tasks,
      {
        type: "planned",
        title: formData.taskTitle,
        content: formData.taskDescription,
      },
    ]);
  };

  const [taskInfo, setTaskInfo] = useState({
    visibility: false,
    title: "",
    content: "",
  });

  const showTaskInfo = (title, content) => {
    setTaskInfo({
      visibility: true,
      title: title,
      content: content,
    });
  };

  const hideTaskInfo = () => {
    setTaskInfo({
      visibility: false,
      title: "",
      content: "",
    });
  };

  return (
    <PlannerContext.Provider
      value={{
        participants,
        addParticipant,
        form,
        showForm,
        hideForm,
        formData,
        setFormData,
        tasks,
        filterTask,
        addPlannedTask,
        taskInfo,
        showTaskInfo,
        hideTaskInfo,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
}
