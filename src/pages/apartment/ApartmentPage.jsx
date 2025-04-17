import { useState, useEffect } from "react";
import AddUserButton from "../../components/Apartments/AddUserButton";
import ApartmentInfo from "../../components/Apartments/ApartmentCard";
import UserTable from "../../components/Apartments/UserTable";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import { userApi } from "../../api";

function ApartmentPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apartmentData, setApartmentData] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchApartmentData = async () => {
      setLoading(true);
      try {
        // Use callback-based API with promise wrapper
        const fetchData = () => {
          return new Promise((resolve, reject) => {
            userApi.findApartmentByUser((error, data) => {
              if (error) {
                reject(error);
              } else {
                resolve(data);
              }
            });
          });
        };
        
        const apartmentInfo = await fetchData();
        setApartmentData({
          name: apartmentInfo.name,
          address: apartmentInfo.address
        });
        
        // Transform user data to match your component's expected format
        const transformedUsers = apartmentInfo.users ? apartmentInfo.users.map(user => ({
          id: user.id,
          firstName: user.name,
          lastName: user.lastname,
          photo: user.photoUrl || "https://img.icons8.com/emoji/48/person.png",
          type: user.type,
          joinTime: user.joinedAt ? new Date(user.joinedAt).toISOString().split('T')[0] : "",
          status: user.status || "Активен"
        })) : [];
        
        setUsers(transformedUsers);
      } catch (err) {
        console.error("Error fetching apartment data:", err);
        setError("Failed to load apartment data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchApartmentData();
  }, []);

  const handleUserUpdate = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  if (loading) {
    return (
      <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
        <DashboardHeader />
        <div className="pt-20 max-w-7xl mx-auto flex flex-col gap-8 items-center justify-center">
          <div className="text-lg">Loading apartment data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
        <DashboardHeader />
        <div className="pt-20 max-w-7xl mx-auto flex flex-col gap-8 items-center justify-center">
          <div className="text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 max-w-7xl mx-auto flex flex-col gap-8">
        <ApartmentInfo apartmentData={apartmentData} />
        <UserTable users={users} onUserUpdate={handleUserUpdate} />
        <div className="flex justify-center">
          <AddUserButton />
        </div>
      </div>
    </div>
  );
}

export default ApartmentPage;
