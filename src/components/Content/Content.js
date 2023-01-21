import React from "react";
import ContentItem from "./ContentItem";
import { usePlanner } from "../../MyHooks";
import TaskInfo from "../TaskInfo";

export default function Content() {
  const { showForm, tasks, filterTask } = usePlanner();

  return (
    <div className="content">
      <div className="container">
        <div className="content__inner">
          <div className="content__window">
            <h1 className="content__window__title">Предстоящее</h1>
            <div className="main__window__content">
              <button onClick={showForm}>add</button>
              {filterTask("planned").map((obj, i) => (
                <ContentItem content={obj.content} title={obj.title} key={i} />
              ))}
            </div>
          </div>
          <div className="content__window">
            <h1 className="content__window__title">В процессе</h1>
            <div className="main__window__content">
              {filterTask("doing").map((obj, i) => (
                <ContentItem content={obj.content} title={obj.title} key={i} />
              ))}
            </div>
          </div>
          <div className="content__window">
            <h1 className="content__window__title">Выполнено</h1>
            <div className="main__window__content">
              {filterTask("completed").map((obj, i) => (
                <ContentItem content={obj.content} title={obj.title} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
