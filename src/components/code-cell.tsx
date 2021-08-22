import React, { useState, useEffect } from "react";
import CodeEditor from "components/code-editor";
import Preview from "components/preview";
import Resizable from "components/resizable";
import { bundle } from "bundler";
import { Cell } from "state";
import { useActions } from "hooks/use-actions";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useTypedSelector } from "hooks/use-typed-selector";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell } = useActions();
  const { code, err } = useTypedSelector((state) => state.bundles[cell.id]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
