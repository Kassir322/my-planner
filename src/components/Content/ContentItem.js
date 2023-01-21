import React from "react";

export default function ContentItem({ title, content }) {
  return (
    <div className="content__item" onClick={() => console.log("clicked")}>
      <h1 className="item__title">{title}</h1>
      {content ? <div className="item__text">{content}</div> : null}
    </div>
  );
}
