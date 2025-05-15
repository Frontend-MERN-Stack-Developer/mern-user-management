import "./update.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const UpdateUser = () => {
  const userData = {
    name: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(userData);
  const navigate = useNavigate();
  const backArrow = () => {
    navigate("/");
  };
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setUser({ ...user, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:2600/api/update/user/${id}`,
        user
      );
      toast.success(response.data.message, { position: "top-right" });
      setUser(userData); // Reset form
      navigate("/");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong!", { position: "top-right" });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:2600/api/user/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="addUser">
      <button
        onClick={() => backArrow()}
        type="button"
        className="btn btn-secondary"
      >
        <i className="fa-solid fa-backward"></i> Back
      </button>

      <h3>Update User</h3>
      <form className="addUserForm" onSubmit={submitHandler}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={user.name}
            onChange={inputHandler}
            name="name"
            autoComplete="off"
            placeholder="Enter your Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={inputHandler}
            name="email"
            autoComplete="off"
            placeholder="Enter your Email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Address:</label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={inputHandler}
            name="password"
            autoComplete="off"
            placeholder="Enter your password"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
