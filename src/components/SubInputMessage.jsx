import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { postSubMessage } from "../actions/chatApi";

import { IconButton } from "@mui/material";

import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import SendIcon from "@mui/icons-material/Send";

import MentionUsersChat from "./MentionUsersChat";

const SubInputMessage = () => {
  const Dispatch = useDispatch();

  const [showSend, setShowSend] = useState("");
  const arr = showSend.split("");

  const subUserChats = useSelector((store) => store.chat.subUserChats);
  const subChatById = useSelector((store) => store.chat.subChatById);

  const authedLogin = JSON.parse(localStorage.getItem("accessLogin"));

  let date = new Date();
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let time = `${hours}:${minutes}`;

  let newObj = {};

  Array.isArray(subUserChats) &&
    subUserChats.forEach((e) => {
      if (e.userAuthId === authedLogin.id) {
        newObj = { ...e };
      }
    });

  let message = {
    id: Date.now().toString(),
    subUserChatId: newObj.userAuthId,
    name: newObj.name,
    role: newObj.role,
    image: newObj.image,
    text: showSend,
    userAuthId: authedLogin.id,
    userChatId: newObj.userChatId,
    dateTime: time,
    replyMessage: {},
  };

  const handlePostSubMessage = () => {
    Dispatch(postSubMessage(message));
    setShowSend("");
  };

  return (
    <div className="input-message border-[2px] rounded-lg border-[#007fd2] p-[5px] w-full flex justify-between relative">
      <input
        value={showSend}
        onChange={(event) => setShowSend(event.target.value)}
        type="text"
        placeholder="Введите сообщение"
        className="w-full h-[100%] p-[15px] outline-none placeholder:text-[#00558e] placeholder:font-medium"
      />
      <div className="panel-submit flex items-center gap-2">
        <IconButton>
          <AddToDriveIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            if (
              subChatById[0]?.userAuthId === authedLogin.id
              // нужно дополнить условие для исполнителей Акрамшох Рамазоновича, к примеру для Бехруз Рамазоновича
            ) {
              handlePostSubMessage();
            }
          }}
        >
          <SendIcon
            className={`${showSend.length > 0 ? "text-[#007fd2]" : ""} `}
          />
        </IconButton>
      </div>
      {arr.includes("@") && <MentionUsersChat />}
    </div>
  );
};

export default SubInputMessage;