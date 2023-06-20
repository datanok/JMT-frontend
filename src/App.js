import { useEffect, useState } from "react";
import UserTable from "./UserTable";
import LoginTable from "./LoginTable";

import Popup from "./Popup";
import Footer from "./Footer";

const API_BASE = "https://jmtbackend.onrender.com";
const macTeam= ['aaryan','atharva','Chinmay','Manas', 'kedar', 'jagdish','kedar', 'tanmay', 'paresh','shubh' ]
const jmLogins = ['RIL','Phone', 'Gmail','Guest',]


// const API_BASE="http://localhost:5001"
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
    setNewUser(""); // Reset the newUser state to an empty string
  };
  const addUsers = async () => {
    const users = macTeam;
  
    if (!users.length) return; // check if input is empty
  
    const userData = users.map((user) => ({ name: user }));
    
    const response = await fetch(API_BASE + "/jmt/user/new", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  
    const addedUsers = await response.json();
    setUsers((prevUsers) => [...prevUsers, ...addedUsers]);
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
    setNewLogin("");
  };
  const addLogins = async (logins) => {
    
  
    if (!logins.length) return; // check if input is empty
  
    const loginData = logins.map((login) => ({ name: login }));
    console.log(loginData);
  
    const response = await fetch(API_BASE + "/login/new", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
  
    const addedLogins = await response.json();
    setLogins((prevLogins) => [...prevLogins, ...addedLogins]);
  };
  
  const deleteLogin = async (id) => {
    const data = await fetch(API_BASE + "/login/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());
    setLogins((logins) => logins.filter((login) => login._id !== data._id));
  };

  const deleteUsers = async ()=>{
    const data = await fetch(API_BASE + "/user/delete-all", {
      method: "DELETE",
    }).then((res) => res.json());
   setUsers([]);
  }
  const deleteLogins = async ()=>{
    const data = await fetch(API_BASE + "/login/delete-all", {
      method: "DELETE",
    }).then((res) => res.json());
    setLogins([]);

  }

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
 <>
    <div className="">
         <div className="w-full text-center my-4 flex justify-between p-4" >
     
         <button
          className="p-2 text-md font-bold  shadow-sm border  rounded-lg text-black hover:bg-blue-600 hover:text-white border-blue-600"
          onClick={() => addUsers(macTeam)}
        >
          Add Mac Team
        </button>
        <button
          className="p-2 text-md font-bold  shadow-sm border  rounded-lg bg-green-300 text-emerald-800 hover:bg-blue-600 hover:text-white"
          onClick={() => shuffle()}
        >
          Shuffle
        </button>
        <button
          className="p-2 text-md font-bold  shadow-sm border  rounded-lg text-black hover:bg-blue-600 hover:text-white border-blue-600"
          onClick={() => addLogins(jmLogins)}
        >
          Add all Logins
        </button>
    
      </div>

      <div className="App grid grid-cols-1 md:grid-cols-2">
        <div className=" p-4">
          {isOpen && (
            <Popup shuffledUsers={shuffledUsers} handleClose={handleClose} />
          )}
          <div className="flex justify-between">        <h1 className="text-lg font-bold m-2">Users</h1>   <button
          className="p-2 text-md font-bold  shadow-sm border  rounded-lg bg-red-300 text-red-800 hover:bg-red-600 hover:text-white"
          onClick={() => deleteUsers()}
        >
          Delete All users
        </button></div>
         
          <div className="my-4 flex ">
            <input
              type="text"
              className="border w-full shadow-sm rounded-lg p-2"
              placeholder="Add User"
            value={newUser}
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
          <div className="flex justify-between">
          <h1 className="text-lg font-bold m-2">Logins</h1>    <button
          className="p-2 text-md font-bold  shadow-sm border  rounded-lg bg-red-300 text-red-800 hover:bg-red-600 hover:text-white"
          onClick={() => deleteLogins()}
        >
          Delete all Logins
        </button>
          </div>
     
          <div className="flex my-4">
            <input
              type="text"
              className="border w-full shadow-sm rounded-lg p-2"
              placeholder="Add Login"
              value={newLogin}
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
    <Footer/></>
  );
}

export default App;
