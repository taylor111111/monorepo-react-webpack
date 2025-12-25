import React from "react";
import "./App.css";
import { fetchUser, canAccessUserDashboard } from "@repo/domain-user";

function App() {
  const [status, setStatus] = React.useState("loading...");

  React.useEffect(() => {
    fetchUser().then((user) => {
      const canAccess = canAccessUserDashboard(user) ? "yes" : "no";
      setStatus(`${user.name} | role: ${user.role} | access dashboard: ${canAccess}`);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h3>app-d</h3>
        <p>{status}</p>
        <p>
          Data & business rules are provided by <code>@repo/domain-user</code>
        </p>
      </header>
    </div>
  );
}

export default App;
