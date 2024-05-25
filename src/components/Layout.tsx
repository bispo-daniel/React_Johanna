import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Navigator from "./Navigator";

const Layout = () => {
  const colors = [
    "#FFFFFF",
    "#DDE6C0",
    "#69D4C4",
    "#1AC5C0",
    "#1BA4BD",
    "#BA3A92",
    "#E72569",
    "#DF2B8B",
    "#FFFFFF",
    "#532988",
    "#303070",
    "#FBDE67",
    "#FDCF62",
    "#F9B03E",
    "#F4963E",
    "#F26849",
    "#FFFFFF",
  ];

  const appOutlet = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const numberOfStars = Math.floor(Math.random() * 50) + 1; // Random number of stars (1 to 50)
      for (let i = 0; i < numberOfStars; i++) {
        const randomIndexToPickColor = Math.floor(
          Math.random() * colors.length
        );

        createStar(randomIndexToPickColor);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const createStar = (index: number) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const x = Math.random() * viewportWidth + scrollX;
    const y = Math.random() * viewportHeight + scrollY;
    const size = Math.random() * 2;
    const duration = Math.random() * 1 + 0.5;

    const star = document.createElement("div");
    star.classList.add("star");
    star.style.backgroundColor = colors[index];
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDuration = `${duration}s`;

    if (appOutlet.current) {
      appOutlet.current.appendChild(star);
    }

    setTimeout(() => {
      star.remove();
    }, duration * 1000);
  };

  return (
    <div
      className="flex min-h-full min-w-full relative z-50 bg-[#301032] flex-row-reverse md:flex-row"
      style={{ zIndex: "10" }}
      ref={appOutlet}
    >
      <Navigator />
      <div className="md:ml-[45px] w-full min-h-full px-4 md:px-0 bg-[#301032]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
