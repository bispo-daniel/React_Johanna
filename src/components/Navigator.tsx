import {
  Home,
  LogIn,
  Information,
  Chatbox,
  Power,
  People,
  Settings,
} from "@styled-icons/ionicons-outline";
import { ReactNode, useState, useEffect, useCallback } from "react";
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

const Navigator = () => {
  const { user, isAdmin, logout } = useAuth();

  const getNavItems = useCallback((): NavItem[] => {
    const defaultItems: NavItem[] = [
      { icon: <Home size="18" />, path: "/" },
      { icon: <Information size="18" />, path: "/info" },
    ];

    if (user) {
      const protectedItems: NavItem[] = [
        { icon: <Chatbox size="18" />, path: "/chat" },
        { icon: <Settings size="18" />, path: "/user-settings" },
      ];

      const superUserProtectedItems: NavItem[] = isAdmin
        ? [{ icon: <People size="18" />, path: "/users" }]
        : [];

      return [
        ...defaultItems,
        ...protectedItems,
        ...superUserProtectedItems,
        { icon: <Power size="18" />, action: () => logout() },
      ];
    } else {
      return [...defaultItems, { icon: <LogIn size="18" />, path: "/login" }];
    }
  }, [user, isAdmin, logout]);

  const [items, setItems] = useState<NavItem[]>(getNavItems);

  useEffect(() => {
    setItems(getNavItems());
  }, [getNavItems]);

  const [showNavigator, setShowNavigator] = useState(true);
  const toggleShowNavigator = () => {
    setShowNavigator((prev) => !prev);
    if (!showNavigator) {
      setShouldShowLine(false);
    }
  };

  const [shouldShowLine, setShouldShowLine] = useState(true);
  const toggleIsHoveringLine = () => setShouldShowLine((prev) => !prev);

  const screenWidth = window.screen.availWidth;
  const isMobile = screenWidth < 768;

  return (
    <div
      className="min-h-full w-[65px] items-center fixed flex flex-row-reverse md:flex-row"
      style={{ zIndex: "1000" }}
    >
      {showNavigator ? (
        <nav
          className="flex flex-col bg-[#280c2a] justify-between h-[310px] border-l md:border-l-0 md:border-r border-t border-b border-white w-[40px] rounded-l-full md:rounded-l-none md:rounded-r-full duration-100 overflow-hidden"
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
};

interface ButtonProps {
  icon: ReactNode;
  path?: string;
  action?: () => void;
}

const Button = ({ icon, path, action }: ButtonProps) => {
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
};

export default Navigator;
