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
import axios from "axios";
import toast from "react-hot-toast";

const DashboardMain: React.FC = () => {
  const sliderRef = useRef<Slider>(null);
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const [queries, setQueries] = useState<any>([]);
  const [exams, setExams] = useState<any>([]);

  useEffect(() => {
    fetchQueries();
    fetchExam();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await axios.get<any>("/api/application");
      setQueries(response.data);
    } catch (error) {
      console.error("Error fetching queries:", error);
      toast.error("Failed to fetch queries");
    }
  };
  const fetchExam = async () => {
    try {
      const response = await axios.get<any>("/api/exam");
      setExams(response.data);
    } catch (error) {
      console.error("Error fetching queries:", error);
      toast.error("Failed to fetch queries");
    }
  };
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
                href={"/examSection"}
                className="m-4 h-[250px] p-6 flex flex-col justify-between bg-white shadow border rounded-xl"
              >
                <h3 className="p-2 font-bold bg-[#FFA500]/25 text-[#FFA500] text-center rounded-[5px]">
                  E
                </h3>
                <h3 className="font-bold text-center">Exams</h3>
                <div className="flex justify-between">
                  <div
                    onClick={() => router.push("/examSection")}
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
            <h3 className="font-medium mb-2">Recent Applicants</h3>
            <div className="grid p-8 w-full gap-8">
              {queries.slice(0, 3).map((event: any, index: number) => (
                <div key={index} className="w-full gap-2 grid pb-2">
                  <p className="font-bold">{event.name}</p>
                  <p className="">{event.email}</p>
                  <p className="mt-2 text-base font-normal text-justify">
                    {event.educationalBackground},{event.contactDetails},
                    {event.dob}
                  </p>
                  <p className="flex">Invitation: {event.sentExam?<div className="text-primary">Sent</div>:<div className="text-[orange]">Waiting</div>}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/3 sm:w-full flex flex-col gap-8">
            <div>
              <h3 className="font-medium mb-2">Exam Done</h3>
              <div className="bg-white pb-12 border rounded-xl shadow-xl w-full">
                <div className="grid p-8 w-full gap-8">
                  {exams.length > 0 ? (
                    exams.map((job: any, index: number) => (
                      <div key={index} className="w-full gap-2 flex pb-2">
                       
                        <div className="w-2/3">
                          <p className="text-sm">attempts:{job.attempts}</p>
                          <p className="font-bold">{job.email}</p>
                          <p className="mt-2 text-base font-normal text-justify">
                          {job.scores.map((i:any, index:number) => (
                    <div key={index}>
                      <p>
                        {i}
                      </p>
                    </div>
                  ))}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="">Still waiting.....</p>
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
