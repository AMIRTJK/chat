import React, { useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreVert from "./MoreVert";
import { useDispatch } from "react-redux";

const ChatUser = ({ item, handlePutUserChatStatus }) => {
  const Dispatch = useDispatch();

  const { id, name, image, role, status } = item;

  const newObj = {
    id: id,
    name: name,
    image: image,
    role: role,
    status: true,
  };

  const [showMoreVert, setShowMoreVert] = useState(false); // Локальное состояние для каждого ChatUser

  const handleShowMoreVert = () => {
    setShowMoreVert(!showMoreVert);
  };

  return (
    <div
      onClick={() => {
        handlePutUserChatStatus(newObj);
      }}
      className={`${
        item.status ? "bg-[#007cd2]" : "bg-[#f9f9f9]"
      } wrapper-chat  shadow-lg border-[1px] rounded-lg w-full p-[15px] hover:bg-[#007cd2] cursor-pointer transition-all duration-100`}
    >
      <header className="flex justify-between items-center">
        <div className="user-info flex items-center gap-2">
          <Avatar src={image} sx={{ border: "1px solid #fff" }} />
          <p
            className={`${
              item.status ? "text-[#f9f9f9]" : "text-[#007cd2]"
            } font-[500]`}
          >
            {name}
          </p>
        </div>
        <div className="panel-control relative">
          <IconButton onClick={() => handleShowMoreVert()}>
            <MoreVertIcon
              className={`${item.status ? "text-[#f9f9f9]" : ""} more-vert`}
            />
          </IconButton>
          {showMoreVert && <MoreVert id={id} />}
        </div>
      </header>
    </div>
  );
};

export default ChatUser;
