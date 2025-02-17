import React, { useState } from "react";
import style from "./task.module.css";

function AddTask() {
  let [title, setTitle] = useState("");
  let [desc, setDesc] = useState("");

  let addtask = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:5000/api/addtask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, desc }),
    });
    let result = await response.json();
    console.log(result);
    alert(result);
    setTitle("");
    setDesc("");
  };

  return (
    <>
      <div className={style.container}>
        <form onSubmit={addtask}>
          <h1>Add Task here</h1>
          <div>
            <label>Title: </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label>Description: </label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            ></input>
          </div>
          <div className={style.btn}>
            <button type="submit">Add Task</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTask;
