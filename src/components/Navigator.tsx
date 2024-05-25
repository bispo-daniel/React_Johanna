import {
  Home,
  LogIn,
  LogOut,
  Information,
  Chatbox,
} from "@styled-icons/ionicons-outline";
import { Users } from "@styled-icons/heroicons-solid";
import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronCompactRight,
  ChevronCompactLeft,
} from "@styled-icons/bootstrap";
import { useAuth } from "@/auth-provider";

interface NavItem {
  icon: ReactNode;
  path?: string;
  action?: () => void;
}

function Navigator() {
  const { user, isAdmin, logout } = useAuth();

  const protectedItems: NavItem[] = [
    {
      icon: <Chatbox size="20" />,
      path: "/chat",
    },
  ];

  const superUserProtectedItems: NavItem[] = [
    {
      icon: <Users size="20" />,
      path: "/users",
    },
  ];

  const defaultItems: NavItem[] = [
    {
      icon: <Home size="20" />,
      path: "/",
    },
    {
      icon: <Information size="20" />,
      path: "/info",
    },
  ];

  const [items, setItems] = useState<NavItem[]>(() => {
    let updatedItems = [...defaultItems];
    if (user) {
      updatedItems = [...updatedItems, ...protectedItems];
      if (isAdmin) {
        updatedItems = [...updatedItems, ...superUserProtectedItems];
      }
      updatedItems = [
        ...updatedItems,
        { icon: <LogOut size="20" />, action: logout },
      ];
    } else {
      updatedItems = [
        ...updatedItems,
        { icon: <LogIn size="20" />, path: "/login" },
      ];
    }
    return updatedItems;
  });

  useEffect(() => {
    let updatedItems = [...defaultItems];

    if (user) {
      updatedItems = [...updatedItems, ...protectedItems];

      if (isAdmin) {
        updatedItems = [...updatedItems, ...superUserProtectedItems];
      }

      updatedItems = [
        ...updatedItems,
        { icon: <LogOut size="20" />, action: logout },
      ];
    } else {
      updatedItems = [
        ...updatedItems,
        { icon: <LogIn size="20" />, path: "/login" },
      ];
    }

    setItems(updatedItems);
  }, [user, isAdmin]);

  const [showNavigator, setShowNavigator] = useState(true);
  const toggleShowNavigator = () => {
    setShowNavigator(!showNavigator);
    if (!showNavigator) {
      setShouldShowLine(false);
    }
  };

  const [shouldShowLine, setShouldShowLine] = useState(true);
  const toggleIsHoveringLine = () => setShouldShowLine(!shouldShowLine);

  const screenWidth = window.screen.availWidth;
  const isMobile = screenWidth < 768;

  return (
    <div
      className="min-h-full w-[65px] items-center fixed flex flex-row-reverse md:flex-row"
      style={{ zIndex: "1000" }}
    >
      {showNavigator ? (
        <nav
          className="flex flex-col bg-[#280c2a] justify-between h-[300px] border-l md:border-l-0 md:border-r border-t border-b border-white w-[45px] rounded-l-full md:rounded-l-none md:rounded-r-full duration-100 overflow-hidden"
          style={{ zIndex: "1000" }}
        >
          {items.map((item, index) => (
            <Button
              key={index}
              icon={item.icon}
              path={item.path}
              action={item.action}
            />
          ))}
        </nav>
      ) : (
        <>
          {isMobile ? (
            <ChevronCompactLeft
              size={20}
              className="transition-all hover:text-[#f5ac19] duration-300"
              onClick={toggleShowNavigator}
            />
          ) : (
            <ChevronCompactRight
              size={20}
              className="transition-all hover:text-[#f5ac19] duration-300"
              onClick={toggleShowNavigator}
            />
          )}
        </>
      )}

      {showNavigator && shouldShowLine && !isMobile && (
        <div
          className="mr-1 md:mr-0 md:ml-1 border border-white h-[20px]"
          onMouseEnter={toggleIsHoveringLine}
        />
      )}

      {showNavigator &&
        !shouldShowLine &&
        (isMobile ? (
          <ChevronCompactRight
            size={20}
            className="transition-all hover:text-[#f5ac19] duration-300"
            onMouseLeave={toggleIsHoveringLine}
            onClick={toggleShowNavigator}
          />
        ) : (
          <ChevronCompactLeft
            size={20}
            className="transition-all hover:text-[#f5ac19] duration-300"
            onMouseLeave={toggleIsHoveringLine}
            onClick={toggleShowNavigator}
          />
        ))}
    </div>
  );
}

interface ButtonProps {
  icon: ReactNode;
  path?: string;
  action?: () => void;
}

function Button({ icon, path, action }: ButtonProps) {
  const location = useLocation();

  if (path) {
    return (
      <Link
        draggable="false"
        to={path}
        className={`hover:bg-[#fff1] w-full h-full duration-300 transition-colors flex items-center justify-center hover:text-[#f5ac19] ${
          location.pathname === path ? "text-[#f5ac19]" : ""
        }`}
      >
        {icon}
      </Link>
    );
  }

  return (
    <button
      onClick={action}
      className="hover:bg-[#fff1] w-full h-full duration-300 transition-colors flex items-center justify-center hover:text-[#f5ac19]"
    >
      {icon}
    </button>
  );
}

export default Navigator;
