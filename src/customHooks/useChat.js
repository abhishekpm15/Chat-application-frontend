import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import io from "socket.io-client";
var socket;

const useChat = (friend) => {
  console.log("friend list", friend);
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
  }, [friend.id]);

  useEffect(() => {
    socket.on("message_received", (newMessageReceived) => {
      console.log("This is the new message that you got", newMessageReceived);
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
  return {
    socketConnected,
    open,
    setOpen,
    message,
    setMessage,
    text,
    setText,
    setSocketConnected,
    ref,
    handleChatClick,
    handleTextAreaChange,
    handleTextSend,
  };
};

export default useChat;
