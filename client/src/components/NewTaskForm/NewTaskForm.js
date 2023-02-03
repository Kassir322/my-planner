import React, { useState } from "react";
import { usePlanner } from "../../MyHooks";
import "../css/NewTaskForm.css";
import TaskRow from "./TaskRow";

export default function NewTaskForm() {
  const [formRows, setFormRows] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.taskTitle != "") {
      addTask();
      closeForm();
    } else {
      alert("У задачи должен быть заголовок");
    }
  };

  const closeForm = () => {
    hideForm();
    setFormData({
      taskTitle: "",
      taskDescription: "",
      taskDedline: "",
    });
  };

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { form, hideForm, formData, setFormData, addTask } = usePlanner();

  return (
    <>
      {form.visibility && (
        <div className="newtaskform">
          <h1 className="newtaskform__title">Новая задача</h1>
          <form
            onReset={() => closeForm()}
            onSubmit={handleSubmit}
            className="taskForm"
          >
            <TaskRow
              name="taskTitle"
              description={"Название задачи:"}
              onChangeInput={onChangeHandler}
            />
            <TaskRow
              name="taskDescription"
              description={"Описание задачи:"}
              onChangeInput={onChangeHandler}
            />
            <TaskRow
              name="taskDedline"
              description={"Дедлайн:"}
              onChangeInput={onChangeHandler}
            />
            <div>
              <input type="submit" value="Отправить" />
              <input type="reset" value="Отменить" />
            </div>
          </form>
          {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        </div>
      )}
    </>
  );
}
