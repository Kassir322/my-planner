import React from "react";
import ContentItem from "../ContentItem";
import { usePlanner } from "../../MyHooks";

export default function Content() {
  const { showForm, plannedTasks } = usePlanner();

  return (
    <div className="content">
      <div className="container">
        <div className="content__inner">
          <div className="content__window">
            <h1 className="content__window__title">Предстоящее</h1>
            <div className="main__window__content">
              <button onClick={showForm}>add</button>
              {plannedTasks.map((obj, i) => (
                <ContentItem content={obj.content} title={obj.title} key={i} />
              ))}
            </div>
          </div>
          <div className="content__window">
            <h1 className="content__window__title">В процессе</h1>
            <div className="main__window__content">
              <button onClick={showForm}>add</button>
              {plannedTasks.map((obj, i) => (
                <ContentItem content={obj.content} title={obj.title} key={i} />
              ))}
            </div>
          </div>
          <div className="content__window">
            <h1 className="content__window__title">Выполнено</h1>
            <div className="main__window__content">
              <button onClick={showForm}>add</button>
              {plannedTasks.map((obj, i) => (
                <ContentItem content={obj.content} title={obj.title} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
