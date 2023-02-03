import React from "react";

export default function TaskRow({ description, name, onChangeInput }) {
  return (
    <div className="taskForm__row">
      <div className="row__description">{description}</div>
      <input
        onChange={onChangeInput}
        name={name}
        className="row__input"
      ></input>
    </div>
  );
}
