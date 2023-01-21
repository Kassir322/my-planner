import React, { createContext, useContext, useState } from "react";
import participantsData from "./data/participants-data.json";
import plannedTasksData from "./data/planned-tasks-data.json";

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

  const [plannedTasks, setPlannedTasks] = useState(plannedTasksData);

  const addPlannedTask = () => {
    setPlannedTasks([
      ...plannedTasks,
      {
        title: formData.taskTitle,
        content: formData.taskDescription,
      },
    ]);
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
        plannedTasks,
        addPlannedTask,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
}
