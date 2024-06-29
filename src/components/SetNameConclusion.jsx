import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import {
  postSubTabConclusionList,
  postSubTabConclusionListTemp,
  putSubTabConclusionList,
  putSubTabConclusionListTempStatus,
  postSubTabConclusionListEdsTemp,
} from "../actions/chatApi";

const SetNameConclusion = ({
  handleSetNameConclusion,
  filteredConclusionListTemp,
}) => {
  const Dispatch = useDispatch();
  const subUserChatTabsById = useSelector(
    (store) => store.chat.subUserChatTabsById
  );
  const invitedToSubChatTabs = useSelector(
    (store) => store.chat.invitedToSubChatTabs
  );
  const subTabConclusionList = useSelector(
    (store) => store.chat.subTabConclusionList
  );

  const [value, setValue] = useState("");

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  const filterInvitedTabId =
    Array.isArray(invitedToSubChatTabs) &&
    invitedToSubChatTabs.filter(
      (e) =>
        e.userAuthId === accessLogin.id &&
        subUserChatTabsById[0]?.id === e.subUserChatTabId
    );

  // ==========================

  const users = useSelector((store) => store.chat.users);

  const subTabConclusionListEdsTemp = useSelector(
    (store) => store.chat.subTabConclusionListEdsTemp
  );

  const filteredConclusionList =
    Array.isArray(subTabConclusionList) &&
    subTabConclusionList.filter(
      (e) => e.userAuthId === accessLogin.id && e.status === true
    );

  const filteredCurrentMember = users.filter(
    (e) => e.userAuthId === accessLogin.id
  );

  // ===========================

  const handlePostSubTabConclusionList = () => {
    const newObj = {
      id: Date.now().toString(),
      title: value,
      invitedToSubChatTabId:
        filterInvitedTabId.length > 0 ? filterInvitedTabId[0]?.id : null,
      subUserChatTabId: subUserChatTabsById[0]?.id,
      status: true,
      login: accessLogin.login,
      userAuthId: accessLogin.id,
      userChatId: subUserChatTabsById[0]?.userChatId,
    };
    for (let key of subTabConclusionList) {
      if (key.status) {
        Dispatch(putSubTabConclusionList({ ...key, status: false }));
      }
    }
    Dispatch(postSubTabConclusionList(newObj));
  };

  const handlePostSubTabConclusionListTemp = () => {
    const conclusionListTemp = {
      ...filteredConclusionList[0],
      subTabConclusionListId: filteredConclusionList[0]?.id,
      title: "V1",
      image: filteredCurrentMember[0]?.image,
      statusTemp: true,
      text: "",
      id: Date.now().toString(),
    };
    for (let key of subTabConclusionList) {
      if (key.status) {
        Dispatch(
          putSubTabConclusionListTempStatus({ ...key, statusTemp: false })
        );
      }
    }
    Dispatch(postSubTabConclusionListTemp(conclusionListTemp));

    // Добавляем создателя заключение в список подписей

    const newObj = {
      id: Date.now().toString(),
      subTabConclusionListId: filteredConclusionList[0]
        ? filteredConclusionList[0]?.id
        : null,
      userAuthId: filterInvitedTabId[0]?.userAuthId,
      comments: "",
      status: false,
      edsStatus: false,
      name: filterInvitedTabId[0]?.name,
      role: filterInvitedTabId[0]?.role,
      image: filterInvitedTabId[0]?.image,
      subTabConclusionListTempId: filteredConclusionListTemp[0]?.id,
    };

    console.log(filteredConclusionListTemp, newObj);

    Dispatch(postSubTabConclusionListEdsTemp(newObj));
    // ====================

    handleSetNameConclusion(false);
  };

  return (
    <div
      onClick={() => handleSetNameConclusion(false)}
      className="fixed w-full h-full top-0 left-0 z-10"
    >
      <form
        onClick={(event) => event.stopPropagation()}
        className="absolute bg-[#fff] flex flex-col gap-5 w-[30%] shadow-lg border-[1px] translate-x-[-25%] translate-y-[-50%] top-1/2 left-1/2 p-[20px]"
      >
        <p className="font-[600]">Новое заключение</p>
        <input
          onChange={(event) => setValue(event.target.value)}
          value={value}
          type="text"
          placeholder="Введите название заключение"
          className="border-b-[1px] border-[#000] outline-none"
        />
        <div className="wrapper-buttons flex justify-end">
          <div className="buttons flex gap-5">
            <Button
              onClick={() => handleSetNameConclusion(false)}
              variant="text"
              sx={{ textTransform: "none" }}
            >
              Отмена
            </Button>
            <Button
              onClick={() => {
                handlePostSubTabConclusionList();
              }}
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              Создать
            </Button>
            <Button
              onClick={() => {
                handlePostSubTabConclusionListTemp();
              }}
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SetNameConclusion;
