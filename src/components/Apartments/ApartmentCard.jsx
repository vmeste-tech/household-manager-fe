const ApartmentInfo = () => {
  // Объект с информацией о квартире
  const apartmentInfo = {
    name: "Квартира на Ленина",
    address: "ул. Ленина, 10, кв. 25",
  };

  return (
    <div className="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl p-6 animate-fade-in">
      <div className="text-4xl md:text-5xl text-blue-900">
        {apartmentInfo.name}
      </div>
      <span className="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-indigo-800">
        {apartmentInfo.address}
      </span>
    </div>
  );
};

export default ApartmentInfo;
