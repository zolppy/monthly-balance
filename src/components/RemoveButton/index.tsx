import { useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { BiSolidTrashAlt } from "react-icons/bi";

const RemoveButton: React.FC = (): React.JSX.Element => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <button
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover ? (
        <BiSolidTrashAlt className="text-2xl" />
      ) : (
        <BiTrashAlt className="text-2xl" />
      )}
    </button>
  );
};

export default RemoveButton;
