import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AddNewTask = () => {
  const [err, setErr] = useState(null);

  const token = Cookies.get("token");

  const navigate = useNavigate();

  const url = "http://localhost:4000/addnewtask";

  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    status: "",
    _id: uuidv4(),
  });

  const option = {
    headers: {
      authorization: token,
      "content-type": "application/json",
    },
    body: JSON.stringify(taskDetails),
    method: "POST",
  };

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  const updatavalue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  const submithandler = async (e) => {
    e.preventDefault();

    if (taskDetails.title && taskDetails.description && taskDetails.status) {
      setErr(null);
      const response = await fetch(url, option);
      const data = await response.json();

      if (data.message === "there is no use") {
        setErr(data.message);
      } else {
        setErr(null);
        navigate("/", { replace: true });
      }
    } else {
      setErr("All fields are mandatory to add task");
    }
  };

  return (
    <form className="home addcontainerscreen" onSubmit={submithandler}>
      <div className="headingdiv">
        <h1>Add new Task</h1>
      </div>
      <div className="newtaskbtncontainer">
        <Link to="/" className="newtaskbtn">
          Back to Home
        </Link>
      </div>
      <div className="addcontainercard">
        <div className="loginlablerow">
          <label>Title :</label>
        </div>
        <input
          placeholder="Enter Title"
          value={taskDetails.title}
          id="title"
          name="title"
          className="addnewtaskinput"
          onChange={(e) => {
            updatavalue(e);
          }}
        />
        <div className="loginlablerow">
          <label>Description :</label>
        </div>
        <input
          placeholder="Enter Description"
          className="addnewtaskinput"
          value={taskDetails.description}
          id="description"
          name="description"
          onChange={(e) => {
            updatavalue(e);
          }}
        />
        <div className="loginlablerow">
          <label>Status :</label>
        </div>
        <input
          placeholder="Enter Status"
          className="addnewtaskinput"
          value={taskDetails.status}
          id="status"
          name="status"
          onChange={(e) => {
            updatavalue(e);
          }}
        />
        {err && <div className="errmsg">{err}</div>}
        <div className="homepagebtncontainer">
          <button className="newtaskbtn">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default AddNewTask;
