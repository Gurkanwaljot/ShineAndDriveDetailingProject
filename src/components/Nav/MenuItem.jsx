import { isArray } from "lodash";
import React, { useState } from "react";
import classNames from "classnames";
import TextAnimation from "../TextAnimation/TextAnimation";

export default function MenuItem({ props, onClick }) {
  const [showMenu, setShowMenu] = useState(false);

  const showsubnav = () => {
    setShowMenu(!showMenu);
  };

  const showActive = classNames("ak-munu_dropdown_toggle", {
    active: showMenu,
  });

  const showActivePrent = classNames("menu-item-has-children", {
    active: showMenu,
  });

  return (
    <li className={showActivePrent}>
      <TextAnimation link={props.link} title={props.title} onClick={onClick} />
      {isArray(props.childern) && (
        <>
          <ul>
            {props?.childern?.map((child) => (
              <li key={child.key}>
                <TextAnimation link={child.link} title={child.title} onClick={onClick} />
              </li>
            ))}
          </ul>
          <span className={showActive} onClick={showsubnav}></span>
        </>
      )}
    </li>
  );
}