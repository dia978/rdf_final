import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { HiOutlineChevronRight } from "react-icons/hi";
import Dashboard from "../components/dashboard";
import Link from "next/link";
import { useRouter } from "next/router";
import { decodeToken } from "../lib/jwt";
import User from "../types/user";
import {
  NewsEventData,
  CalendarData,
  CareerData,
} from "../utils/news&eventData";

const DashboardMain: React.FC = () => {
  const sliderRef = useRef<Slider>(null);
  const [user, setUser] = useState<User>();
  const router = useRouter();

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 2000,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const next = () => {
    sliderRef.current?.slickNext();
  };

  useEffect(() => {
    const token = localStorage.getItem("user_session");
    if (token) {
      const decodedUser = decodeToken(token);
      setUser(decodedUser);
    }
  }, []);

  return (
    <Dashboard>
      <div className="w-full">
        <div>
          <h3 className="font-bold">Dashboard</h3>
          <p>Welcome Back, {user?.name ? user.name.split(" ")[0] : "Guest"}!</p>
        </div>
        <div className="relative">
          <Slider ref={sliderRef} {...settings}>
            <motion.div
              className="h-full w-full cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key={1}
            >
              <Link
                href={"/webpages"}
                className="m-4 h-[250px] p-6 flex flex-col justify-between bg-white shadow border rounded-xl"
              >
                <h3 className="p-2 font-bold bg-primary/25 text-primary text-center rounded-[5px]">
                  A
                </h3>
                <h3 className="font-bold text-center">Applications</h3>
                <div className="flex justify-between">
                  <div
                    onClick={() => router.push("/webpages")}
                    className="text-primary font-bold"
                  >
                    View More
                  </div>
                </div>
              </Link>
            </motion.div>
            <motion.div
              className="h-full w-full cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key={2}
            >
              <Link
                href={"/posts"}
                className="m-4 h-[250px] p-6 flex flex-col justify-between bg-white shadow border rounded-xl"
              >
                <h3 className="p-2 font-bold bg-[#FFA500]/25 text-[#FFA500] text-center rounded-[5px]">
                  P
                </h3>
                <h3 className="font-bold text-center">Posts</h3>
                <div className="flex justify-between">
                  <div
                    onClick={() => router.push("")}
                    className="text-[#FFA500] font-bold"
                  >
                    View More
                  </div>
                </div>
              </Link>
            </motion.div>
            <motion.div
              className="h-full w-full cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key={4}
            >
              <Link
                href={"/staff"}
                className="m-4 h-[250px] p-6 flex flex-col justify-between bg-white shadow border rounded-xl"
              >
                <h3 className="p-2 font-bold bg-[#FD620C]/25 text-[#FD620C] text-center rounded-[5px]">
                  S
                </h3>
                <h3 className="font-bold text-center">Staff</h3>
                <div className="flex justify-between">
                  <div
                    onClick={() => router.push("/staff")}
                    className="text-[#FD620C] font-bold"
                  >
                    View More
                  </div>
                </div>
              </Link>
            </motion.div>
            <motion.div
              className="h-full w-full cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key={6}
            >
              <Link
                href={"/others"}
                className="m-4 h-[250px] p-6 flex flex-col justify-between bg-white shadow border rounded-xl"
              >
                <h3 className="p-2 font-bold bg-[#B244F5]/25 text-[#B244F5] text-center rounded-[5px]">
                  Q
                </h3>
                <h3 className="font-bold text-center">Query</h3>
                <div className="flex justify-between">
                  <div
                    onClick={() => router.push("/others")}
                    className="text-[#B244F5] font-bold"
                  >
                    View More
                  </div>
                </div>
              </Link>
            </motion.div>
          </Slider>
          <div className="absolute z-50 flex justify-end items-center w-full top-1/2 transform -translate-y-1/2">
            {/* <div
              className="bg-white shadow-xl rounded-full h-12 w-12 border flex items-center justify-center cursor-pointer"
              onClick={previous}
            >
              <HiOutlineChevronLeft />
            </div> */}
            <div
              className="bg-white shadow-inner shadow-xl rounded-full h-[55px] w-[55px] border flex items-center justify-center cursor-pointer"
              onClick={next}
            >
              <HiOutlineChevronRight />
            </div>
          </div>
        </div>
        <div className="flex justify-between md:gap-20 sm:gap-4 w-full sm:flex-wrap">
          <div className="md:w-1/2 sm:w-full  bg-white rounded-[11px] shadow p-8">
            <h3 className="font-medium mb-2">Recent News</h3>
            <div className="grid p-8 w-full gap-8">
              {NewsEventData.slice(0, 3).map((event, index) => (
                <div key={index} className="w-full gap-2 flex pb-2">
                  <div
                    className="w-1/3 rounded-xl"
                    style={{
                      backgroundImage: `url(${event.imageUrl[0]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="w-2/3">
                    <p className="font-bold">{event.title}</p>
                    <p className="mt-2 text-base font-normal text-justify">
                      {EventCard(event.description)}
                    </p>
                    <div className="flex justify-end">
                      <motion.button
                        onClick={() => {
                          window.location.href = `/news/${event.slug}?tab=events`;
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="border rounded-lg text-primary gap-2 hover:bg-primary hover:text-white text-xs p-2 flex items-center justify-center"
                      >
                        view more
                      </motion.button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/3 sm:w-full flex flex-col gap-8">
            <div>
              <h3 className="font-medium mb-2">Opening Vacancies</h3>
              <div className="bg-white pb-12 border rounded-xl shadow-xl w-full">
                <div className="grid p-8 w-full gap-8">
                  {CareerData.length > 0 ? (
                    CareerData.map((job: any, index: number) => (
                      <div key={index} className="w-full gap-2 flex pb-2">
                        <div
                          className="w-1/3 rounded-xl"
                          style={{
                            backgroundImage: `url(${job.imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                        <div className="w-2/3">
                          <p className="text-sm">{job.type}</p>
                          <p className="font-bold">{job.title}</p>
                          <p className="mt-2 text-base font-normal text-justify">
                            {job.posted}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="">No vacancies available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default DashboardMain;

const EventCard = (description: string) => {
  if (!description) return "";

  const paragraphs = description.split(/\n\s*\n/);

  if (!paragraphs.length) return "";

  const firstParagraph = paragraphs[0];

  const words = firstParagraph.split(/\s+/).slice(0, 20);

  const truncatedDescription = words.join(" ");

  return truncatedDescription;
};
