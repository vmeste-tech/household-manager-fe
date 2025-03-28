import CustomButton from "../Universal/CustomButton";
import PropTypes from "prop-types";

const AvatarDisplay = ({ avatarUrl, onUploadClick, onDeleteClick }) => {
  // Default SVG avatar if no avatar is provided
  const defaultAvatarSvg = (
    <svg
      className="w-16 h-16 rounded-full bg-blue-100 p-2"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
        fill="#6366F1"
      />
      <path
        d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z"
        fill="#6366F1"
      />
    </svg>
  );

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
      ) : (
        defaultAvatarSvg
      )}
      <CustomButton text="Загрузить" variant="filled" onClick={onUploadClick} />
      <CustomButton
        text="Удалить"
        variant="outlined"
        onClick={onDeleteClick}
        disabled={!avatarUrl}
      />
    </div>
  );
};
AvatarDisplay.propTypes = {
  avatarUrl: PropTypes.string,
  onUploadClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default AvatarDisplay;
