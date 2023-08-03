import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Signup = () => {
  const [err, setErr] = useState(null);

  const token = Cookies.get("token");

  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    confirmpassword: "",
  });

  const updatevalue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const signupHanddle = async (e) => {
    e.preventDefault();
    if (
      userDetails.username &&
      userDetails.password &&
      userDetails.confirmpassword &&
      userDetails.password === userDetails.confirmpassword
    ) {
      setErr(null);
      const option = {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: userDetails.username,
          password: userDetails.password,
        }),
      };
      const url = "http://localhost:4000/signupdata";
      const response = await fetch(url, option);
      const data = await response.json();
      if (data.status === "fail") {
        setErr(data.err);
      }
      if (data.status === "success") {
        navigate("/login", { replace: true });
      }
    } else if (userDetails.password !== userDetails.confirmpassword) {
      setErr(`password and confirm password must match`);
    } else {
      setErr(
        "Username, Password and Confirm password are mandatory details to log in. Please fill both."
      );
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  return (
    <form className="loginForm" onSubmit={signupHanddle}>
      <h1 className="loginheader">Sign Up</h1>
      <div className="loginlablerow">
        <label>User Name</label>
      </div>
      <div className="loginlablerow">
        <input
          className="logininput"
          type="text"
          placeholder="User Name"
          name="username"
          id="username"
          value={userDetails.username}
          onChange={(e) => {
            updatevalue(e);
          }}
        ></input>
      </div>
      <div className="loginlablerow">
        <label>Password</label>
      </div>
      <div className="loginlablerow">
        <input
          className="logininput"
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          value={userDetails.password}
          onChange={(e) => {
            updatevalue(e);
          }}
        ></input>
      </div>
      <div className="loginlablerow">
        <label>Confirm Password</label>
      </div>
      <div className="loginlablerow">
        <input
          className="logininput"
          type="password"
          placeholder="Re-enter password"
          name="confirmpassword"
          id="confirmpassword"
          value={userDetails.confirmpassword}
          onChange={(e) => {
            updatevalue(e);
          }}
        ></input>
      </div>
      {err && <div className="errmsg">{err}</div>}
      <div className="loginlablerow">
        <button type="submit" className="loginBtn">
          Sign up
        </button>
      </div>
      <div className="loginlablerow2">
        Already have an account ? <Link to="/login">Login</Link>
      </div>
    </form>
  );
};

export default Signup;
