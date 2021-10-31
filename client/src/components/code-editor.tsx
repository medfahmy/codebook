import MonacoEditor, { OnChange, OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import React, { useRef } from "react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import codeShift from "jscodeshift";
import Highlighter from "monaco-jsx-highlighter";
import "styles/code-editor.css";
// import "styles/syntax.css";

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      editor
    );
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const handleChange: OnChange = (value) => {
    if (value) {
      onChange(value);
    }
  };

  const onFormatClick = () => {
    // get the current value from the editor
    const value = editorRef.current?.getValue();
    // const value = editorRef.current?.getModel()?.getValue();

    // format the value
    let formatted = "";
    if (value) {
      formatted = prettier
        .format(value, {
          parser: "babel",
          plugins: [parser],
          useTabs: false,
        })
        .replace(/\n$/, "");
    }

    // set the formatted value in the editor
    editorRef.current?.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        onMount={handleMount}
        onChange={handleChange}
        value={initialValue}
        theme="vs-dark"
        language="javascript"
        height="100%"
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
    </div>
  );
};
