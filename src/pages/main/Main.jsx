import { useState, useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import { userApi } from "../../api";

const Main = () => {
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userApi.findApartmentByUser((error, data) => {
      setLoading(false);
      if (error) {
        console.error("Ошибка получения квартиры:", error);
      } else {
        setApartment(data);
        if (data?.apartmentId) {
          localStorage.setItem("apartmentId", data.apartmentId);
        }
      }
    });
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <Dashboard apartment={apartment} />
    </div>
  );
};

export default Main;
