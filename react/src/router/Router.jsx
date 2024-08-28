import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/commonpages/Landing";
import App from "../App.jsx";
import About from "../pages/commonpages/About.jsx";
import Contact from "../pages/commonpages/Contact.jsx";
import Login from "../components/common/Login.jsx";
import UserRegister from "../components/common/UserRegister.jsx";
import HirerRegister from "../components/common/HirerRegister.jsx";
import Jobs from "../pages/userpages/Jobs.jsx";
import AdminDashboard from "../pages/adminpages/AdminDashboard.jsx";
import Dashboard from "../components/admin/sections/Dashboard.jsx";
import Userslist from "../components/admin/Userslist.jsx";
import Joblist from "../components/admin/Joblist.jsx";
import Recruiterslist from "../components/admin/Recruiterslist.jsx";
import Applicationlist from "../components/admin/Applicationlist.jsx";
import AdminProfile from "../components/admin/AdminProfile.jsx";
import AdminSettings from "../components/admin/AdminSettings.jsx";
import Candidates from "../pages/hirerpages/Candidates.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import NotAuthorized from "../pages/commonpages/NotAuthorized.jsx";
import HirerDashboard from "../pages/hirerpages/HirerDashboard.jsx";
import HirerProfile from "../components/recruiter/HirerProfile.jsx";
import NotFound from "../pages/commonpages/NotFound.jsx";
import Ide from "../pages/userpages/Ide.jsx";
import Chat from "../pages/Chat/Chat.jsx";
import PostJob from "../components/recruiter/PostJob.jsx";
import MyApplications from "../components/recruiter/MyApplications.jsx";
import MyJobs from "../components/recruiter/MyJobs.jsx";
import SingleJob from "../pages/SingleJob.jsx";
import Profile from '../components/common/profile/Profile.jsx'
import UserProfile from "../components/common/profile/UserProfile.jsx";
import UserDashboard from "../pages/userpages/UserDashboard.jsx";
import RecDashboard from "../components/recruiter/sections/RecDashboard.jsx";
import AppliedJobs from "../components/user/AppliedJobs.jsx";
import UserDash from "../components/user/UserDash.jsx";
import MyJobApplications from "../components/recruiter/sections/MyJobApplications.jsx";
import Meeting from "../components/common/Meeting.jsx";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/userRegistration", element: <UserRegister /> },
  { path: "/hirerRegistration", element: <HirerRegister /> },
  {
    path: "/user",
    element: <UserDashboard />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute requiredRole="USER">
          <UserDash/>
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute requiredRole="USER">
           < UserProfile/>
          </ProtectedRoute>
        ),
      },
      {
        path: "appliedobs",
        element: (
          <ProtectedRoute requiredRole="USER">
            <AppliedJobs/>
          </ProtectedRoute>
        ),
      },
    ]
  },

  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/jobs", element: <Jobs /> },
      { path: "/compiler", element: <Ide /> },
      { path: "/user/profile", element:<ProtectedRoute requiredRole="USER"><UserProfile/></ProtectedRoute>  },
      {
        path:"/jobdetail/:id",
        element: (
          <ProtectedRoute requiredRole="USER">
            <SingleJob />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path:"/userdetail/:id",
        element: (
          <ProtectedRoute requiredRole="RECRUITER">
            <Profile />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/message/user",
        element: (
          <ProtectedRoute requiredRole="USER">
            <Chat />
          </ProtectedRoute>
        ),
      },
      {
        path: "/message/recruiter",
        element: (
          <ProtectedRoute requiredRole="RECRUITER">
            <Chat />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute requiredRole="ADMIN">
            <Dashboard />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedRoute requiredRole="ADMIN">
            <Userslist />
          </ProtectedRoute>
        ),
      },
      {
        path: "recruiters",
        element: (
          <ProtectedRoute requiredRole="ADMIN">
            <Recruiterslist />
          </ProtectedRoute>
        ),
      },
      {
        path: "jobs",
        element: (
          <ProtectedRoute requiredRole="ADMIN">
            <Joblist />
          </ProtectedRoute>
        ),
      },
      {
        path: "applications",
        element: (
          <ProtectedRoute requiredRole="ADMIN">
            <Applicationlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute requiredRole="ADMIN">
            <AdminProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute requiredRole="ADMIN">
            <AdminSettings />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/recruiter",
    element: <App />,
    children: [
      {
        path: "home",
        element: (
          <ProtectedRoute requiredRole="RECRUITER">
            <Landing />
          </ProtectedRoute>
        ),
      },
      {
        path: "candidates",
        element: (
          <ProtectedRoute requiredRole="RECRUITER">
            <Candidates />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/recruiter",
    element: <HirerDashboard />,
    children: [
      {
        path: "profile",
        element: (
          <ProtectedRoute requiredRole="RECRUITER">
            <HirerProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "myjobs",
        element: (
          <ProtectedRoute requiredRole="RECRUITER">
            <MyJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "myapplications",
        element: (
          <ProtectedRoute requiredRole="RECRUITER">
            <MyApplications />
          </ProtectedRoute>
        ),
      },
      {
        path: "postjob",
        element: (
          <ProtectedRoute requiredRole="RECRUITER">
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "jobapplications/:id",
        element: (
          <ProtectedRoute requiredRole="RECRUITER">
            <MyJobApplications />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/room/:roomId", element: <Meeting/> },
  { path: "/noauthorization", element: <NotAuthorized /> },
  { path: "/pagenotfound", element: <NotFound /> },

]);

export default router;
