import RootLayout from "@/components/Layout";
import React, { useState, useEffect, useRef } from "react";

import { MdAutorenew } from "react-icons/md";
import Bounce_arrow from "@/components/Atoms/bounce_arrow";
/* eslint-disable @next/next/no-img-element */
import { useTransform, motion, useScroll } from "framer-motion";
import Link from "next/link";

import { MdLocalPhone } from "react-icons/md";

export default function Home() {
  const [isArrowVisible, setIsArrowVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollThreshold = 200;

      if (scrollY > scrollThreshold) {
        setIsArrowVisible(false);
      } else {
        setIsArrowVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const aboutContainer = useRef(null);
  const { scrollYProgress } = useScroll({
    target: aboutContainer,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);

  return (
    <RootLayout>
      <section id="#home" className="section p-5 bg-white min-h-[90vh]">
        <section className="pt-2 md:px-14 shadow">
          <div
            className="rounded-[35px] h-[80vh] shadow-xl flex items-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(/images/csm_3_410535fe1c.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex w-full justify-center">
              <div className="text-center">
                <div className="text-center">
                  <div className="font-bold text-white md:text-5xl">
                    <div className=" font-bold text-white md:text-5xl text-center pt-4">
                      RDF Recruitment Portal
                    </div>
                  </div>
                </div>
                <br />
                <p className="text-center text-white font-normal">
                Rwanda Defense Force: Safeguarding Sovereignty, Fostering Peace
                </p>

                <div className="group flex justify-center py-16">
                  <motion.button
                    onClick={() => {
                      window.location.href = "/user-registration";
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: "#111828",
                      color: "#fff",
                      border: "#e8d329",
                    }}
                    className="group-hover:bg-[#e8d329] border rounded-xl gap-2 group-hover:border-[yellow] group-hover:text-white sm:text-xs p-2 md:px-4 md:py-2 flex items-center justify-center"
                  >
                    Apply Here
                    <p>
                      <MdAutorenew className="group-hover:animate-spin text-[#e8d329]" />
                    </p>
                  </motion.button>
                </div>
                {isArrowVisible && <Bounce_arrow />}
              </div>
            </div>
          </div>
          <div className="">
            <div className="mb-4 sm:mb-[-120px] swiper-pagination custom-swiper-pagination">
              <style>
                {`
              .swiper-pagination-bullet {
                width: 12px;
                height: 12px;
                background-color: rgba(1, 140, 121) !important;
                opacity: 0.5;
              }

              .swiper-pagination-bullet-active {
                width: 18px;
                height: 18px;
                background-color: white !important;
              }
            `}
              </style>
            </div>
          </div>
        </section>
      </section>
      <section
        id="aboutus"
        className="section flex md:h-full pb-12 items-center bg-white text-[#080415] justify-center"
        ref={aboutContainer}
      >
        <div className="w-3/4 sm:gap-8 flex sm:flex-wrap items-center">
          <div className="md:w-1/2 sm:flex sm:justify-center">
            <div className="sm:w-1/2">
              <div className="imageContainer md:w-1/2 md:h-[50%] h-44">
                <motion.div className={"inner"} style={{ scale: imageScale }}>
                  <img
                    src="/images/csm_1_c19e0680a0.jpg"
                    alt=""
                    className="object-contain h-full w-full"
                  />
                </motion.div>
              </div>
              <div className="w-full flex justify-end -mt-20 -ml-20">
                <div className="imageContainer md:w-1/2 md:h-[50%] z-20">
                  <motion.div className={"inner"} style={{ scale: imageScale }}>
                    <img
                      src="/images/csm_5_521d8f956e.jpg"
                      alt=""
                      className="object-contain h-full w-full"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 sm:w-full">
            <div className="flex gap-8 text-primary items-center">
              <div className="w-20">
                <hr className="bg-primary h-0.5" />
              </div>
              <h3 className="font-bold">About us</h3>
            </div>
            <h3 className="font-bold md:my-8 sm:my-4">
              The Rwanda Defense Force (RDF){" "}
            </h3>
            <p className="text-justify">
              The Rwanda Defense Force (RDF) is the national military of Rwanda,
              established in 1994 after the Rwandan Genocide. Comprising the
              Rwanda Land Force, Rwanda Air Force, and Rwanda National Police,
              the RDF is dedicated to protecting the country&apos;s sovereignty.
              Renowned for its peacekeeping efforts globally, the RDF
              contributes troops to UN and AU missions. Additionally, it engages
              in community development initiatives, enhancing Rwanda&apos;s
              socio-economic landscape.
            </p>
            <div className="group py-16">
              <motion.button
                onClick={() => {
                  window.location.href = "/contact";
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: "#111828",
                  color: "#fff",
                  border: "#e8d329",
                }}
                className="group-hover:bg-[#e8d329] border rounded-xl gap-2 group-hover:border-[yellow] group-hover:text-white sm:text-xs p-2 md:px-4 md:py-2 flex items-center justify-center"
              >
                View More
                <p>
                  <MdAutorenew className="group-hover:animate-spin text-[#e8d329]" />
                </p>
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  );
}
