import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useState } from "react";
import { brainwave } from "../assets";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header"; // Ensure this is used if needed

const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "2",
    title: "How to use",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Roadmap",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "New account",
    url: "#signup",
    onlyMobile: false, // Show on large screens
  },
  {
    id: "5",
    title: "Sign in",
    url: "#login",
    onlyMobile: true,
  },
];

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();

    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 ${
        openNavigation
          ? "bg-n-8/90 backdrop-blur-sm"
          : "bg-transparent backdrop-blur-none"
      }`}
    >
      <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img src={brainwave} alt="brainwave" width={190} height={40} />
        </a>

        <nav
          className={`${
            openNavigation
              ? "flex flex-col items-center justify-start p-5 space-y-4 mt-10"
              : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 lg:static lg:flex lg:flex-row lg:ml-auto lg:space-x-6`}
        >
          {navigation.map((item) =>
            !item.onlyMobile ? (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className="text-white hover:text-blue-400"
              >
                {item.title}
              </a>
            ) : null
          )}
          <HamburgerMenu />
        </nav>

        <div className="flex space-x-4 ml-auto">
          <a
            className="hidden lg:flex mt-2 text-white hover:text-blue-400"
            href="#signup"
          >
            New Account
          </a>
          <Button className="hidden lg:flex" href="#login">
            Sign In
          </Button>
          <Button
            className="ml-auto lg:hidden"
            px="px-3"
            onClick={toggleNavigation}
          >
            <MenuSvg openNavigation={openNavigation} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
