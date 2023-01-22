import React from "react";

export default function Header() {
  return (
    <div className="header">
      <div className="container">
        <header className="app__header">
          <div className="app_logo">
            <img src={require(`../png/logo.png`)} />
          </div>
          {/* <div className="header__navbar">
            <a className="header__nav__link">Все команды</a>
            <a className="header__nav__link">Мои задачи</a>
            <a className="header__nav__link">Помощь</a>
          </div>
          <div className="header__search">
            <img src={require(`../png/search.png`)} />
          </div>
          <div className="header__ava">
            <img src={require(`../png/ava2.png`)} />
          </div> */}
        </header>
      </div>
    </div>
  );
}
