import { Home, LogIn, Information } from "@styled-icons/ionicons-outline";
import { Chatbox } from "@styled-icons/ionicons-outline";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronCompactRight,
  ChevronCompactLeft,
} from "@styled-icons/bootstrap";

function Navigator() {
  const items = [
    {
      icon: <Home size="20" />,
      href: "/",
    },
    {
      icon: <Information size="20" />,
      href: "/info",
    },
    {
      icon: <Chatbox size="20" />,
      href: "/chat",
    },
    {
      icon: <LogIn size="20" />,
      href: "/login",
    },
  ];

  const [showNavigator, setShowNavigator] = useState(true);
  const toggleShowNavigator = () => {
    setShowNavigator(!showNavigator);
    if (!showNavigator) {
      setIsHoveringLine(false);
    }
  };

  const [isHoveringLine, setIsHoveringLine] = useState(false);
  const toggleIsHoveringLine = () => setIsHoveringLine(!isHoveringLine);

  return (
    <div
      className="min-h-full w-[65px] items-center fixed flex"
      style={{ zIndex: "1000" }}
    >
      {showNavigator ? (
        <nav
          className="flex flex-col bg-[#301032] justify-between h-[300px] border-r border-t border-b border-white w-[45px] rounded-r-full   duration-100 overflow-hidden"
          style={{ zIndex: "1000" }}
        >
          {items.map(({ icon, href }) => (
            <Button icon={icon} href={href} key={href} />
          ))}
        </nav>
      ) : (
        <span>
          <ChevronCompactRight
            size={20}
            className="transition-all hover:text-[#f5ac19] duration-300"
            onClick={toggleShowNavigator}
          />
        </span>
      )}

      {showNavigator &&
        (!isHoveringLine ? (
          <ChevronCompactLeft
            size={20}
            className="transition-all hover:text-[#f5ac19] duration-300"
            onMouseLeave={toggleIsHoveringLine}
            onClick={toggleShowNavigator}
          />
        ) : (
          <div
            className="ml-1 border border-white h-[20px]"
            onMouseEnter={toggleIsHoveringLine}
          />
        ))}
    </div>
  );
}

type ButtonProps = {
  icon: ReactNode;
  href: string;
};

function Button({ icon, href }: ButtonProps) {
  return (
    <Link
      draggable="false"
      to={href}
      className="hover:bg-[#fff1] w-full h-full duration-300 transition-colors flex items-center justify-center text-white hover:text-[#f5ac19]"
    >
      {icon}
    </Link>
  );
}

export default Navigator;
