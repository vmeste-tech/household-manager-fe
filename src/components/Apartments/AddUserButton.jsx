import { useState } from "react";
import CustomButton from "../Universal/CustomButton";
import InviteCodeModal from "./InviteCodeModal";

const AddUserButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CustomButton
        text="+ Добавить жильца"
        variant="filled"
        onClick={() => setIsModalOpen(true)}
      />

      {isModalOpen && <InviteCodeModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default AddUserButton;
