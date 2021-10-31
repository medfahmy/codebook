import { useActions } from "hooks/use-actions";
import "styles/action-bar.css";

interface ActionBarProps {
    id: string;
}

export const ActionBar = ({ id }: ActionBarProps) => {
    const { deleteCell, moveCell } = useActions();

    return (
        <div className="action-bar">
            <button
                className="button is-primary is-small"
                onClick={() => moveCell({ id, direction: "up" })}
            >
                <span className="icon">
                    <i className="fas fa-arrow-up"></i>
                </span>
            </button>

            <button
                className="button is-primary is-small"
                onClick={() => moveCell({ id, direction: "down" })}
            >
                <span className="icon">
                    <i className="fas fa-arrow-down"></i>
                </span>
            </button>

            <button
                className="button is-primary is-small"
                onClick={() => deleteCell(id)}
            >
                <span className="icon">
                    <i className="fas fa-times"></i>
                </span>
            </button>
        </div>
    );
};
