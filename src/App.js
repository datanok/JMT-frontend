import { useEffect, useState } from "react";
import UserTable from "./UserTable";
import LoginTable from "./LoginTable";

import Popup from "./Popup";

const API_BASE = "http://localhost:5000";
function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [logins, setLogins] = useState([]);
  const [newLogin, setNewLogin] = useState("");
  const [shuffledUsers, setShuffledUsers] = useState([]);
  const [isOpen, SetisOpen] = useState(false);

  const getUsers = () => {
    fetch(API_BASE + "/jmt/users").then((res) =>
      res
        .json()
        .then((data) => {
          setUsers(data);
        })
        .catch((err) => console.log("error bhai", err))
    );
  };
  const addUser = async () => {
    if (!newUser) return;
    const data = await fetch(API_BASE + "/jmt/user/new", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ text: newUser }),
    }).then((res) => res.json());
    setUsers([...users, data]);
    setNewUser("");
  };

  const deleteUser = async (id) => {
    const data = await fetch(API_BASE + "/user/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());
    setUsers((users) => users.filter((user) => user._id !== data._id));
  };
  const getLogins = () => {
    fetch(API_BASE + "/logins").then((res) =>
      res
        .json()
        .then((data) => {
          setLogins(data);
        })
        .catch((err) => console.log("error bhai", err))
    );
  };
  const handleClose = () => {
    SetisOpen(false);
  };
  const addLogin = async () => {
    if (!newLogin) return; // check if input is empty
    const data = await fetch(API_BASE + "/login/new", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ text: newLogin }),
    }).then((res) => res.json());
    setLogins([...logins, data]);
    setNewUser("");
  };
  const deleteLogin = async (id) => {
    const data = await fetch(API_BASE + "/login/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());
    setLogins((logins) => logins.filter((login) => login._id !== data._id));
  };
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  const shuffle = () => {
    if (users.length > 0 && logins.length > 0) {
      const loginNames = logins.map((login) => login.name);
      console.log(loginNames);
      shuffleArray(loginNames);

      const updatedUsers = users.map((user, index) => ({
        ...user,
        login: loginNames[index % loginNames.length],
      }));

      setShuffledUsers(updatedUsers);
      SetisOpen(true);
    }
  };
  useEffect(() => {
    getUsers();
    getLogins();
  }, []);
  return (
    <div className="">
      <div className="w-full text-center my-4">
        <button
          className="p-2 text-md font-bold  shadow-sm border  rounded-lg bg-green-300 text-emerald-800 hover:bg-blue-600 hover:text-white"
          onClick={() => shuffle()}
        >
          Shuffle
        </button>
      </div>
      <div className="App grid grid-cols-1 md:grid-cols-2">
        <div className=" p-4">
          {isOpen && (
            <Popup shuffledUsers={shuffledUsers} handleClose={handleClose} />
          )}
          <div className=""></div>
          <h1 className="text-lg font-bold m-2">Users</h1>
          <div className="my-4 flex ">
            <input
              type="text"
              className="border w-full shadow-sm rounded-lg p-2"
              placeholder="Add User"
              onChange={(e) => setNewUser(e.target.value)}
              required
            />
            <button
              className="ml-2 w-24 px-1 text-sm font-bold  shadow-sm border  rounded-lg text-black hover:bg-blue-600 hover:text-white border-blue-600"
              onClick={addUser}
            >
              Add User
            </button>
          </div>
          <UserTable users={users} addUser={addUser} deleteUser={deleteUser} />
        </div>
        <div className="p-4">
          <h1 className="text-lg font-bold m-2">Logins</h1>
          <div className="flex my-4">
            <input
              type="text"
              className="border w-full shadow-sm rounded-lg p-2"
              placeholder="Add Login"
              onChange={(e) => setNewLogin(e.target.value)}
            />
            <button
              className="ml-2 w-24 px-1 text-sm font-bold shadow-sm border rounded-lg text-black hover:bg-blue-600 hover:text-white border-blue-600"
              onClick={addLogin}
            >
              Add Login
            </button>
          </div>
          <LoginTable logins={logins} deleteLogin={deleteLogin} />
        </div>
      </div>
    </div>
  );
}

export default App;
