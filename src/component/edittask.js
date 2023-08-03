import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditTask = () => {
  const _id = useParams().id;
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const [err, setErr] = useState(null);

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
    _id: "",
  });

  const url1 = `http://localhost:4000/singletaskdata/${_id}`;

  const option1 = {
    headers: {
      authorization: token,
    },
  };

  const url2 = `http://localhost:4000/updatethisdata/${_id}`;

  const option2 = {
    headers: {
      authorization: token,
      "content-type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(task),
  };

  const fetchFn = async () => {
    const response = await fetch(url1, option1);
    const data = await response.json();
    setTask(data);
  };

  useEffect(() => {
    fetchFn();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.title && task.description && task.status) {
      setErr(null);
      const response = await fetch(url2, option2);
      const data = await response.json();
      if (data.status === "success") {
        navigate("/");
      }
    } else {
      setErr("All fields are mandatory to update task");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  const updatevalue = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setTask({ ...task, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="home addcontainerscreen">
      <div className="headingdiv">
        <h1>Edit Task</h1>
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
          value={task.title}
          className="addnewtaskinput"
          id="title"
          name="title"
          onChange={(e) => {
            updatevalue(e);
          }}
        />
        <div className="loginlablerow">
          <label>Description :</label>
        </div>
        <input
          placeholder="Enter Description"
          className="addnewtaskinput"
          value={task.description}
          id="description"
          name="description"
          onChange={(e) => {
            updatevalue(e);
          }}
        />
        <div className="loginlablerow">
          <label>Status :</label>
        </div>
        <input
          placeholder="Enter Status"
          className="addnewtaskinput"
          value={task.status}
          id="status"
          name="status"
          onChange={(e) => {
            updatevalue(e);
          }}
        />
        {err && <div className="errmsg">{err}</div>}
        <div className="homepagebtncontainer">
          <button className="newtaskbtn">Update</button>
        </div>
      </div>
    </form>
  );
};

export default EditTask;
