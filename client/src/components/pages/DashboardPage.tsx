import {useUser} from "../contexts/userContext.ts";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const {user, loading, error} = useUser();
  const navigate = useNavigate();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  if (!user) {
    // TODO: ON RELEASE, NAVIGATE TO /
    navigate("/indev");
  }
  
  // TODO: Work on dashboard page
  return (
    <div>
      <img src={user?.avatarURL} alt="User Avatar" />
      <h1>Welcome, {user?.username}!</h1>
    </div>
  )
}

export default DashboardPage;