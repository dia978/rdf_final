/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import User from "../../../types/user";

interface UserProps {
  users: User[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, newData: User) => void;
}

const UserPaginatedTable: React.FC<UserProps> = ({ users,onDelete, onUpdate  }) => {

const itemsPerPage: number = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;

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
            <th className="border-b border-gray-400 p-2">Permission</th>
            <th className="border-b border-gray-400 p-2">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {users.slice(indexOfFirstItem, indexOfLastItem).map((user, index) => (
            <tr key={index} className="">
              <td className="py-4 border-b items-center gap-4 border-gray-400 p-2 flex sm:flex-wrap">
                <img
                  src={user.profilePicture}
                  alt="avatar"
                  className="rounded-full w-[55px] h-[55px]"
                />
                <p className="">{user.name}</p>
              </td>
              <td className="border-b border-gray-400 p-2">
                {user.email}
              </td>
              <td className="border-b border-gray-400 p-2">
                {user.phoneNumber}
              </td>
              <td className="border-b border-gray-400 p-2">{user.department}</td>
              <td className="border-b border-gray-400 p-2">{user.permissions.join(", ")}</td>
              <td className="border-b border-gray-400 p-2">
                <div className="grid grid-cols-2 divide-x items-center">
                  <button onClick={() => onUpdate(user._id,user)} className="flex justify-center">
                    <img
                      src="/icons/update_ijqjnj.svg"
                      alt=""
                    />
                  </button>
                  <button onClick={() => onDelete(user._id)} className="flex justify-center">
                    <img
                      src="/icons/delete_tvo46a.svg"
                      alt=""
                    />
                  </button>
                </div>
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

export default UserPaginatedTable;
