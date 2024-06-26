/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import User from "../types/user";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Dashboard from "@/components/dashboard";
import { decodeToken } from "../lib/jwt";

export default function Query() {
  const [user, setUser] = useState<User>();
  const itemsPerPage: number = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [queries, setQueries] = useState<any>([]);
  const [loadingStates, setLoadingStates] = useState<any>({});

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
      const response = await axios.get<any>("/api/application");
      setQueries(response.data);
      // Initialize loading states for each query item
      const initialLoadingStates = response.data.reduce(
        (acc: any, query: any) => {
          acc[query._id] = false;
          return acc;
        },
        {}
      );
      setLoadingStates(initialLoadingStates);
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
      await axios.delete(`/api/application?id=${id}`);
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent,
    id: string,
    email: string
  ) => {
    e.preventDefault();
    // Set loading state for the current item to true
    setLoadingStates((prevState: any) => ({ ...prevState, [id]: true }));
    try {
      const response = await axios.post("/api/send-exam", { email });
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error sending password reset request:", error);
      toast.error(
        "An error occurred while processing your request. Please try again later."
      );
    } finally {
      // Set loading state for the current item back to false
      setLoadingStates((prevState: any) => ({ ...prevState, [id]: false }));
    }
  };
  return (
    <Dashboard>
      <div className="overflow-x-auto my-8 bg-white p-8 rounded-xl shadow-xl">
        <Toaster position="top-center" reverseOrder={false} />
        <table className="min-w-full">
          <thead className="text-left">
            <tr>
              <th className="border-b border-gray-400 p-2">Name</th>
              <th className="border-b border-gray-400 p-2">Email</th>
              <th className="border-b border-gray-400 p-2">Details</th>
              <th className="border-b border-gray-400 p-2">Education</th>
              {user?.permissions
                .map((permission: string) => permission.toLowerCase())
                .includes("edit".toLowerCase()) && (
                <th className="border-b border-gray-400 p-2">Action</th>
              )}
            </tr>
          </thead>
          <tbody className="">
            {currentItems.map(
              (
                item: {
                  sentExam: boolean;
                  name: string;
                  email: string;
                  dob: string;
                  contactDetails: string;
                  educationalBackground: string;
                  _id: string;
                },
                index: number
              ) => (
                <tr key={index} className="">
                  <td className="py-4 border-b gap-4 border-gray-400 p-2">
                    <p className="">{item.name}</p>
                  </td>
                  <td className="border-b border-gray-400 p-2">
                    <Link href="">{item.email}</Link>
                  </td>
                  <td className="border-b border-gray-400 p-2">
                    <p className="text-sm">DOB: {item.dob}</p>
                    <p className="text-sm">Phone: {item.contactDetails}</p>
                  </td>
                  <td className="border-b border-gray-400 p-2">
                    {item.educationalBackground}
                  </td>

                  <td className="border-b border-gray-400 p-2">
                    {item.sentExam?<div>Sent</div>:<button
                      onClick={(e) => handleSubmit(e, item._id, item.email)}
                      disabled={loading} // Disable the button when loading is true
                      className="p-2 bg-[orange] rounded-xl"
                    >
                      {loading ? "Sending..." : "Send Exam"}
                    </button>}
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
    </Dashboard>
  );
}
