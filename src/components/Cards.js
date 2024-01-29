import React, { useState, useEffect, useRef } from "react";
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
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
// import "./Cards.css";
import io from "socket.io-client";
var socket 


const Cards = ({ friend }) => {
  console.log('friend list', friend)
  const { user } = useAuth();
  const [socketConnected, setSocketConnected] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [text, setText] = useState([]);
  const ref = useRef();

  const ENDPOINT = "http://localhost:3001/";

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", friend.id);
    socket.on("connection", () => {
      setSocketConnected(true);
    });
  }, []);

  useEffect(() => {
    socket.on("message_received", (newMessageReceived) => {
      console.log("This is the new message that you got",newMessageReceived);
      setText([...text, { text: newMessageReceived, sent: false }]);
    });
  });

  useEffect(() => {
    if (text.length) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [text]);


  const handleChatClick = () => {
    setOpen(true);
    axios({
      method: "POST",
      url: "http://localhost:3001/message/get-messages",
      data: {
        sender_id: user.uid,
        friend_id: friend.id,
      },
    })
      .then((response) => {
        const result = response.data;
        if (Array.isArray(result)) {
          setText(result);
          socket.emit("join_chat", 1234);
          console.log(result);
        } else {
          console.log("Invalid response format:", result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleTextAreaChange = (e) => {
    setMessage(e.target.value);
  };

  const handleTextSend = () => {
    if (message === "") {
      toast.error("Messsage cannot be empty !");
    } else {
      setText([...text, { text: message, sent: true }]);
      console.log(text);

      axios({
        method: "POST",
        url: "http://localhost:3001/message/send-message",
        data: {
          sender_id: user.uid,
          friends: {
            id: friend.id,
            messages: {
              text: message,
              timestamps: new Date(),
              sent: true,
            },
          },
        },
      })
        .then((result) => {
          console.log("resdata", result.data);
          socket.emit("new_message", {
            user_id: user.uid,
            friend_id: friend.id,
            messages: {
              text: message,
              timestamps: new Date(),
              sent: true,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
      axios({
        method: "POST",
        url: "http://localhost:3001/message/send-message",
        data: {
          sender_id: friend.id,
          friends: {
            id: user.uid,
            messages: {
              text: message,
              timestamps: new Date(),
              sent: false,
            },
          },
        },
      })
        .then((result) => {
          console.log("resdata", result.data);
          setMessage("");
          handleChatClick();
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(message);
    }
  };
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
      </Modal>
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
          <Button onClick={handleChatClick}>CHAT</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Cards;
