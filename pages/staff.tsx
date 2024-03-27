import React, { useEffect, useState } from "react";
import Dashboard from "../components/dashboard";
import Modal from "react-modal";
import { MdAddCircleOutline } from "react-icons/md";
import { decodeToken } from "../lib/jwt";
import axios from "axios";
import User from "../types/user";
import PaginatedTable from "../components/Atoms/Tables/PaginatedTable";
import toast, { Toaster } from "react-hot-toast";

const StaffPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [user, setUser] = useState<User>();
  const [staff, setStaff] = useState<User[]>([]);
  const [userToUpdate, setUserToUpdate] = useState<User | null>(null);

  const [newStaffData, setNewStaffData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    department: "",
  });
  const resetNewStaffData = () => {
    setNewStaffData({
      name: "",
      email: "",
      phoneNumber: "",
      department: "",
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("user_session");
    if (token) {
      const decodedUser = decodeToken(token);
      setUser(decodedUser);
    }

    // Fetch staff data
    axios.get("/api/staff").then((res) => setStaff(res.data));
  }, []);

  const handleOpenModal = (id: string, newData: User) => {
    setUserToUpdate(newData);
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStaffData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveStaff = () => {
    setLoading(true);
    axios.post("/api/staff", newStaffData).then((res) => {
      setStaff((prevStaff) => [...prevStaff, res.data]);
      closeModal();
      resetNewStaffData();
      toast.success("Saved Successful");
    });
    setLoading(false);
  };

  const handleDelete = (_id: string) => {
    axios.delete(`/api/staff/id=${_id}`).then(() => {
      setStaff((prevStaff) => prevStaff.filter((staff) => staff._id !== _id));
      toast.success("Deleted Successful");
    });
  };

  const handleUpdate = () => {
    setLoading(true);
    if (!userToUpdate || !userToUpdate._id) {
      setLoading(false);
      return;
    }

    const { _id, name, email, phoneNumber, department } = userToUpdate;
    axios
      .put(`/api/staff?id=${_id}`, { name, email, phoneNumber, department })
      .then(() => {
        setStaff((prevStaff) =>
          prevStaff.map((staff) =>
            staff._id === userToUpdate._id
              ? { ...staff, ...userToUpdate }
              : staff
          )
        );
        setIsModalOpen(false);
        toast.success("Updated Successful");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Error updating staff:", error);
      });
  };

  return (
    <Dashboard>
      <Toaster position="top-center" reverseOrder={false} />
      <main>
        <div>
          <h3 className="font-bold">Our Staff</h3>
          <p className="">Welcome Back, {user?.username || "Guest"} !</p>
        </div>
        <div className="flex justify-end gap-8 items-center mt-8">
          <button
            onClick={openModal}
            className="flex gap-2 items-center justify-center h-[50px] bg-[#4A6FBB] text-white text-center rounded-[6px] px-4"
          >
            <MdAddCircleOutline className="text-2xl" />
            Add Member
          </button>
        </div>
        <PaginatedTable
          user={user}
          users={staff}
          onDelete={handleDelete}
          onUpdate={handleOpenModal}
        />
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel={userToUpdate ? "Update Staff Modal" : "Add Staff Modal"}
          style={customStyles}
        >
          <div className="p-4 z-50">
            <Toaster position="top-center" reverseOrder={false} />
            {userToUpdate ? (
              <div>
                <h3 className="font-bold text-[#4A6FBB]">Update Staff</h3>
                {userToUpdate && (
                  <div>
                    <div className="flex w-full gap-4">
                      <div className="w-1/2">
                        <p className="font-bold mt-8 pb-2">Name</p>
                        <input
                          className="bg-[#B3B3B3]/25"
                          type="text"
                          name="name"
                          value={userToUpdate.name}
                          onChange={(e) =>
                            setUserToUpdate({
                              ...userToUpdate,
                              name: e.target.value,
                            })
                          }
                          placeholder="Enter Full Name..."
                        />
                      </div>
                      <div className="w-1/2">
                        <p className="font-bold mt-8 pb-2">Email</p>
                        <input
                          className="bg-[#B3B3B3]/25"
                          type="email"
                          name="email"
                          value={userToUpdate.email}
                          onChange={(e) =>
                            setUserToUpdate({
                              ...userToUpdate,
                              email: e.target.value,
                            })
                          }
                          placeholder="Enter Your Email..."
                        />
                      </div>
                    </div>
                    <div className="flex w-full gap-4">
                      <div className="w-1/2">
                        <p className="font-bold mt-8 pb-2">Phone Number</p>
                        <input
                          className="bg-[#B3B3B3]/25"
                          type="text"
                          name="phoneNumber"
                          value={userToUpdate.phoneNumber}
                          onChange={(e) =>
                            setUserToUpdate({
                              ...userToUpdate,
                              phoneNumber: e.target.value,
                            })
                          }
                          placeholder="Enter Phone Number..."
                        />
                      </div>
                      <div className="w-1/2">
                        <p className="font-bold mt-8 pb-2">Department</p>
                        <input
                          className="bg-[#B3B3B3]/25"
                          type="text"
                          name="department"
                          value={userToUpdate.department}
                          onChange={(e) =>
                            setUserToUpdate({
                              ...userToUpdate,
                              department: e.target.value,
                            })
                          }
                          placeholder="Enter Department..."
                        />
                      </div>
                    </div>
                    <div className="flex justify-center gap-8 my-8">
                      <button
                        className="px-4 py-2 bg-[#4A6FBB] w-[120px] h-[50px] rounded-[9px] shadow text-white font-bold"
                        onClick={handleUpdate}
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Update"}
                      </button>
                      <button
                        className="px-4 py-2 bg-white w-[120px] h-[50px] rounded-[9px] shadow font-bold"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h3 className="font-bold text-[#4A6FBB]">Create New Staff</h3>
                <p className="text-[#4A6FBB]">Add New Staff Member</p>
                <div className="flex w-full gap-4">
                  <div className="w-1/2">
                    <p className="font-bold mt-8 pb-2">Name</p>
                    <input
                      className="bg-[#B3B3B3]/25"
                      type="text"
                      name="name"
                      value={newStaffData.name}
                      onChange={handleInputChange}
                      placeholder="Enter Full Name..."
                    />
                  </div>
                  <div className="w-1/2">
                    <p className="font-bold mt-8 pb-2">Email</p>
                    <input
                      className="bg-[#B3B3B3]/25"
                      type="email"
                      name="email"
                      value={newStaffData.email}
                      onChange={handleInputChange}
                      placeholder="Enter Your Email..."
                    />
                  </div>
                </div>
                <div className="flex w-full gap-4">
                  <div className="w-1/2">
                    <p className="font-bold mt-8 pb-2">Phone Number</p>
                    <input
                      className="bg-[#B3B3B3]/25"
                      type="text"
                      name="phoneNumber"
                      value={newStaffData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Enter Phone Number..."
                    />
                  </div>
                  <div className="w-1/2">
                    <p className="font-bold mt-8 pb-2">Department</p>
                    <input
                      className="bg-[#B3B3B3]/25"
                      type="text"
                      name="department"
                      value={newStaffData.department}
                      onChange={handleInputChange}
                      placeholder="Enter Department..."
                    />
                  </div>
                </div>
                <div className="flex justify-center gap-8 my-8">
                  <button
                    className="px-4 py-2 bg-[#4A6FBB] w-[120px] h-[50px] rounded-[9px] shadow text-white font-bold"
                    onClick={handleSaveStaff}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Save"}
                  </button>
                  <button
                    className="px-4 py-2 bg-white w-[120px] h-[50px] rounded-[9px] shadow font-bold"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </main>
    </Dashboard>
  );
};

export default StaffPage;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "#000",
    maxWidth: "50vw",
    width: "100%",
  },
};
