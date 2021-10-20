import MDEditor from "@uiw/react-md-editor";
import { useActions } from "hooks/use-actions";
import React, { useEffect, useRef, useState } from "react";
import { Cell } from "state";
import "styles/text-editor.css";

interface TextEditorProps {
    cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
    const { updateCell } = useActions();
    const ref = useRef<HTMLDivElement | null>(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (
                ref.current &&
                event.target &&
                ref.current.contains(event.target as Node)
            ) {
                return;
            }

            setEditing(false);
        };
        document.addEventListener("click", listener, { capture: true });

        return () => {
            document.removeEventListener("click", listener, { capture: true });
        };
    }, []);

    if (editing) {
        return (
            <div className="text-editor" ref={ref}>
                <MDEditor
                    value={cell.content}
                    onChange={value =>
                        updateCell({ id: cell.id, content: value || "" })
                    }
                />
            </div>
        );
    }

    return (
        <div className="text-editor card" onClick={() => setEditing(true)}>
            <div className="card-content">
                <MDEditor.Markdown source={cell.content || "click to edit"} />
            </div>
        </div>
    );
};

export default TextEditor;
