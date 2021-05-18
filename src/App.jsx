import "./App.css";
import { useState } from "react";

function App() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");
  const [cancelled, setCancelled] = useState([]);
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {days[new Date().getDay()]} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDos.text}
          onChange={(e) => {
            setToDo({
              id: Date.now(),
              text: e.target.value,
              status: false,
              deleted: false,
            });
          }}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i
          className="fas fa-plus"
          onClick={() => {
            setToDos([...toDos, toDo]);
          }}
        ></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => {
          if (obj.deleted !== true) {
            return (
              <div key={obj.id} className="todo">
                <div className="left">
                  <input
                    onChange={(e) => {
                      setToDos(
                        toDos.filter((toDoItem) => {
                          if (toDoItem.id === obj.id) {
                            toDoItem.status = e.target.checked;
                          }
                          return toDoItem;
                        })
                      );
                    }}
                    value={obj.status}
                    className="strike-through"
                    type="checkbox"
                    name=""
                    id=""
                  />
                  <p>{obj.text}</p>
                </div>
                <div className="right">
                  <i
                    className="fas fa-times"
                    onClick={() => {
                      setToDos(
                        toDos.filter((toDoItem) => {
                          if (toDoItem.id === obj.id) {
                            toDoItem.deleted = true;
                            !toDoItem.status &&
                              setCancelled([...cancelled, toDoItem.text]);
                          }
                          return toDoItem;
                        })
                      );
                    }}
                  ></i>
                </div>
              </div>
            );
          }
          return null
        })}
        <div className="history">
          <h3>Active Tasks</h3>
          {toDos.map((obj) => {
            if (obj.status !== true && obj.deleted !== true) {
              return <p key={obj.id} >{obj.text}</p>;
            }
            return null
          })}
        </div>
        <div className="history">
          <h3>Completed Tasks</h3>
          {toDos.map((obj) => {
            if (obj.status === true) {
              return <p key={obj.id}>{obj.text}</p>;
            }
            return null
          })}
        </div>
        <div className="history">
          <h3>Cancelled Tasks</h3>
          {cancelled.map((obj) => {
            return <p key={obj.id}>{obj}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
