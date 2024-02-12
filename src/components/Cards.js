import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Modal } from "antd";
import { Textarea } from "@material-tailwind/react";
import useChat from "../customHooks/useChat";
// import Modals from "./Modals";

const Cards = ({ friend }) => {
  const {
    open,
    setOpen,
    message,
    text,
    ref,
    notificaton,
    setNotification,
    handleChatClick,
    handleTextAreaChange,
    handleTextSend,
  } = useChat(friend);
  console.log("use CHat notification", notificaton, open);

  return (
    <div>
      <Modal
        title={`Chat with ${friend.name}`}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <div className="min-h-[400px] max-h-[400px] mt-10 overflow-y-scroll scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-100 scrollbar-thumb-rounded-xl">
          <div className="flex flex-col h-full space-y-3 m-5">
            {text.map((messageItem, index) => (
              <div
                key={index}
                className={`mb-2 rounded-xl px-3 py-2 font-semibold ${
                  messageItem.sent
                    ? "text-right bg-yellow-200 max-w-sm self-end"
                    : "text-left bg-orange-200 max-w-fit"
                }`}
              >
                <div className="">{messageItem.text}</div>
              </div>
            ))}
          </div>
          <div ref={ref}></div>
        </div>

        <Textarea
          color="purple"
          label="Message"
          value={message}
          onChange={handleTextAreaChange}
        />
        <Button onClick={handleTextSend}>Send</Button>
      </Modal>{" "}
      <Card className="mt-6 w-72 shadow-2xl hover:scale-110 transition duration-300 ">
        <CardHeader color="blue-gray" className="relative h-48 w-38">
          <img
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            alt="card"
            className="h-48"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {friend?.name}
          </Typography>
          <Typography>{friend?.email}</Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <div className="flex space-x-1 justify-center">
            <Button onClick={handleChatClick}>CHAT</Button>
            {!open && notificaton && (
              <div className="bg-deep-orange-600 w-2 h-2 rounded-full"></div>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Cards;
