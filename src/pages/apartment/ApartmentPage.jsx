import { useState, useEffect } from "react";
import AddUserButton from "../../components/Apartments/AddUserButton";
import ApartmentInfo from "../../components/Apartments/ApartmentCard";
import UserTable from "../../components/Apartments/UserTable";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import { userApi } from "../../api";

// Updated default avatar as Base64 SVG with blue background to match header
const defaultAvatarSvg = "data:image/svg+xml;base64," + btoa('<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="#EBF5FF"/><g transform="translate(8, 8)"><path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#6366F1"/><path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="#6366F1"/></g></svg>');

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
          firstName:  user.name,
          lastName: user.lastname,
          photo: user.photoUrl || defaultAvatarSvg,
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

  if (loading) {
    return (
      <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
        <DashboardHeader />
        <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8 items-center justify-center">
          <div className="text-lg">Loading apartment data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
        <DashboardHeader />
        <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8 items-center justify-center">
          <div className="text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8">
        <ApartmentInfo apartmentData={apartmentData} />
        <UserTable users={users} />
        <div className="flex justify-center">
          <AddUserButton />
        </div>
      </div>
    </div>
  );
}

export default ApartmentPage;
