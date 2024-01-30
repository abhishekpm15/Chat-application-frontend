// import React, { useEffect,useState } from "react";
// import useChat from "../customHooks/useChat";
// import { Modal } from "antd";
// import { Textarea, Button } from "@material-tailwind/react";
// const Modals = ({ friendDetails, open, text }) => {
//     const [modalOpen , setModalOpen] = useState(open)
//     useEffect(()=>{
//         setModalOpen(open);
//     },[])
//   const {
//     socketConnected,
//     // open,
//     // setOpen,
//     message,
//     // setMessage,
//     setSocketConnected,
//     ref,
//     handleChatClick,
//     handleTextAreaChange,
//     handleTextSend,
//   } = useChat(friendDetails);

//   return (
//     <div>
//       {
//         // console.log("Modals component")
//         console.log("Modals component, open", friendDetails.name,open)
//       }
//       <Modal
//         title={`Chat with ${friendDetails.name}`}
//         centered
//         open={modalOpen}
//         onCancel={() => setModalOpen(false)}
//         width={1000}
//       >
//         <div className="min-h-[400px] max-h-[400px] mt-10 overflow-y-scroll scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-100 scrollbar-thumb-rounded-xl">
//           <div className="flex flex-col h-full space-y-3 m-5">
//             {text.map((messageItem, index) => (
//               <div
//                 key={index}
//                 className={`mb-2 rounded-xl px-3 py-2 font-semibold ${
//                   messageItem.sent
//                     ? "text-right bg-yellow-200 max-w-sm self-end"
//                     : "text-left bg-orange-200 max-w-fit"
//                 }`}
//               >
//                 <div className="">{messageItem.text}</div>
//               </div>
//             ))}
//           </div>
//           <div ref={ref}></div>
//         </div>

//         <Textarea
//           color="purple"
//           label="Message"
//           value={message}
//           onChange={handleTextAreaChange}
//         />
//         <Button onClick={handleTextSend}>Send</Button>
//       </Modal>
//     </div>
//   );
// };

// export default Modals;
