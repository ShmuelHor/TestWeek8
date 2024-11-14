import React from "react";
import { useForm } from "../../hooks/hoekForm";
import { fetchLoginUser } from "../../store/features/User/usersSlice";
import { useAppDispatch } from "../../store/hook";
import "./Form.css";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
}

const Login = () => {
  const { formData, handleChange, handleReset } = useForm<FormData>({
    username: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await dispatch(
      fetchLoginUser({
        username: formData?.username,
        password: formData?.password,
      })
    );
    handleReset();
    navigate("/war");

  }
  return (
    <div className="container">
      <form
        className="form"
        onSubmit={(e) => handleSubmit(e)}
        onReset={handleReset}
      >
        <h2>Login</h2>
        <div className="form-group">
          <label>Username:</label>
          <input
            name="username"
            type="text"
            value={formData?.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={formData?.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-actions">
          <button type="reset" className="reset-button">
            Reset
          </button>
          <Link to="/register">
            <button className="register-button">To Register</button>
          </Link>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
