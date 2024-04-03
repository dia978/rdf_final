/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import User from "../types/user";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

interface QueryProps {
  user: User | undefined;
}

export default function Query({ user }: QueryProps) {
  const itemsPerPage: number = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [queries, setQueries] = useState<any>([]);
  const [replyText, setReplyText] = useState<string>("");
  const [replyingToEmail, setReplyingToEmail] = useState<string>("");
  const [replyingId, setReplyingId] = useState<string>("");
  const [isReplySent, setIsReplySent] = useState<boolean>(false);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await axios.get<any>("/api/query");
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
      await axios.delete(`/api/query?id=${id}`);
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

  const sendReply = async (userName: string) => {

    try {
      // Constructing HTML content for the email
      const emailHTML = `
        <div style="">
          <p>Dear ${userName},</p>
          <p>${replyText}</p>
          <p>Best Regards,<br>Green Hills Academy Team</p>

        </div>
      `;

      // Send reply email
      await axios.post("/api/send-email", {
        to: replyingToEmail,
        subject: "Response to Your Inquiry | GHA",
        text: replyText,
        html: emailHTML,
      });

      await axios.put(`/api/query?id=${replyingId}`, {
        replied: true,
        replyText: replyText,
      });
      const response = await axios.get<any>("/api/query");
      setQueries(response.data);
      toast.success("Reply sent successfully");
      setIsReplySent(true);
    } catch (error) {
      console.error("Error replying to query:", error);
      toast.error("Failed to send reply");
    }
  };

  return (
    <div className="overflow-x-auto my-8 bg-white p-8 rounded-xl shadow-xl">
      <Toaster position="top-center" reverseOrder={false} />
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Message</th>
            <th className="p-2">Reply</th>
            {user?.permissions
              .map((permission: string) => permission.toLowerCase())
              .includes("edit".toLowerCase()) && (
              <th className="p-2">Action</th>
            )}
          </tr>
        </thead>
        <tbody className="text-center">
          {currentItems.map(
            (
              item: {
                replyText: string;
                name: string;
                email: string;
                message: string;
                replied: boolean;
                _id: string;
              },
              index: number
            ) => (
              <tr key={index} className="">
                <td className="p-2">{item.name}</td>
                <td className="p-2">
                  <Link href={`mailto:${item.email}`}>{item.email}</Link>
                </td>
                <td className="p-2">{item.message}</td>
                <td className="p-2">
                  {item.email && (
                    <>
                      {!isReplySent && replyingId === item._id ? (
                        <>
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows={3}
                            className="mt-2 p-2 border border-gray-300 rounded"
                          ></textarea>
                          <button
                            onClick={() => sendReply(item.name)}
                            className="mt-2 bg-primary text-white rounded-xl p-2"
                          >
                            Send
                          </button>
                        </>
                      ) : item.replied == true ? (
                        <>
                          {item.replyText && <div>{item.replyText}</div>}
                          <span className="p-1 text-sm rounded-xl bg-[orange]">
                            Replied
                          </span>
                        </>
                      ) : (
                        <button
                          className="text-white bg-primary rounded-xl p-2"
                          onClick={() =>
                            handleReply(
                              item.email as string,
                              item._id as string
                            )
                          }
                        >
                          Reply
                        </button>
                      )}
                    </>
                  )}
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
            )
          )}
        </tbody>
      </table>
      <div className="flex justify-end gap-8 items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`bg-white shadow-inner shadow-xl rounded-full h-[50px] w-[50px] border flex items-center justify-center ${
            currentPage === 1 ? "cursor-not-allowed" : ""
          }`}
        >
          <HiOutlineChevronLeft />
        </button>
        <span className="font-bold">
          Page {currentPage} of {Math.ceil(queries.length / itemsPerPage)}
        </span>
        <button
          className={`bg-white shadow-inner shadow-xl rounded-full h-[50px] w-[50px] border flex items-center justify-center ${
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
  );
}
