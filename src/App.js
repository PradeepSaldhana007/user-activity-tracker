import React from "react";
import UserLists from "./userList";
import MockData from "./mock";

function App() {
  const users = MockData.USER_LIST;
  return <UserLists users={users.members} />;
}
export default App;
