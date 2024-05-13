import { useEffect, useRef, useState } from "react";
import { Send } from "@styled-icons/boxicons-solid";
import { io, Socket } from "socket.io-client";

import { JohannaImg, defaultPfp, JohannaNoBackgroundImg } from "@/assets";
import { SOCKET_URL } from "@/config";

type Message = {
  type: "userMessage" | "botMessage";
  content: string;
};

function Chat() {
  const [messages, setMessage] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [SOCKET_URL]);

  useEffect(() => {
    if (!socket) return;

    socket.on("bot-message", (message: string) => {
      setMessage((messages) => [
        ...messages,
        { type: "botMessage", content: message },
      ]);
    });

    return () => {
      socket.off("bot-message");
    };
  }, [socket]);

  const sendMessage = () => {
    if (newMessage.trim() === "" || !socket) return;

    setMessage((messages) => [
      ...messages,
      { type: "userMessage", content: newMessage },
    ]);

    socket.emit("message", newMessage);

    setNewMessage("");
  };

  const enterDown = (e: React.KeyboardEvent<HTMLElement>) => {
    let keyCode = e.key || e.code;

    if (keyCode !== "Enter") {
      return;
    }

    sendMessage();
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <main
      className="flex flex-col items-center justify-center min-h-full bg-transparent min-w-full overflow-hidden"
      onKeyUp={(e) => enterDown(e)}
    >
      <div className="rounded-lg w-full max-w-full min-h-full grow flex flex-col justify-between">
        {messages.length === 0 ? (
          <NoMessage />
        ) : (
          <div className="overflow-y-auto h-0 flex-grow flex justify-center">
            <div className="flex flex-col space-y-2 w-full max-w-[90%] md:max-w-[70%]">
              {messages.map((message, key) => (
                <Message key={key} msg={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      <div
        className={`min-w-[300px] w-full md:max-w-[70%] flex justify-between pb-2 border-b transition-colors ease-linear duration-300 ${
          isFocused ? "border-[#f5ac19] " : "border-white"
        } `}
      >
        <input
          value={newMessage}
          placeholder="Digite sua mensagem..."
          className="w-[90%] bg-transparent pl-2 focus:outline-none"
          onChange={(e) => setNewMessage(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          className="pr-2"
          onClick={() => sendMessage()}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Send
            size={20}
            color={isHovering ? "#f5ac19" : "white"}
            className="transition-colors ease-linear duration-300"
          />
        </button>
      </div>
    </main>
  );
}

const Message = ({ msg }: { msg: Message }) => {
  const { type, content } = msg;
  const pfp = type === "botMessage" ? JohannaImg : defaultPfp;

  return (
    <div className={`flex flex-col transition-all p-1 items-start w-full`}>
      <span className="flex items-center">
        <img
          src={pfp}
          alt=""
          className="w-[32px] h-[32px] rounded-full mr-2 select-none"
          draggable="false"
        />
        <p className="select-none font-semibold">
          {type === "botMessage" ? "Johanna" : "Usuário"}
        </p>
      </span>

      <span
        className={`
        pb-1 pl-11 text-white m-0 select-none text-sm text-pretty text-justify break-words align-middle`}
        style={{ wordBreak: "break-word" }}
      >
        {content}
      </span>
    </div>
  );
};

const NoMessage = () => {
  return (
    <div className="w-full flex-col h-full flex items-center justify-center mt-4">
      <div className="rounded-full border w-[200px] border-white">
        <img
          src={JohannaNoBackgroundImg}
          alt=""
          draggable="false"
          className="w-[200px] rounded-full select-none"
        />
      </div>
      <h1 className="text-2xl select-none mt-4 font-semibold text-[#f5ac19]">
        Como posso ajudar hoje?
      </h1>
    </div>
  );
};

export default Chat;
