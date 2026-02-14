import { useState } from "react";
import Card from "./Card";

function Dashboard() {
  const [users, setUsers] = useState(100);
  const [sales, setSales] = useState(50);

  return (
    <div>
      <Card title="Users" value={users} lastUpdated="Today" />
      <Card title="Sales" value={sales} lastUpdated="Today" />

      <button onClick={() => setUsers(users + 1)}>
        Simulate Update
      </button>
    </div>
  );
}

export default Dashboard;
