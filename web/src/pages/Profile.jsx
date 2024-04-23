import React, { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [id] = useState(localStorage.getItem("userId"));
  const [token] = useState(() => localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [userData, setUserData] = useState({});
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const wishItems = useSelector((state) => state.wishlist.wishItems);

  const [userFormData, setUserFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    municipality: "",
  });
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const response = await axios(`http://localhost:4300/api/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = response.data.data;
      console.log(response.data.data);
      setUserFormData({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        username: data.username,
        municipality: data.municipality,
      });
    } catch (error) {
      toast.error("Error: ", error.response);
    }
  };

  useEffect(() => {
    if (loginState) {
      getUserData();
    } else {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const putResponse = await axios.post(`http://localhost:4300/api/profile/edit`, 
        {
          first_name: userFormData.first_name,
          last_name: userFormData.last_name,
          email: userFormData.email,
          username: userFormData.username,
          municipality: userFormData.municipality,
        }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const putData = putResponse.data;
      console.log(putData);
    } catch (error) {
      console.error('Error updating profile:', error.response || error);
    }
  }

  return (
    <>
      <SectionTitle title={`${username} Profile`} />
      <form className="max-w-7xl mx-auto text-center px-10" onSubmit={updateProfile}>
        <div className="grid grid-cols-3 max-lg:grid-cols-1">
          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.first_name}
              onChange={(e) => {setUserFormData({...userFormData, first_name: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.last_name}
              onChange={(e) => {setUserFormData({...userFormData, last_name: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.email}
              onChange={(e) => {setUserFormData({...userFormData, email: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="tel"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.username}
              onChange={(e) => {setUserFormData({...userFormData, username: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Municipality</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.municipality}
              onChange={(e) => {setUserFormData({...userFormData, municipality: e.target.value})}}
            />
          </div>
          
        </div>
        <button
          className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white mt-10"
          type="submit"
        >
          Update Profile
        </button>
      </form>
    </>
  );
};

export default Profile;
