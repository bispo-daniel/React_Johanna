import { useEffect, useRef, useState } from "react";
import { Send } from "@styled-icons/boxicons-solid";
import { JohannaImg, defaultPfp, JohannaNoBackgroundImg } from "@/assets";

type Message = {
  type: "userMessage" | "botMessage";
  content: string;
};

const messages_template: Message[] = [
  {
    type: "botMessage",
    content: "Hello, how can I help?",
  },
  {
    type: "userMessage",
    content: "Hi! I want you to help me with my college essay!",
  },
  {
    type: "botMessage",
    content: "Sure thing! Would be my pleasure!",
  },
  {
    type: "userMessage",
    content:
      "Great! So, my essay is about the impact of technology on modern society.",
  },
  {
    type: "botMessage",
    content:
      "That's a fascinating topic! Technology has certainly changed the way we live and interact with each other. What specific aspects of technology are you focusing on in your essay?",
  },
  {
    type: "userMessage",
    content:
      "I'm looking at how technology has changed communication, education, and work.",
  },
  {
    type: "botMessage",
    content:
      "Those are important areas! Technology has made communication faster and more accessible, revolutionized education with online learning, and transformed the way we work with remote and digital tools. How are you planning to structure your essay?",
  },
  {
    type: "userMessage",
    content:
      "I'm thinking of starting with an introduction about the rapid advancement of technology, then discussing each impact in a separate section, and finally, concluding with some thoughts on the future of technology.",
  },
];

function Chat() {
  // const [messages, setMessage] = useState<Message[]>(messages_template);
  const [messages, setMessage] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const sendMessage = () => {
    if (newMessage.trim() === "") {
      return;
    }

    setMessage((messages) => [
      ...messages,
      { type: "userMessage", content: newMessage },
    ]);
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
      className="flex flex-col items-center justify-center min-h-full bg-transparent"
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
        className={`flex w-full max-w-[90%] md:max-w-[70%] mt-4 border-b min-w-[450px] transition-colors ease-linear duration-300 ${isFocused ? "border-[#f5ac19] " : "border-white"}`}
      >
        <textarea
          value={newMessage}
          placeholder="Digite sua mensagem..."
          rows={1}
          className="flex-1 px-8 resize-none bg-transparent rounded-full md:px-2 focus:outline-none color-black text-white"
          onChange={(e) => setNewMessage(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          className="ml-2 bg-transparent text-white px-4 py-2 rounded mr-4 md:mr-0"
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
          className="w-[20px] rounded-full mr-2 select-none"
          draggable="false"
        />
        <p className="select-none">
          {type === "botMessage" ? "Johanna" : "Daniel"}
        </p>
      </span>

      <span
        className={`
        pb-1 pl-8 text-white m-0 select-none text-pretty text-justify break-words align-middle`}
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
