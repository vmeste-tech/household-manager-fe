import PropTypes from 'prop-types';

const ApartmentInfo = ({ apartmentData }) => {
  if (!apartmentData) {
    return (
      <div className="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl p-6 animate-pulse">
        <div className="h-8 bg-indigo-200 rounded w-3/4"></div>
        <div className="h-6 bg-indigo-200 rounded w-1/2 mt-8"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl p-6 animate-fade-in">
      <div className="text-4xl md:text-5xl text-blue-900">
        {apartmentData.name}
      </div>
      <span className="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-indigo-800">
        {apartmentData.address}
      </span>
    </div>
  );
};

ApartmentInfo.propTypes = {
  apartmentData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }),
};

export default ApartmentInfo;
