import React, { useState, useEffect, useContext } from "react";
import { db } from "../../firebase/firebase.config";
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../providers/AuthProvider";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("upcoming");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      // Fetch appointments where the user is either the participant or scheduler
      const q = query(
        collection(db, "appointments"),
        where("participantId", "==", user?.uid)
        // Also include a condition for schedulerId if needed
      );
      const querySnapshot = await getDocs(q);
      const appointmentsList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setAppointments(appointmentsList);
    };
    fetchAppointments();
  }, [user]);

  const handleCancel = async (id) => {
    await deleteDoc(doc(db, "appointments", id));
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  const handleAccept = async (id) => {
    await updateDoc(doc(db, "appointments", id), { status: "accepted" });
    setAppointments(appointments.map(appointment =>
      appointment.id === id ? { ...appointment, status: "accepted" } : appointment
    ));
  };

  const handleDecline = async (id) => {
    await updateDoc(doc(db, "appointments", id), { status: "declined" });
    setAppointments(appointments.map(appointment =>
      appointment.id === id ? { ...appointment, status: "declined" } : appointment
    ));
  };

  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(`${appointment.date} ${appointment.time}`);
    const now = new Date();
    return filter === "upcoming"
      ? appointmentDate >= now
      : appointmentDate < now;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Appointments</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered border-gray-300 rounded-lg"
        >
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
      </div>
      <ul className="space-y-4">
        {filteredAppointments.map(appointment => (
          <li key={appointment.id} className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{appointment.title}</h3>
              <p className="text-gray-600"><strong>Date:</strong> {appointment.date}</p>
              <p className="text-gray-600"><strong>Time:</strong> {appointment.time}</p>
            </div>
            <p className="text-gray-700 mb-4"><strong>Description:</strong> {appointment.description}</p>
            {appointment.audioUrl && (
              <div className="mb-4">
                <strong>Audio Message:</strong>
                <audio src={appointment.audioUrl} controls className="w-full mt-2"/>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className={`badge ${appointment.status === "accepted" ? "badge-success" : appointment.status === "declined" ? "badge-error" : "badge-warning"}`}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
              <div className="flex space-x-2">
                {/* If the user is the scheduler */}
                {appointment.schedulerId === user.uid && appointment.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleCancel(appointment.id)}
                      className="btn btn-error btn-sm"
                    >
                      Cancel Appointment
                    </button>
                  </>
                )}
                {/* If the user is the participant */}
                {appointment.participantId === user.uid && appointment.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleAccept(appointment.id)}
                      className="btn btn-success btn-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDecline(appointment.id)}
                      className="btn btn-error btn-sm"
                    >
                      Decline
                    </button>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentsList;
