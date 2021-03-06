import { useEffect } from "react";
import { CodeEditor } from "components/code-editor";
import { Preview } from "components/preview";
import { Resizable } from "components/resizable";
import { Cell } from "state";
import { useActions } from "hooks/use-actions";
import { useTypedSelector } from "hooks/use-typed-selector";
import { useCumulativeCode } from "hooks/use-cumulative-code";

// import "bulmaswatch/superhero/bulmaswatch.min.css";
import "styles/code-cell.css";

interface CodeCellProps {
    cell: Cell;
}

export const CodeCell = ({ cell }: CodeCellProps) => {
    const { updateCell, createBundle } = useActions();
    const bundle = useTypedSelector(state => state.bundles[cell.id]);
    const cumulativeCode = useCumulativeCode(cell.id);

    useEffect(() => {
        if (!bundle) {
            createBundle(cell.id, cumulativeCode);
            return;
        }

        const timer = setTimeout(async () => {
            createBundle(cell.id, cumulativeCode);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cell.id, cumulativeCode, createBundle]);

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
                        onChange={value =>
                            updateCell({ id: cell.id, content: value })
                        }
                    />
                </Resizable>

                <div className="preview-wrapper">
                    {!bundle || bundle.loading ? (
                        <div className="progress-cover">
                            <progress
                                className="progress is-small is-primary"
                                max="100"
                            >
                                loading
                            </progress>
                        </div>
                    ) : (
                        <Preview code={bundle.code} err={bundle.err} />
                    )}
                </div>
            </div>
        </Resizable>
    );
};
