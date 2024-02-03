// import {  useEffect, useState, createContext, useContext } from "react";

// const MessageContext = createContext();

// export const MessageContextProvider = ({children}) => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     setOpen(true);
//     axios({
//       method: "POST",
//       url: "http://localhost:3001/message/get-messages",
//       data: {
//         sender_id: user.uid,
//         friend_id: friend.id,
//       },
//     })
//       .then((response) => {
//         const result = response.data;
//         console.log("result", result);
//         if (result.length) {
//           setMessages(result);
//           socket.emit("join_chat", 1234);
//           console.log(result);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });
//   return <MessageContext.Provider>{children}</MessageContext.Provider>
// };

// export function useMessage(){
//     return useContext(MessageContext)
// }