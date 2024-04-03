import React, { useEffect, useState } from "react";
import Dashboard from "@/components/dashboard";
import Modal from "react-modal";
import { MdAddCircleOutline } from "react-icons/md";
import UnauthorizedPage from "@/components/UnauthorizedPage";
import User from "../types/user";
import { decodeToken } from "../lib/jwt";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import UserPaginatedTable from "@/components/Atoms/Tables/UserPaginatedTable";

interface NewUser {
  name: string;
  email: string;
  phoneNumber: string;
  department: string;
  password: string;
  permissions: string[];
  role: "user" | "admin";
  [key: string]: string | string[]; // Index signature
}
const UsersPage = () => {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userStaff, setUserStaff] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffList, setStaffList] = useState<User[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<string>("");
  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    email: "",
    phoneNumber: "",
    department: "",
    password: "",
    permissions: [],
    role: "user",
  });
  const [userToUpdate, setUserToUpdate] = useState<User | null>(null);

  const handleOpenModal = (id: string, newData: User) => {
    setUserToUpdate(newData);
    setIsModalOpen(true);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStaff("");
    setNewUser({
      name: "",
      email: "",
      phoneNumber: "",
      department: "",
      password: "",
      permissions: [],
      role: "user",
    });
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setPermissions((prevPermissions) => {
      if (checked) {
        // Add the permission if checked
        return [...prevPermissions, permission];
      } else {
        // Remove the permission if unchecked
        return prevPermissions.filter((p) => p !== permission);
      }
    });
  };

  const [user, setUser] = useState<User>();
  const [isAuthorized, setIsAuthorized] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  useEffect(() => {
    const token = localStorage.getItem("user_session");
    if (token) {
      const decodedUser = decodeToken(token);
      setUser(decodedUser);
    }

    axios.get("/api/users").then((res) => setUsers(res.data));
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStaffName = e.target.value;
    // Find the selected staff member by name
    const selectedStaff = staffList.find(
      (staff) => staff.name === selectedStaffName
    );
    if (selectedStaff) {
      // Update the state of the new user with the corresponding values
      setNewUser({
        ...newUser,
        name: selectedStaff.name,
        email: selectedStaff.email,
        phoneNumber: selectedStaff.phoneNumber,
        department: selectedStaff.department,
      });
    }
  };

  const handleSaveUser = async () => {
    // Check for empty fields
    for (const key in newUser) {
      if (!newUser[key]) {
        toast.error(`${key} field cannot be empty`);
        return;
      }
    }

    if (newUser.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (
      !/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}/.test(
        newUser.password
      )
    ) {
      toast.error(
        "Password must contain at least one uppercase letter, one number, and one special character"
      );
      return;
    }

    newUser.permissions = permissions;
    // Send POST request to create user
    try {
      const response = await axios.post("/api/users", newUser);
      const createdUser = response.data;
      // Update the state to include the newly created user
      setUsers((prevUsers) => [...prevUsers, createdUser]);
      closeModal();
      toast.success("User created successfully!");
    } catch (error) {
      // Handle error
      console.error(error);
      toast.error("An error occurred while creating user");
    }
  };

  const handleUpdate = () => {
    // Check if userToUpdate is null
    if (!userToUpdate) {
      toast.error("User data is missing");
      return;
    }

    // Check for empty fields
    for (const key in userToUpdate) {
      // Use optional chaining to safely access properties
      if (!userToUpdate[key as keyof User]) {
        toast.error(`${key} field cannot be empty`);
        return;
      }
    }

    axios
      .put(`/api/users?id=${userToUpdate._id}`, userToUpdate)
      .then(() => {
        setUsers((prevStaff) =>
          prevStaff.map((staff) =>
            staff._id === userToUpdate._id
              ? { ...staff, ...userToUpdate }
              : staff
          )
        );
        setIsModalOpen(false);
        toast.success("User updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating staff:", error);
        toast.error("An error occurred while updating user");
      });
  };

  useEffect(() => {
    // Fetch staff list
    axios.get("/api/staff").then((res) => setStaffList(res.data));
  }, []);

  const handleDelete = (_id: string) => {
    axios
      .delete(`/api/users?id=${_id}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== _id));
        toast.success("User deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error("An error occurred while deleting user");
      });
  };
  const isAdmin = user?.role === "admin";
  const canEdit = user?.permissions.includes("edit");

  if (!isAdmin || !canEdit) {
    return <UnauthorizedPage />;
  } else {
    return (
      <Dashboard>
        <Toaster position="top-center" reverseOrder={false} />
        <main>
          <div>
            <h3 className="font-bold">The Users</h3>
            <p className="">
              Welcome Back, {user?.name ? user.name.split(" ")[0] : "Guest"}!
            </p>
          </div>
          <div className="flex justify-end gap-8 items-center mt-8">
            <button
              onClick={openModal}
              className="flex gap-2 items-center justify-center h-[50px] bg-[#4A6FBB] text-white text-center rounded-[6px] px-4"
            >
              <MdAddCircleOutline className="text-2xl" />
              Add User
            </button>
          </div>
          <UserPaginatedTable
            users={users}
            onDelete={handleDelete}
            onUpdate={handleOpenModal}
          />

          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel={userToUpdate ? "Update User Modal" : "Add User Modal"}
            style={customStyles}
          >
            <Toaster position="top-center" reverseOrder={false} />
            {userToUpdate ? (
              <div>
                <h3 className="font-bold text-[#4A6FBB]">Update User</h3>
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
                    <div className="mt-4">
                      <p className="my-2">Password</p>
                      <input
                        type="password"
                        name="password"
                        onChange={(e) =>
                          setUserToUpdate({
                            ...userToUpdate,
                            password: e.target.value,
                          })
                        }
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                        title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
                        className="border border-gray-400 py-2 px-4 rounded w-full focus:outline-none focus:border-primary"
                      />
                      <p className="my-2">Confirm Password</p>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="xxxxxx"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                          }}
                          className="w-full pr-10 rounded border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                        />
                        <div
                          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="my-2">Permissions</p>
                      <div className="flex flex-col gap-2 w-1/4">
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            id="viewPermission"
                            checked={permissions.includes("view")}
                            onChange={(e) =>
                              handlePermissionChange("view", e.target.checked)
                            }
                          />
                          <label htmlFor="viewPermission">View</label>
                        </div>
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            id="editPermission"
                            checked={permissions.includes("edit")}
                            onChange={(e) =>
                              handlePermissionChange("edit", e.target.checked)
                            }
                          />
                          <label htmlFor="editPermission">Edit</label>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="my-2">Role</p>
                      <select
                        value={userToUpdate.role}
                        onChange={(e) =>
                          setUserToUpdate({
                            ...userToUpdate,
                            role: e.target.value as "user" | "admin",
                          })
                        }
                        className="border border-gray-400 py-2 px-4 rounded w-full focus:outline-none focus:border-primary"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="flex justify-center gap-8 my-8">
                      <button
                        className="px-4 py-2 bg-[#4A6FBB] w-[120px] h-[50px] rounded-[9px] shadow text-white font-bold"
                        onClick={handleUpdate}
                      >
                        Update
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
              <div className="p-4 z-50">
                <h3 className="font-bold text-[#4A6FBB]">Create User</h3>
                <p className="text-[#4A6FBB]">Add New User To the System</p>
                <div className="flex w-full gap-4 mt-4">
                  <div className="w-1/2">
                    <p className="mb-3">
                      Names<span className="">(Select Staff)</span>
                    </p>
                    <input
                      name="name"
                      value={newUser.name}
                      onChange={handleInputChange}
                      className="border border-gray-400 py-2 px-4 rounded w-full focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="w-1/2">
                    <p className="mb-3">Email</p>
                    <input
                      name="email"
                      value={newUser.email}
                      onChange={handleInputChange}
                      className="border border-gray-400 py-2 px-4 rounded w-full focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div className="flex w-full gap-4 mt-4">
                  <div className="w-1/2">
                    <p className="mb-3">Phone Number</p>
                    <input
                      name="phoneNumber"
                      value={newUser.phoneNumber}
                      onChange={handleInputChange}
                      className="border border-gray-400 py-2 px-4 rounded w-full focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="w-1/2">
                    <p className="mb-3">Department</p>
                    <input
                      name="department"
                      value={newUser.department}
                      onChange={handleInputChange}
                      className="border border-gray-400 py-2 px-4 rounded w-full focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="my-2">Password</p>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={handleInputChange}
                      pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$"
                      title="Password must contain at least one uppercase letter, one number, and one special character"
                      className="border border-gray-400 py-2 px-4 rounded w-full focus:outline-none focus:border-primary"
                    />

                    <div
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <BsEye /> : <BsEyeSlash />}
                    </div>
                  </div>
                  <p className="my-2">Confirm Password</p>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      className="border border-gray-400 py-2 px-4 rounded w-full focus:outline-none focus:border-primary"
                    />
                    <div
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="my-2">Permissions</p>
                  <div className="flex flex-col gap-2 w-1/4">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        id="viewPermission"
                        checked={permissions.includes("view")}
                        onChange={(e) =>
                          handlePermissionChange("view", e.target.checked)
                        }
                      />
                      <label htmlFor="viewPermission">View</label>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        id="editPermission"
                        checked={permissions.includes("edit")}
                        onChange={(e) =>
                          handlePermissionChange("edit", e.target.checked)
                        }
                      />
                      <label htmlFor="editPermission">Edit</label>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="my-2">Role</p>
                  <select
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        role: e.target.value as "user" | "admin",
                      })
                    }
                    className="border border-gray-400 py-2 px-4 rounded w-full focus:outline-none focus:border-primary"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="flex justify-center gap-8 my-8">
                  <button
                    className="px-4 py-2 bg-[#4A6FBB] w-[120px] h-[50px] rounded-[9px] shadow text-white font-bold"
                    onClick={handleSaveUser}
                  >
                    Save
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
          </Modal>
        </main>
      </Dashboard>
    );
  }
};

export default UsersPage;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "#000",
    maxWidth: "50vw", // Set 75% of the viewport width
    width: "100%", // Ensure the modal takes up the full width within 75vw
  },
};
