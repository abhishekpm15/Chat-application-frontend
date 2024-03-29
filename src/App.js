import "./App.css";
import ChatBody from "./components/ChatBody";
import { NavbarDark } from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { SearchContextProvider } from "./context/SearchContext";
function App() {
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
