import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useSearch } from "../context/SearchContext";
import useChat from "../customHooks/useChat";
import { Modal } from "antd";

const AddCard = ({ friendDetails }) => {
  const {
    open,
    setOpen,
    message,
    text,
    ref,
    handleChatClick,
    handleTextAreaChange,
    handleTextSend,
  } = useChat(friendDetails);

  const { userFriends } = useSearch();
  const [alreadyFriend, setAlreadyFriend] = useState(false);
  // console.log("friendDetails", friendDetails.id);
  const { user } = useAuth();
  // console.log("user ka friends hai bai", userFriends);

  useEffect(() => {
    const isAlreadyFriend = userFriends?.some(
      (friend) => friend.id === friendDetails.id
    );
    setAlreadyFriend(isAlreadyFriend);
  }, [friendDetails, userFriends]);

  const handleAddFriend = () => {
    if (user.uid !== friendDetails.id) {
      axios({
        method: "post",
        url: "http://localhost:3001/add-friends",
        data: {
          id: user.uid,
          friends: {
            id: friendDetails.id,
            email: friendDetails.email,
            name: friendDetails.name,
          },
        },
      })
        .then((result) => {
          if (result.status === 201) {
            // console.log(result.data);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            // console.log(result.data);
            toast.error(result.data);
          }
        })
        .catch((err) => {
          // console.log(err);
        });

      axios({
        method: "post",
        url: "http://localhost:3001/add-friends",
        data: {
          id: friendDetails.id,
          friends: {
            id: user.uid,
            email: user.email,
            name: user.displayName,
          },
        },
      })
        .then((result) => {
          // console.log("user add friend", user);
          if (result.status === 201) {
            // console.log(result.data);
            toast.success("Friend added successfully");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            // console.log(result.data);
            toast.error(result.data);
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    } else {
      toast.error("You cannot add yourself as friend");
    }
  };
  return (
    <div className="">
      <Modal
        title={`Chat with ${friendDetails.name}`}
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
      <Card className="mt-6 w-72 shadow-2xl hover:scale-110 transition duration-300">
        <CardHeader color="blue-gray" className="relative h-48 w-38">
          <img
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            alt="card"
            className="h-48"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {friendDetails?.name}
          </Typography>
          <Typography>{friendDetails?.email}</Typography>
        </CardBody>
        <CardFooter className="pt-0">
          {alreadyFriend ? (
            // <div>Already in your chat list</div>
            <Button className="bg-green-400" onClick={handleChatClick}>
              Already in your chat list
            </Button>
          ) : (
            <Button onClick={handleAddFriend}>Add Friend</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddCard;
