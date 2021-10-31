import { render } from "react-dom";
// import { Provider } from "react-redux";
// import { store } from "state";
// import { CellList } from "components/cell-list";
// import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Login } from "components/login";

const App = () => {
    return (
      <Login />
        // <Provider store={store}>
        //     <div>
        //         <CellList />
        //     </div>
        // </Provider>
    );
};

render(<App />, document.querySelector("#root"));
