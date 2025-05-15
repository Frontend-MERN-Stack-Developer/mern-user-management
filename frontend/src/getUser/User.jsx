import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import "./User.css";

const User = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add"); // Navigate to /add route
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:2600/api/users");
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:2600/api/delete/user/${id}`);
      const deleteUser = users.filter((users) => users._id !== id);
      setUsers(deleteUser);
    } catch (error) {
      console.log("user not deleted", error);
    }
  };

  return (
    <div className="userTable">
      <button onClick={handleClick} type="button" className="btn btn-primary">
        Add User <i className="fa-solid fa-user-plus"></i>
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td className="actionButtons">
                  <Link
                    to={`/update/` + user._id}
                    type="button"
                    className="btn btn-info"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
