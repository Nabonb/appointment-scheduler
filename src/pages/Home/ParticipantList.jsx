// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { db } from "../../firebase/firebase.config";
// import { collection, getDocs } from "firebase/firestore";

// const ParticipantList = () => {
//   const [participants, setParticipants] = useState([]);

//   useEffect(() => {
//     const fetchParticipants = async () => {
//       const querySnapshot = await getDocs(collection(db, "users"));
//       const participantsData = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setParticipants(participantsData);
//     };

//     fetchParticipants();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Participants</h2>
//       <ul>
//         {participants.map(participant => (
//           <li key={participant.id} className="mb-2">
//             <Link to={`/schedule-appointment/${participant.id}`} className="text-blue-500">
//               {participant.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ParticipantList;
import React, { useState, useEffect, useContext } from "react";
import { db } from "../../firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const ParticipantList = () => {
  const [participants, setParticipants] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParticipants = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const participantsList = querySnapshot.docs
        .map(doc => ({ ...doc.data(), id: doc.id }))
        .filter(participant => participant.id !== user?.uid); // Exclude current user
      setParticipants(participantsList);
    };
    fetchParticipants();
  }, [user]);

  const handleSelectParticipant = (participantId) => {
    navigate(`/schedule-appointment/${participantId}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Participants</h2>
      <ul className="space-y-4">
        {participants.map(participant => (
          <li key={participant.id} className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">{participant.name}</h3>
            <button
              onClick={() => handleSelectParticipant(participant.id)}
              className="btn btn-primary mt-2"
            >
              Schedule Appointment
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;


