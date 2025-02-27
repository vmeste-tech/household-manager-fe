const InboxCard = () => {
  return (
    <div className="flex-1 bg-blue-100 border border-blue-200 rounded-xl p-6 animate-fade-in">
      <h2 className="text-4xl md:text-5xl text-blue-900">
        Уведомления <br />
        <strong>23</strong>
      </h2>
      <span className="no-underline inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-blue-800 hover:bg-blue-900 transition-transform duration-300 hover:scale-105">
        посмотреть уведомления
      </span>
    </div>
  );
};

export default InboxCard;
