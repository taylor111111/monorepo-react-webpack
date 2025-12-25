import React from "react";
import "./App.css";
import { fetchUser } from "@repo/domain-user";

function App() {
  const [name, setName] = React.useState("loading...");

  React.useEffect(() => {
    fetchUser().then((user) => {
      setName(user.name);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h3>app-e</h3>
        <p>
          Current user: <strong>{name}</strong>
        </p>
        <p>
          User data is shared from <code>@repo/domain-user</code>
        </p>
      </header>
    </div>
  );
}

export default App;
