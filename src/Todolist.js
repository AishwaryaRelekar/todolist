import React, { useEffect, useState } from "react";
import style from "./todolist.module.css";

function Todolist() {
  const [tasks, setTasks] = useState([]);
  console.log(tasks);
  const [editTask, setEditTask] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchTask = async () => {
    let response = await fetch("http://localhost:5000/api/list");
    let result = await response.json();
    setTasks(result);
  };

  const deleteTask = async (taskid) => {
    const response = await fetch(`http://localhost:5000/delete/${taskid}`, {
      method: "DELETE",
    });
    let result = await response.json();
    console.log(result);
    fetchTask();
  };

  const updateTask = async (taskid) => {
    const response = await fetch(`http://localhost:5000/update/${taskid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskName, Description: description }),
    });

    setEditTask(null);
    setTaskName("");
    setDescription("");
    fetchTask();
  };

  const TaskStatus = async (taskid) => {
    const response = await fetch(`http://localhost:5000/completed/${taskid}`, {
      method: "PUT",
    });

    fetchTask();
  };
  useEffect(() => {
    fetchTask();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.Status === 1;
    if (filter === "Pending") return task.Status === 0;
    return true;
  });
  return (
    <>
      <div className={style.select}>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">ALl</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div className={style.container}>
        <div className={style.row}>
          {filteredTasks.length === 0 ? (
            <p>No task </p>
          ) : (
            filteredTasks.map((task) => (
              <div className={style.card} key={task.taskid}>
                <div className={style.status}>
                  <button
                    onClick={() => TaskStatus(task.taskid)}
                    style={{
                      backgroundColor:
                        task.Status === 1 ? "#28a745" : "#dc3545",
                    }}
                    disabled={task.Status === 1}
                  >
                    {task.Status === 1 ? "Completed" : "Pending"}
                  </button>
                </div>
                {editTask === task.taskid ? (
                  <div>
                    <input
                      type="text"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                      placeholder="Task Name"
                    />
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description"
                    />
                    <button
                      className="bg-primary"
                      onClick={() => updateTask(task.taskid)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-danger"
                      onClick={() => setEditTask(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3>{task.taskName}</h3>
                    <p className={style.p}>{task.Description}</p>
                    <p>
                      <b>Start Date:</b> {task.StartDate}
                    </p>
                    <p>
                      <b>End Date:</b> {task.EndDate}
                    </p>
                    <p>
                      <b>Duration:</b> {task.Duration} days
                    </p>
                    <button
                      onClick={() => {
                        setEditTask(task.taskid);
                        setTaskName(task.taskName);
                        setDescription(task.Description);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-danger"
                      onClick={() => deleteTask(task.taskid)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-success"
                      onClick={() => TaskStatus(task.taskid)}
                    >
                      Completed
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Todolist;
