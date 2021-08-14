import MonacoEditor, { OnChange, OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import React, { useRef } from "react";

interface Props {
  initialValue: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<Props> = function ({ initialValue, onChange }) {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const handleMount: OnMount = function (editor, monaco) {
    editorRef.current = editor;
    editor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const handleChange: OnChange = function (value, event) {
    onChange(value);
  };

  return (
    <MonacoEditor
      onMount={handleMount}
      onChange={handleChange}
      value={initialValue}
      theme="vs-dark"
      language="javascript"
      height="350px"
      options={{
        wordWrap: "on",
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
