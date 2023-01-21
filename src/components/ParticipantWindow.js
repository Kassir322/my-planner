import { useState } from "react";
import "./css/ParticipantWindow.css";
import Participant from "./Participant";
import { usePlanner } from "../MyHooks";
import prcpntBtn from "../png/addParticipant.png";

export default function ParticipantWindow() {
  const { participants, addParticipant } = usePlanner();
  return (
    <div className="participants__window">
      <h1 className="participants__title">Участники</h1>
      <div className="participants__container">
        {participants.map((obj, i) => (
          <Participant key={i} name={obj.name} ava={obj.ava} />
        ))}
      </div>
      <div className="participant__add">
        <button onClick={() => addParticipant("ava1", "added")}>
          <img src={prcpntBtn} />
        </button>
      </div>
    </div>
  );
}
