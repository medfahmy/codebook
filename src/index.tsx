import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "state";
import CodeCell from "components/code-cell";
import TextEditor from "components/text-editor";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import CellList from "components/cell-list";

const App = function () {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
