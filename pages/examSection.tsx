/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import User from "../types/user";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Dashboard from "@/components/dashboard";
import { decodeToken } from "../lib/jwt";

export default function ExamSection() {
  const [user, setUser] = useState<User>();
  const itemsPerPage: number = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [queries, setQueries] = useState<any>([]);
  const [replyText, setReplyText] = useState<string>("");
  const [replyingToEmail, setReplyingToEmail] = useState<string>("");
  const [replyingId, setReplyingId] = useState<string>("");
  const [isReplySent, setIsReplySent] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("user_session");
    if (token) {
      const decodedUser = decodeToken(token);
      setUser(decodedUser);
    }
  }, []);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await axios.get<any>("/api/exam");
      setQueries(response.data);
    } catch (error) {
      console.error("Error fetching queries:", error);
      toast.error("Failed to fetch queries");
    }
  };

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems = queries.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(queries.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this section?"
      );
      if (!confirm) {
        return;
      }
      await axios.delete(`/api/exam?id=${id}`);
      const updatedQueries = queries.filter(
        (query: { _id: string }) => query._id !== id
      );
      setQueries(updatedQueries);
      toast.success("Query deleted successfully");
    } catch (error) {
      console.error("Error deleting query:", error);
      toast.error("Failed to delete query");
    }
  };

  const handleReply = (email: string, id: string) => {
    setReplyingToEmail(email);
    setReplyingId(id);
    setReplyText("");
    setIsReplySent(false);
  };

  const sendReply = async () => {
    try {
      // Send reply email
      await axios.post("/api/send-email", {
        to: replyingToEmail,
        subject: "Reply to your query",
        text: replyText,
      });

      await axios.put(`/api/exam?id=${replyingId}`, {
        replied: true,
      });
      const response = await axios.get<any>("/api/exam");
      setQueries(response.data);
      toast.success("Reply sent successfully");
      setIsReplySent(true);
    } catch (error) {
      console.error("Error replying to query:", error);
      toast.error("Failed to send reply");
    }
  };

  return (
    <Dashboard>
      <div className="overflow-x-auto my-8 bg-white p-8 rounded-xl shadow-xl">
        <Toaster position="top-center" reverseOrder={false} />
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="p-2">Email</th>
              <th className="p-2">Score(s)</th>
              {user?.permissions
                .map((permission: string) => permission.toLowerCase())
                .includes("edit".toLowerCase()) && (
                <th className="p-2">Action</th>
              )}
            </tr>
          </thead>
          <tbody className="">
            {currentItems.map((item: any, index: number) => (
              <tr key={index} className="">
                <td className="p-2">
                  <Link href={`mailto:${item.email}`}>{item.email}</Link>
                </td>

                <td className="p-2 text-center">
                  {item.scores.map((i:any, index:number) => (
                    <div key={index}>
                      <p>
                        {i}
                      </p>
                    </div>
                  ))}
                </td>

                <td className="p-2">
                  {user?.permissions
                    .map((permission: string) => permission.toLowerCase())
                    .includes("edit".toLowerCase()) && (
                    <div className="grid grid-cols-2 divide-x items-center">
                      <button
                        className="flex justify-center"
                        onClick={() => handleDelete(item._id)}
                      >
                        <img
                          loading="lazy"
                          src="/icons/delete_tvo46a.svg"
                          alt=""
                          className=""
                        />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end gap-8 items-center mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`bg-white shadow-inner rounded-full h-[50px] w-[50px] border flex items-center justify-center ${
              currentPage === 1 ? "cursor-not-allowed" : ""
            }`}
          >
            <HiOutlineChevronLeft />
          </button>
          <span className="font-bold">
            Page {currentPage} of {Math.ceil(queries.length / itemsPerPage)}
          </span>
          <button
            className={`bg-white shadow-inner rounded-full h-[50px] w-[50px] border flex items-center justify-center ${
              currentPage === Math.ceil(queries.length / itemsPerPage)
                ? "cursor-not-allowed"
                : ""
            }`}
            onClick={nextPage}
            disabled={currentPage === Math.ceil(queries.length / itemsPerPage)}
          >
            <HiOutlineChevronRight />
          </button>
        </div>
      </div>
    </Dashboard>
  );
}
