import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { SocketContext } from "../../context/SocketContext.jsx";
import apiRequest from "../../lib/apiRequest.js";
import "./chat.css";

function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    if (!socket?.current) return;
    const handleMessage = (data) => {
      if (chat && chat.id === data.chatId) {
        setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
      }
    };
    socket.current.on("getMessage", handleMessage);
    return () => socket.current.off("getMessage", handleMessage);
  }, [socket, chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");
    if (!text) return;

    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.current.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((c) => (
          <div
            className="message"
            key={c.id}
            style={{
              backgroundColor:
                c.seenBy.includes(currentUser.id) ? "white" : "#fecd514e",
            }}
            onClick={() =>
              handleOpenChat(
                c.id,
                c.users?.find((u) => u.id !== currentUser.id)
              )
            }
          >
            <img
              src={
                c.users?.find((u) => u.id !== currentUser.id)?.avatar ||
                "/noavatar.png"
              }
              alt="avatar"
            />
            <span>
              {c.users?.find((u) => u.id !== currentUser.id)?.username}
            </span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={chat.receiver?.avatar || "/noavatar.png"}
                alt="avatar"
              />
              {chat.receiver?.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              ✕
            </span>
          </div>
          <div className="center">
            {chat.messages?.map((message) => (
              <div
                key={message.id}
                className={
                  message.userId === currentUser.id ? "chatMessage own" : "chatMessage"
                }
              >
                <p>{message.text}</p>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text" placeholder="Type a message..."></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
