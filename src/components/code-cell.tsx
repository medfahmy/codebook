import { useState, useEffect } from "react";
import CodeEditor from "components/code-editor";
import Preview from "components/preview";
import bundle from "bundler";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import Resizable from "./resizable";

const CodeCell = function () {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      setCode(await bundle(input));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
