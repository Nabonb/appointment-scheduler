// import React, { useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { db } from "../../firebase/firebase.config";
// import { collection, addDoc } from "firebase/firestore";
// import { AuthContext } from "../../providers/AuthProvider";

// const ScheduleAppointment = () => {
//   const { participantId } = useParams(); // Retrieve participantId from URL
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!participantId) {
//       console.error("Error: participantId is undefined");
//       return;
//     }

//     try {
//       await addDoc(collection(db, "appointments"), {
//         schedulerId: user?.uid,
//         participantId,
//         title,
//         description,
//         date,
//         time,
//       });
//       navigate("/appointments");
//     } catch (error) {
//       console.error("Error scheduling appointment: ", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Schedule an Appointment</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block mb-2">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="input input-bordered w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="textarea textarea-bordered w-full"
//             required
//           ></textarea>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Date</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="input input-bordered w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Time</label>
//           <input
//             type="time"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//             className="input input-bordered w-full"
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary w-full">Schedule Appointment</button>
//       </form>
//     </div>
//   );
// };

// export default ScheduleAppointment;

import React, { useState, useContext } from "react";
import { db } from "../../firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const ScheduleAppointment = () => {
  const { participantId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "appointments"), {
        schedulerId: user.uid,
        participantId,
        title,
        description,
        date,
        time,
        status: "pending", // Initial status
      });
      await addDoc(collection(db, "appointments"), {
        schedulerId: participantId,
        participantId: user.uid,
        title,
        description,
        date,
        time,
        status: "pending", // Initial status
      });
      navigate("/appointments");
    } catch (error) {
      console.error("Error scheduling appointment: ", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Schedule Appointment</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Schedule Appointment
        </button>
      </form>
    </div>
  );
};

export default ScheduleAppointment;

