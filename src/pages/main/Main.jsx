import { useState, useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import DefaultApi from "../../generated-client-js/src/api/DefaultApi";
import apiClient from "../../api/setupApi";

const Main = () => {
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const defaultApi = new DefaultApi(apiClient);
    defaultApi.findApartmentByUser((error, data) => {
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
