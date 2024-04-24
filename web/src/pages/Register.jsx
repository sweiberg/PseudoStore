import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionTitle } from "../components";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [country, setCountry] = useState("United States");

  const navigate = useNavigate();

  const isValidate = () => {
    if (username.trim() === "") {
      toast.warn("Please enter a username.");
      return false;
    }
    if (firstName.trim() === "") {
      toast.warn("Please enter your first name.");
      return false;
    }
    if (lastName.trim() === "") {
      toast.warn("Please enter your last name.");
      return false;
    }
    if (!email.includes('@')) {
      toast.warn("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      toast.warn("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.warn("Passwords do not match.");
      return false;
    }
    if (!birthdate) {
      toast.warn("Please enter your birthdate.");
      return false;
    }
    if (gender !== "M" && gender !== "F" && gender !== "Other") {
      toast.warn("Please select a valid gender.");
      return false;
    }
    if (municipality.trim() === "") {
      toast.warn("Please enter your municipality.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidate()) {
        // Formatting the birthdate to include a time component (at midnight)
        const formattedBirthdate = new Date(birthdate).toISOString();

        const registrationData = {
            username,
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            birthdate: formattedBirthdate,
            gender,
            municipality,
            country
        };

        fetch("http://localhost:4300/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registrationData),
        })
            .then((res) => {
                if (!res.ok) throw new Error('Failed to register');
                return res.json();
            })
            .then((data) => {
                toast.success("Registration Successful");
                navigate("/login");
            })
            .catch((err) => {
                toast.error("Registration Failed: " + err.message);
            });
    }
};

  return (
    <>
      <SectionTitle title="Register" />
      <div className="flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
            <form className="px-5 py-7" onSubmit={handleSubmit}>
              {/* Username */}
              <label className="font-semibold text-sm pb-1 block text-accent-content">Username</label>
              <input
                type="text"
                className="input input-bordered px-3 py-2 mt-1 mb-5 w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {/* First Name */}
              <label className="font-semibold text-sm pb-1 block text-accent-content">First Name</label>
              <input
                type="text"
                className="input input-bordered px-3 py-2 mt-1 mb-5 w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              {/* Last Name */}
              <label className="font-semibold text-sm pb-1 block text-accent-content">Last Name</label>
              <input
                type="text"
                className="input input-bordered px-3 py-2 mt-1 mb-5 w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {/* Email */}
              <label className="font-semibold text-sm pb-1 block text-accent-content">Email</label>
              <input
                type="email"
                className="input input-bordered px-3 py-2 mt-1 mb-5 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {/* Password */}
              <label className="font-semibold text-sm pb-1 block text-accent-content">Password</label>
              <input
                type="password"
                className="input input-bordered px-3 py-2 mt-1 mb-5 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Confirm Password */}
              <label className="font-semibold text-sm pb-1 block text-accent-content">Confirm Password</label>
              <input
                type="password"
                className="input input-bordered px-3 py-2 mt-1 mb-5 w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {/* Birthdate */}
              <label className="font-semibold text-sm pb-1 block text-accent-content">Birthdate</label>
              <input
                type="date"
                className="input input-bordered px-3 py-2 mt-1 mb-5 w-full"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
              {/* Gender */}
              <label className="font-semibold text-sm pb-1 block text-accent-content">Gender</label>
              <select
                className="input input-bordered px-3 py-2 mt-1 mb-5 w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="Other">Other</option>
              </select>
              {/* Municipality */}
              <label className="font-semibold text-sm pb-1 block text-accent-content">Municipality</label>
              <input
                type="text"
                className="input input-bordered px-3 py-2 mt-1 mb-5 w-full"
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
                required
              />
              {/* Country (preset to United States) */}
              {/* Submit Button */}
              <button
                type="submit"
                className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Register</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="py-5 text-center">
            <Link
              to="/login"
              className="btn btn-neutral text-white"
              onClick={() => window.scrollTo(0, 0)}
            >
              Already have an account? Please login.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;