import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Home = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {user?<div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Appointment Scheduler
        </h1>
        <div className="space-y-6">
          <Link
            to="/participants"
            className="block w-full text-lg py-3 text-black bg-sky-100 hover:bg-sky-200 hover:text-black rounded-lg text-center"
          >
            View Participants
          </Link>
          <Link
            to="/appointments"
            className="block w-full text-lg py-3 text-black bg-sky-100 hover:bg-sky-200 hover:text-black rounded-lg text-center"
          >
            View Appointments
          </Link>
        </div>
      </div>: navigate('/login')}
    </div>
  );
};

export default Home;
