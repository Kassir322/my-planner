import React from "react";
import "./css/Participant.css";

export default function Participant({ ava, name }) {
  return (
    <div className="participant">
      <div className="participant__img">
        <img src={require(`../png/${ava}.png`)}></img>
      </div>
      <div className="participant__name">{name}</div>
    </div>
  );
}
