import ReactDOM from "react-dom";
import { StrictMode, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SearchParams from "./SearchParams";
import Info from "./Info";
import ThemeContext from "./ThemeContext";

// const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, "Adopt me!"),
//     React.createElement(Pet, {
//       name: "Luna",
//       animal: "Dog",
//       breed: "Havanese",
//     }),
//     React.createElement(Pet, { name: "Fred", animal: "Bird", breed: "Canary" }),
//     React.createElement(Pet, { name: "Sudo", animal: "Dog", breed: "Terrier" }),
//   ]);
// };

const App = () => {
  const theme = useState("purple");
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <Router>
          <header>
            <Link to="/">
              <h1>Adopt me</h1>
            </Link>
          </header>
          <Switch>
            <Route path="/details/:id">
              <Info />
            </Route>
            <Route path="/">
              <SearchParams />
            </Route>
          </Switch>
        </Router>
        {/*<Pet name="Luna" animal="Dog" breed="Havanese" />*/}
        {/*<Pet name="Fred" animal="Bird" breed="Canary" />*/}
        {/*<Pet name="Sudo" animal="Dog" breed="Terrier" />*/}
      </div>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.querySelector("#root")
);
