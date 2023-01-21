import React from "react";

export default function ContentRow({ description, name, onChangeInput }) {
  return (
    <div className="content__row">
      <div className="row__description">{description}</div>
      <input
        onChange={onChangeInput}
        name={name}
        className="row__input"
      ></input>
    </div>
  );
}
