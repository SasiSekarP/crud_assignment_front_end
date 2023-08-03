import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const url1 = "http://localhost:4000/sendhomepagedata";

const HomePage = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const fetchFn = async () => {
    const option1 = {
      headers: {
        authorization: token,
      },
    };
    const response = await fetch(url1, option1);
    const data = await response.json();
    setTasks(data.arr);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchFn();
  }, []);

  const deletetask = async (id) => {
    const url2 = `http://localhost:4000/deletethisdata/${id}`;

    const option2 = {
      headers: {
        authorization: token,
      },
      method: "DELETE",
    };

    const response = await fetch(url2, option2);

    const data = await response.json();

    if (data.status === "success") {
      fetchFn();
    }
  };

  return (
    <div className="home">
      <div className="headingdiv">
        <h1>Task Manager</h1>
      </div>
      <div className="newtaskbtncontainer">
        <Link to="/addnewtask" className="newtaskbtn">
          New Task
        </Link>
      </div>
      <div className="cardcontainer">
        {tasks.length > 0 &&
          tasks.map((data) => {
            return (
              <div key={data._id} className="taskCard">
                <div>Title :</div>
                <h2>{data.title}</h2>
                <div>Description:</div>
                <div className="description">{data.description}</div>
                <div>Status:</div>
                <div className="description">{data.status}</div>
                <div className="homepagebtncontainer">
                  <Link className="cardbtn" to={`/edittask/${data._id}`}>
                    <FaEdit />
                  </Link>
                  <button
                    className="cardbtn"
                    type="button"
                    onClick={() => {
                      deletetask(data._id);
                    }}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        {tasks.length === 0 && (
          <div className="notaskcard">
            <div className="newtaskbtncontainer">
              There is no task Right now.
              <Link to="/addnewtask" className="newtaskbtn">
                Add New Task
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
