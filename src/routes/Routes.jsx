import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import UserDirectory from "../pages/Home/UseDirectory";
import ScheduleAppointment from "../pages/Home/ScheduleAppointment";
import AppointmentsList from "../pages/Home/AppointmentList";
import ParticipantList from "../pages/Home/ParticipantList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/users',
        element:<UserDirectory></UserDirectory>
      },
      {
        path:"/participants", 
        element:<ParticipantList />
      },
      {
        path:"/schedule-appointment/:participantId",
        element:<ScheduleAppointment />
      },
      {
        path:"/appointments",
        element:<AppointmentsList />
      }

    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
]);
