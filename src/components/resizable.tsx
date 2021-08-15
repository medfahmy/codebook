import React, { useEffect } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "styles/resizable.css";

interface ResizableProps {
  direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = function ({ direction, children }) {
  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    const listener = function () {
      console.log(window.innerHeight, window.innerWidth);
    };
    window.addEventListener("resize", listener);

    return function () {
      window.removeEventListener("resize", listener);
    };
  }, []);

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      height: Infinity,
      width: window.innerWidth * 0.75,
      resizeHandles: ["e"],
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, window.innerHeight * 0.95],
      minConstraints: [Infinity, 48],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
