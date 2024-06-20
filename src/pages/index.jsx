import LoginPage from "./LoginPage";
import DashboardPage from "./Dashboard";
import UserPage from "./AdminCompany/UserPage";
import AddUserPage from "./AdminCompany/AddUserPage";
import UnitPage from "./AdminCompany/UnitPage";
import AddUnitPage from "./AdminCompany/AddUnitPage";
import ProfileCompany from "./AdminCompany/ProfileCompany";
import UpdateCompany from "./SuperAdmin/UpdateCompany";
import LandingPage from "./LandingPage";
import CreateCompany from "./SuperAdmin/CreateCompany";
import ReadCompany from "./SuperAdmin/ReadCompany";
import DetailPresence from "./AdminCompany/DetailPresence";
import UpdateProfile from "./AdminCompany/UpdateProfile";
import DetailCompany from "./SuperAdmin/DetailCompany";
import DetailUnit from "./AdminCompany/DetailUnit";
import ForgotPassword from "./ForgotPassword";


export const commonPage = {
    landingpage: <LandingPage/>,
    loginPage: <LoginPage />,
    forgotpassword: <ForgotPassword/>,
  };

  
  export const privatePage = {
    dashboard: <DashboardPage />,
    userPage: <UserPage />,
    addUserPage: <AddUserPage/>,
    unitPage: <UnitPage/>,
    addUnitPage: <AddUnitPage/>,
    profilecompany: <ProfileCompany/>,
    UpdateProfile: <UpdateProfile/>,
    updatecompany: <UpdateCompany/>,
    createcompany: <CreateCompany/>,
    readcompany: <ReadCompany/>,
    detailpresence : <DetailPresence/>,
    detailcompany : <DetailCompany/>,
    detailunit : <DetailUnit/>



  };