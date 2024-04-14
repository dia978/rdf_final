/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import User from "../../../types/user";

interface UserProps {
  user: User | undefined;
  users: User[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, newData: User) => void;
}


const PaginatedTable = ({ user, users, onDelete, onUpdate }: UserProps) => {
  const itemsPerPage: number = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems: User[] = users.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(users.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="overflow-x-auto my-8 bg-white p-8 rounded-xl shadow-xl">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="border-b border-gray-400 p-2">Name</th>
            <th className="border-b border-gray-400 p-2">Email</th>
            <th className="border-b border-gray-400 p-2">Phone</th>
            <th className="border-b border-gray-400 p-2">Department</th>
            {user?.permissions
          .map((permission: string) => permission.toLowerCase())
          .includes("edit".toLowerCase()) && (
              <th className="border-b border-gray-400 p-2">Action</th>
            )}
          </tr>
        </thead>
        <tbody className="text-center">
          {currentItems.map((person, index) => (
            <tr key={index} className="">
              <td className="py-4 border-b items-center gap-4 border-gray-400 p-2 flex sm:flex-wrap">
                <img
                  src="/images/profile.png"
                  alt=""
                  className="rounded-full w-[55px] h-[55px]"
                />
                <p className="">{person.name}</p>
              </td>
              <td className="border-b border-gray-400 p-2">
                <Link href={""} className="">
                  {person.email}
                </Link>
              </td>
              <td className="border-b border-gray-400 p-2">
                <Link href={""}>{person.phoneNumber}</Link>
              </td>
              <td className="border-b border-gray-400 p-2">{person.department}</td>
              <td className="border-b border-gray-400 p-2">
                {/* {user?.permissions
          .map((permission: string) => permission.toLowerCase())
          .includes("edit".toLowerCase()) && ( */}
                  <div className="grid grid-cols-2 divide-x items-center">
                    <button onClick={() => onUpdate(person._id, person)} className="flex justify-center">

                      <img loading="lazy" src="/icons/update_ijqjnj.svg" alt="" className="" />
                    </button>
                    <button onClick={() => onDelete(person._id)} className="flex justify-center">

                      <img loading="lazy" src="/icons/delete_tvo46a.svg" alt="" className="" />
                    </button>
                  </div>
                {/* )} */}
              </td>
            </tr>
          ))}
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
          Page {currentPage} of {Math.ceil(users.length / itemsPerPage)}
        </span>

        <button
          className={`bg-white shadow-inner shadow-xl rounded-full h-[50px] w-[50px] border flex items-center justify-center ${
            currentPage === Math.ceil(users.length / itemsPerPage)
              ? "cursor-not-allowed"
              : ""
          }`}
          onClick={nextPage}
          disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
        >
          <HiOutlineChevronRight />
        </button>
      </div>
    </div>
  );
};

export default PaginatedTable;
