const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:px-8">
      {/* Total Member */}
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-green-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M11 13.5H5A1.5 1.5 0 0 1 3.5 12V4A1.5 1.5 0 0 1 5 2.5h2.757a1.5 1.5 0 0 1 1.061.44l3.243 3.242a1.5 1.5 0 0 1 .439 1.06V12a1.5 1.5 0 0 1-1.5 1.5m2.121-8.379A3 3 0 0 1 14 7.243V12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h2.757a3 3 0 0 1 2.122.879L13.12 5.12ZM6.75 4.5a.75.75 0 0 0-.75.75v2h-.25a.75.75 0 0 0 0 1.5H6v.75h-.25a.75.75 0 0 0 0 1.5H6v.25a.75.75 0 0 0 1.5 0V11h.75a.75.75 0 0 0 0-1.5H7.5v-.75h.875a2.125 2.125 0 0 0 0-4.25zm1.625 2.75H7.5V6h.875a.625.625 0 1 1 0 1.25"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="px-4 text-gray-700">
          <div className="text-sm tracking-wider">Всего штрафов</div>
          <div className="text-3xl">43</div>
        </div>
      </div>

      {/* Total Post */}
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-blue-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            height="36"
            viewBox="0 0 36 36"
          >
            <path
              fill="currentColor"
              d="M21.6 29a1 1 0 0 0-1-1h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 1-1"
              className="clr-i-outline clr-i-outline-path-1"
            ></path>
            <path
              fill="currentColor"
              d="M22.54 24h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2"
              className="clr-i-outline clr-i-outline-path-2"
            ></path>
            <path
              fill="currentColor"
              d="M22 32h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2"
              className="clr-i-outline clr-i-outline-path-3"
            ></path>
            <path
              fill="currentColor"
              d="M32.7 32h-7a1 1 0 0 0 0 2h7a1 1 0 0 0 0-2"
              className="clr-i-outline clr-i-outline-path-4"
            ></path>
            <path
              fill="currentColor"
              d="M33.7 28h-7a1 1 0 0 0 0 2h7a1 1 0 0 0 0-2"
              className="clr-i-outline clr-i-outline-path-5"
            ></path>
            <path
              fill="currentColor"
              d="M33.74 26a28 28 0 0 0-2.82-10.12a20.24 20.24 0 0 0-6.32-7.17L27 3.42a1 1 0 0 0-.07-1a1 1 0 0 0-.8-.42H9.8a1 1 0 0 0-.91 1.42l2.45 5.31a20.33 20.33 0 0 0-6.28 7.15c-2.15 4-2.82 8.89-3 12.28a3.6 3.6 0 0 0 1 2.71a3.79 3.79 0 0 0 2.74 1.07H12V30H5.72a1.68 1.68 0 0 1-1.21-.52a1.62 1.62 0 0 1-.45-1.23c.14-2.61.69-7.58 2.76-11.45a18 18 0 0 1 6.26-6.8h1a30.81 30.81 0 0 0-1.87 2.92a22.78 22.78 0 0 0-1.47 3.34l1.37.92a24 24 0 0 1 1.49-3.47A29.1 29.1 0 0 1 16.05 10h1a21.45 21.45 0 0 1 1.41 5a22.54 22.54 0 0 1 .32 3.86l1.58-1.11a24.15 24.15 0 0 0-.32-3A24.82 24.82 0 0 0 18.76 10h.78l.91-2h-7.24l-1.85-4h13.21l-2.5 5.47a9.93 9.93 0 0 1 1.23.78a18.63 18.63 0 0 1 5.86 6.57A26.59 26.59 0 0 1 31.73 26Z"
              className="clr-i-outline clr-i-outline-path-6"
            ></path>
            <path fill="none" d="M0 0h36v36H0z"></path>
          </svg>
        </div>
        <div className="px-4 text-gray-700">
          <div className="text-sm tracking-wider">Оплаченные штрафы</div>
          <div className="text-3xl">23</div>
        </div>
      </div>

      {/* Total Comment */}
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-indigo-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462zM512 196.7l271.1 197.2H240.9zM264 462h117v374H264zm189 0h117v374H453zm307 374H642V462h118z"
            ></path>
          </svg>
        </div>
        <div className="px-4 text-gray-700">
          <div className="text-sm tracking-wider">Неоплаченные штрафы</div>
          <div className="text-3xl">20</div>
        </div>
      </div>

      {/* Server Load */}
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-red-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
            />
          </svg>
        </div>
        <div className="px-4 text-gray-700">
          <div className="text-sm tracking-wider">Общая сумма штрафов</div>
          <div className="text-3xl">234К</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
