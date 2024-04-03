/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Squeeze as Hamburger } from "hamburger-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { scaleRotate as Menu } from "react-burger-menu";
import { GoHome, GoPeople } from "react-icons/go";
import { motion } from "framer-motion";
import { GrGallery } from "react-icons/gr";
import { BiLogIn, BiNews, BiSupport } from "react-icons/bi";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const navElement = document.getElementById("nav");

      if (navElement && !navElement.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen === false) {
      setIsDropdownOpen(false);
    }
  };
  const isBlueIb = [
    "/news",
    "/user-registration",
    "/about",
    "/about/accreditation",
    "/about/leadership_tab",
    "/credits",
  ].includes(router.pathname);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Set initial screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav id="nav" className="w-full">
      <section className="flex justify-center w-full">
        <div
          className={`bg-primary text-white ${
            router.pathname === "/" ? "w-[100%]" : "w-[100%]"
          } flex justify-between items-center md:px-12 py-2`}
        >
          <Link href={"/"} passHref className="text-white flex items-center rounded-full p-0">
            <img src="/logo.png" alt="" className="h-12" /><h5>RDF Recruitment</h5>
          </Link>
          <div className="flex sm:hidden items-center md:space-x-8">
            <Link
              href="/"
              className={`${
                router.pathname === "/" ? "border-b-2 border-[yellow]" : ""
              } hover:border-[yellow] hover:border-b-2 text-white`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`${
                router.pathname === "/about" ? "border-b-2 border-[yellow]" : ""
              } hover:border-[yellow] hover:border-b-2 text-white`}
            >
              About&nbsp;us
            </Link>

            <Link
              href="/user-registration"
              className={`${
                router.pathname === "/user-registration"
                  ? "border-b-2 border-[yellow]"
                  : ""
              } hover:border-[yellow] hover:border-b-2 text-white`}
            >
              Application Portal
            </Link>
            <Link
              href="/contact"
              className={`${
                router.pathname === "/contact"
                  ? "border-b-2 border-[yellow]"
                  : ""
              } hover:border-[yellow] hover:border-b-2 text-white`}
            >
              Contact&nbsp;Us
            </Link>
            <Link
              href="/login"
              className={`${
                router.pathname === "/login"
                  ? "border-b-2 border-[yellow]"
                  : "hover:animate-bounce"
              } px-4 border-[yellow] border-2 text-white`}
            >
              Login
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={handleMenuToggle}
            >
              <div className="">
                <Hamburger
                  toggled={isMenuOpen}
                  toggle={handleMenuToggle}
                  size={24}
                />
              </div>
              <Link href={""} className="inline font-[600]">
                MENU
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="flex md:justify-end text-lg absolute top-0">
        <Menu
          right
          isOpen={isMenuOpen}
          onStateChange={(state: {
            isOpen: boolean | ((prevState: boolean) => boolean);
          }) => setIsMenuOpen(state.isOpen)}
          menuClassName="menu-scale-rotate z-50"
          width={isSmallScreen ? "" : "25vw"}
        >
          <div className="bg-white shadow shadow-xl px-2 md:overflow-hidden">
            <div className="flex justify-center py-2">
              <Link href={"/"} passHref className="bg-white rounded-full p-0">
                <h2>RDF Recruitment</h2>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  window.location.href = "/";
                }}
                className={`group flex gap-2 items-center w-full p-4 text-start ${
                  router.pathname === "/"
                    ? "bg-primary text-[yellow]"
                    : "bg-second"
                } hover:bg-primary hover:text-[yellow] text-lg font-['Outfit'] uppercase`}
              >
                <GoHome
                  className={` ${
                    router.pathname === "/"
                      ? "text-primary"
                      : ""
                  }`}
                />{" "}
                HOME
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  window.location.href = "/about";
                }}
                className={`group flex gap-2 items-center w-full p-4 text-start ${
                  router.pathname === "/about"
                    ? "bg-primary text-[yellow]"
                    : "bg-second"
                } hover:bg-primary hover:text-[yellow] text-lg font-['Outfit'] uppercase`}
              >
                <GoPeople
                  className={` ${
                    router.pathname === "/about"
                      ? "text-primary"
                      : ""
                  }`}
                />{" "}
               ABOUT
              </motion.button>
             

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  window.location.href = "/contact";
                }}
                className={`group flex gap-2 items-center w-full p-4 text-start ${
                  router.pathname === "/contact"
                    ? "bg-primary text-[yellow]"
                    : "bg-second"
                } hover:bg-primary hover:text-[yellow] text-lg font-medium font-['Outfit'] uppercase`}
              >
                <BiSupport
                  className={`group-hover:text-[yellow] ${
                    router.pathname !== "/contact" ? "text-primary" : ""
                  }`}
                />
                CONTACT US
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  window.location.href = "/user-registration";
                }}
                className={`group flex gap-2 items-center w-full p-4 text-start ${
                  router.pathname === "/user-registration"
                    ? "bg-primary text-[yellow]"
                    : "bg-second"
                } hover:bg-primary hover:text-[yellow] text-lg font-medium font-['Outfit'] uppercase`}
              >
                <GrGallery
                  className={`group-hover:text-[yellow] ${
                    router.pathname !== "/user-registration" ? "text-primary" : ""
                  }`}
                />
                APPLICATION
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  window.location.href = "/login";
                }}
                className={`group flex gap-2 items-center w-full p-4 text-start ${
                  router.pathname === "/login"
                    ? "bg-primary text-[yellow]"
                    : "bg-second"
                } hover:bg-primary hover:text-[yellow] text-lg font-medium font-['Outfit'] uppercase`}
              >
                <BiLogIn
                  className={`group-hover:text-[yellow] ${
                    router.pathname !== "/login" ? "text-primary" : ""
                  }`}
                />
                LOGIN
              </motion.button>
            </div>
          </div>
        </Menu>
      </section>
    </nav>
  );
}
