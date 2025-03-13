import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import NotificationSettings from "../../components/Profile/NotificationSettings";
import AccountSettings from "../../components/Profile/ProfileSettings";

function ProfilePage() {
  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <AccountSettings />
        <NotificationSettings />
      </div>
    </div>
  );
}

export default ProfilePage;