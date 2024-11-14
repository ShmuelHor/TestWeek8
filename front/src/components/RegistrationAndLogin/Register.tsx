import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/hoekForm";
import {
  fetchRegisterUserIDF,
  fetchRegisterUser,
} from "../../store/features/User/usersSlice";
import { useAppDispatch } from "../../store/hook";
import "./Form.css";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
  organization: string;
  location: string;
}

const Register = () => {
  const { formData, handleChange, handleReset } = useForm<FormData>({
    username: "",
    password: "",
    organization: "",
    location: "",
  });
  const navigate = useNavigate();

  const [isFDI, setIsFDI] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (formData.organization === "IDF") {
      setIsFDI(true);
    } else {
      setIsFDI(false);
    }
  }, [formData.organization]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isFDI) {
      await dispatch(
        fetchRegisterUserIDF({
          username: formData?.username,
          password: formData?.password,
          organization: formData?.organization,
          location: formData?.location,
        })
      );
    } else {
      await dispatch(
        fetchRegisterUser({
          username: formData?.username,
          password: formData?.password,
          organization: formData?.organization,
        })
      );
    }
    handleReset();
    navigate("/");
  }
  const aaa = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(isFDI);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} onReset={handleReset} className="form">
        <h2>Register</h2>

        <div className="form-group">
          <label>Name:</label>
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter a username"
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter a password"
            required
          />
        </div>

        <div className="form-group">
          <label>Organization:</label>
          <select
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
          >
            <option value="">Organization</option>
            <option value="IDF">IDF</option>
            <option value="Hezbollah">Hezbollah</option>
            <option value="Hamas">Hamas</option>
            <option value="IRGC">IRGC</option>
            <option value="Houthis">Houthis</option>
          </select>
        </div>

        {isFDI && (
          <div className="form-group">
            <label>Location:</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            >
              <option value="">Location</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="Center">Center</option>
              <option value="West Bank">West Bank</option>
            </select>
          </div>
        )}

        <div className="form-actions">
          <button type="reset">Reset</button>
          <Link to={"/"}>
            <button className="login-button">To Login</button>
          </Link>

          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
