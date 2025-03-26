const LoadingScreen = () => {
  return (
    <div className="relative flex flex-col sm:flex-row justify-center items-center w-screen h-screen gap-3 sm:gap-5 px-4">
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-md h-12 w-12 sm:h-16 sm:w-16 border-4 border-indigo-800"></div>
        <img
          src="https://img.icons8.com/pulsar-color/96/user-group-woman-woman.png"
          alt="Logo"
          className="rounded-full h-12 w-12 sm:h-14 sm:w-14 animate-horizontal-spin"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
