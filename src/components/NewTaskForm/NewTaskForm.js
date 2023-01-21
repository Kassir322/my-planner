import React, { useState } from "react";
import { usePlanner } from "../../MyHooks";
import "../css/NewTaskForm.css";
import ContentRow from "./ContentRow";

export default function NewTaskForm() {
  const [formRows, setFormRows] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.taskTitle != "") {
      hideForm();
      addPlannedTask();
      setFormData({
        taskTitle: "",
        taskDescription: "",
        taskDedline: "",
      });
    } else {
      alert("У задачи должен быть заголовок");
    }
  };

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { form, hideForm, formData, setFormData, addPlannedTask } =
    usePlanner();

  return (
    <>
      {form && (
        <div className="newtaskform">
          <h1 className="newtaskform__title">Новая задача</h1>
          <form onSubmit={handleSubmit} className="content">
            <ContentRow
              name="taskTitle"
              description={"Название задачи:"}
              onChangeInput={onChangeHandler}
            />
            <ContentRow
              name="taskDescription"
              description={"Описание задачи:"}
              onChangeInput={onChangeHandler}
            />
            <ContentRow
              name="taskDedline"
              description={"Дедлайн:"}
              onChangeInput={onChangeHandler}
            />
            <input type="submit" value="Отправить" />
          </form>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </>
  );
}
