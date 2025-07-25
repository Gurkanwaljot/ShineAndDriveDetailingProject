import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { hoverTextAnimation } from "../../helper/main";
import classNames from "classnames";

export default function TextAnimation({ link, title, classNamePass, onClick }) {
  const linkText = useRef();

  const showActivePrent = classNames("text-hover-animaiton", {
    "nav-pages-item": title === "Pages",
  });

  useLayoutEffect(() => {
    hoverTextAnimation(linkText.current);
  }, [link, title]);

  return (
    <Link
      to={link}
      ref={linkText}
      onClick={onClick} 
      className={`${showActivePrent} ${classNamePass ? classNamePass : ""}`}
    >
      {title}
    </Link>
  );
}