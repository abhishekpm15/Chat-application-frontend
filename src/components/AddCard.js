import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const AddCard = ({ friendDetails }) => {
  console.log('friendDetails',friendDetails);
  const { user } = useAuth();
  const [friends, setFriends] = useState([])
 
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
            console.log(result.data);
            // toast.success("Friend added successfully");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            console.log(result.data);
            toast.error(result.data);
          }
        })
        .catch((err) => {
          console.log(err);
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
            console.log("user add friend", user);
            if (result.status === 201) {
              console.log(result.data);
              toast.success("Friend added successfully");
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } else {
              console.log(result.data);
              toast.error(result.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });

    } else {
      toast.error("You cannot add yourself as friend");
    }
  };
  return (
    <div className="m-10">
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
          <Button onClick={handleAddFriend}>Add Friend</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddCard;
