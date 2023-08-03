import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const [err, setErr] = useState(null);
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const url = "http://localhost:4000/sendtaskdetails";

  const option = {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(userDetails),
  };

  const valueUpdata = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const loginHanddle = async (e) => {
    e.preventDefault();
    if (userDetails.username && userDetails.password) {
      setErr(null);
      setUserDetails({
        username: "",
        password: "",
      });
      const response = await fetch(url, option);
      const data = await response.json();
      if (data.status === "fail") {
        setErr(data.err);
      }
      if (data.status === "success") {
        setErr(null);
        Cookies.set("token", data.token, { expires: 1 });
        navigate("/", { replace: true });
      }
    } else {
      setErr(
        "Username and Password are mandatory details to log in. Please fill both."
      );
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate, token]);

  return (
    <form className="loginForm" onSubmit={loginHanddle}>
      <h1 className="loginheader">Login</h1>
      <div className="loginlablerow">
        <label>User Name</label>
      </div>
      <div className="loginlablerow">
        <input
          className="logininput"
          placeholder="User Name"
          type="text"
          id="username"
          name="username"
          value={userDetails.username}
          onChange={(e) => {
            valueUpdata(e);
          }}
        ></input>
      </div>
      <div className="loginlablerow">
        <label>Password</label>
      </div>
      <div className="loginlablerow">
        <input
          className="logininput"
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          value={userDetails.password}
          onChange={(e) => {
            valueUpdata(e);
          }}
        ></input>
      </div>
      {err && <div className="errmsg">{err}</div>}
      <div className="loginlablerow">
        <button type="submit" className="loginBtn">
          Log in
        </button>
      </div>
      <div className="loginlablerow2">
        Need to create an account ? <Link to="/signup">Sign Up</Link>
      </div>
    </form>
  );
};

export default Login;
