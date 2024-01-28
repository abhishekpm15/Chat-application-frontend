import "./App.css";
import ChatBody from "./components/ChatBody";
import { NavbarDark } from "./components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { SearchContextProvider } from "./context/SearchContext";
function App() {
  const [showAddCard, setShowAddCard] = useState(false);
  const [details, setDetails] = useState(null);
  const [search, setSearch] = useState(false);
  return (
    <div className="App">
      <ToastContainer autoClose={2000} />
      <SearchContextProvider>
        <NavbarDark />
        <ChatBody />
      </SearchContextProvider>
    </div>
  );
}

export default App;
