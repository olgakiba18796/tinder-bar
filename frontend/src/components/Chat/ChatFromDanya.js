import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { database } from "../../firebase";
import Message from "./Message";
import { Link } from "react-router-dom";
import "./chatForm.css";

function Chat(props) {
  const [cookies] = useCookies(["userName", "userNickname"]);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState({});
  const { chats, url, name } = props.location.state;
  const chatRoom = database.ref().child(`${chats}`);

  useEffect(() => {
    const handleNewMessages = snap => {
      if (snap.val()) setMessages(snap.val());
    };
    chatRoom.on("value", handleNewMessages);
    return () => {
      chatRoom.off("value", handleNewMessages);
    };
  }, [setMessages]);

  const handleMsgChange = e => setMsg(e.target.value);
  const handleKeyDown = e => {
    chatRoom.push({
      nickname: cookies.userNickname,
      msg,
      dateTime: new Date().toLocaleTimeString(),
      dateDay: new Date().toLocaleDateString()
    });
    setMsg("");
  };
  return (
    <div className="bodyChat">
      <div className="full-wh">
        <div className="bg-animation">
          <div id="stars" />
          <div id="stars2" />
          <div id="stars3" />
          <div id="stars4" />
        </div>
      </div>
      <div className="window">
        <div className="exit">
          <Link to="/allChats" className="navbar">
            <img src="./imgs/stop.png" />
          </Link>
        </div>
        <div className="header">
          <img className="img" src={url} />
          <h2>{name}</h2>
        </div>
        <div class="chats">
          <Message />
          {Object.keys(messages).map(message => (
            <>
              <Message
                key={messages[message]["dateTime"]}
                msg={messages[message]["msg"]}
                dateDay={messages[message]["dateDay"]}
                dateTime={messages[message]["dateTime"]}
                nickname={messages[message]["nickname"]}
              />
            </>
          ))}
        </div>
      </div>
      <div className="button">
        <input
          className="chatInput"
          type="text"
          id="message"
          placeholder="write here"
          onChange={handleMsgChange}
          value={msg}
        />
        <button id="send" onClick={handleKeyDown} className="chatButton">
          Send
        </button>
      </div>
    </div>
  );
}
export default Chat;
