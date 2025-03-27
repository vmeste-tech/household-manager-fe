import { useState } from "react";
import AddUserButton from "../../components/Apartments/AddUserButton";
import ApartmentInfo from "../../components/Apartments/ApartmentCard";
import UserTable from "../../components/Apartments/UserTable";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";

function ApartmentPage() {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "Иван",
      lastName: "Иванов",
      photo:
        "https://img.icons8.com/emoji/48/neutral-person-light-skin-tone.png",
      type: "Admin",
      joinTime: "2023-09-15",
      status: "Активен",
    },
    {
      id: 2,
      firstName: "Петр",
      lastName: "Петров",
      photo:
        "https://img.icons8.com/emoji/48/neutral-person-medium-light-skin-tone.png",
      type: "User",
      joinTime: "2023-09-10",
      status: "В отпуске",
    },
    {
      id: 3,
      firstName: "Сергей",
      lastName: "Сергеев",
      photo: "https://img.icons8.com/emoji/48/person.png",
      type: "User",
      joinTime: "2023-08-20",
      status: "Заболел",
    },
  ]);

  const handleUserUpdate = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 max-w-7xl mx-auto flex flex-col gap-8">
        <ApartmentInfo />
        <UserTable users={users} onUserUpdate={handleUserUpdate} />
        <div className="flex justify-center">
          <AddUserButton />
        </div>
      </div>
    </div>
  );
}

export default ApartmentPage;
