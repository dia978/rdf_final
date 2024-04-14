/* eslint-disable @next/next/no-img-element */
import Dashboard from "@/components/dashboard";
import React, { useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { decodeToken } from "../lib/jwt";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import axios from "axios";

const ProfilePage = () => {
  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profile, setProfile] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPass, setLoadingPass] = useState<boolean>(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("user_session");
    if (token) {
      const user = decodeToken(token);
      setNames(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phoneNumber || "");
      setDepartment(user.department || "");
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFiles(selectedFiles);
      const urls = Array.from(selectedFiles).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages(urls);
    }
  };

  const passwordSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
      .nullable()
      .required("Confirm password is required"),
  });

  const handlePasswordSave = async () => {
    setLoadingPass(true);
    await passwordSchema.validate(
      {
        currentPassword,
        newPassword,
        confirmPassword,
      },
      { abortEarly: false }
    );

    if (
      !/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}/.test(
        newPassword
      )
    ) {
      toast.error(
        "Password must contain at least one uppercase letter, one number, and one special character"
      );
      setLoadingPass(false);
      return;
    }
    axios
      .put("/api/profile", {
        email,
        currentPassword,
        newPassword,
      })
      .then((res) => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        toast.success("Password updated successfully!");
        setLoadingPass(false);
      })
      .catch((error) => {
        const response = error.response.data.message;
        setLoadingPass(false);
        toast.error(response);
      });
  };

  const profileSchema = Yup.object().shape({
    names: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    department: Yup.string().required("Department is required"),
  });

  const handleSubmitSave = async () => {
    setLoading(true);
    try {
      if (files) {
        if (!files || files.length === 0) {
          toast.error("Please upload images");
          return;
        }

        if (files.length > 1) {
          toast.error("You can only upload one image at a time.");
          return;
        }
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          if (!file.name.toLowerCase().endsWith(".png")) {
            toast.error("Please upload PNG images only.");
            setLoading(false);
            return;
          }
          if (file.size > 5 * 1024 * 1024) {
            toast.error(`File size exceeds the limit (5MB).`);
            setLoading(false);
            return;
          }
          formData.append("images", file);
        }

        const response = await axios.post<{ urls: string[] }>(
          "https://greenhillsacademy.rw:8081/upload",
          formData
        );
        setProfile(response.data.urls[0]);
      }

      await profileSchema.validate(
        {
          names,
          email,
          phone,
          department,
          profilePicture: profile,
        },
        { abortEarly: false }
      );

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          names,
          email,
          phone,
          department,
          profilePicture: profile,
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setLoading(false);
        throw toast.error("Failed to update profile");
      }
      setLoading(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setLoading(false);
      toast.error(
        "An error occurred while updating the profile. Please try again later."
      );
    }
  };

  return (
    <Dashboard>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
        <h3 className="font-bold">Profile</h3>
        <p className="">Welcome Back, {names.split(" ")[0] || "Guest"}!</p>

        <div className="flex my-8 gap-12 p-4">
          <div className="w-1/3 h-1/2 rounded-[15px] bg-white shadow-xl border p-12">
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={
                    profile ||
                    "/images/profile.png"
                  }
                  alt=""
                  className="rounded-full w-[80px] h-[80px]"
                />
                <div className="absolute bottom-0 right-0 h-4 w-4 bg-primary rounded-full" />
              </div>
            </div>
            <p className="text-center pt-3">{names}</p>
            <p className="text-center">{email}</p>
            <div className="flex w-full gap-4 items-center mt-4">
              <p className=" w-1/2">Phone</p>
              <span className="text-md break-words w-1/2">{phone}</span>
            </div>
            <div className="flex w-full gap-4 items-center mt-4">
              <p className="w-1/2">Department</p>
              <span className="text-md break-words w-1/2">{department}</span>
            </div>
          </div>
          <div className="w-2/3 rounded-[15px] bg-white shadow-xl border p-12">
            <p>Profile </p>
            <hr className="my-4" />
            <div className="w-full flex gap-8">
              <div className="w-1/2">
                <p className="my-2">Names</p>
                <input
                  type="text"
                  placeholder="Full names"
                  value={names}
                  onChange={(e) => {
                    setNames(e.target.value);
                  }}
                  className=""
                />
              </div>

              <div className="w-1/2">
                <p className="my-2">Email Address</p>
                <input
                  type="email"
                  placeholder="someone@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className=""
                  disabled
                />
              </div>
            </div>
            <div className="w-full flex gap-8">
              <div className="w-1/2">
                <p className="my-2">Phone Number</p>
                <input
                  type="tel"
                  placeholder="+250xxx"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  className=""
                />
              </div>
              <div className="w-1/2">
                <p className="my-2">Department</p>
                <input
                  type="text"
                  placeholder="instructor"
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                  className=""
                />
              </div>
            </div>
            <div className="w-full flex gap-8">
              <div className="w-1/2">
                <p className="my-2">Profile Picture</p>
                <input
                  type="file"
                  accept=".png"
                  onChange={handleFileChange}
                  className=""
                />
                {selectedImages.length > 0 && (
                  <div className="my-4">
                    {selectedImages.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Selected Image ${index + 1}`}
                        className="h-20 mr-4"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center gap-8 items-center my-8">
              <button
                onClick={handleSubmitSave}
                className="w-[124px] h-[43px] bg-[#4A6FBB] text-white text-center rounded-[6px]"
                disabled={loading}
              >
                {loading ? "Loading..." : "Save"}
              </button>
            </div>
            <p>Password </p>
            <hr className="my-4" />
            <p className="my-2">Current Password</p>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="xxxxxx"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full pr-10 rounded border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
              <div
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <BsEye /> : <BsEyeSlash />}
              </div>
            </div>
            <p className="my-2">New Password</p>
            <div className="relative">
              <input
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
                type={showNewPassword ? "text" : "password"}
                placeholder="xxxxxx"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pr-10 rounded border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
              <div
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <BsEye /> : <BsEyeSlash />}
              </div>
            </div>

            <p className="my-2">Confirm Password</p>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="xxxxxx"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pr-10 rounded border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
              <div
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
              </div>
            </div>
            <div className="flex justify-center gap-8 items-center my-8">
              <button
                className="w-[124px] h-[43px] bg-[#4A6FBB] text-white text-center rounded-[6px]"
                onClick={handlePasswordSave}
                disabled={loadingPass}
              >
                {loadingPass ? "Loading..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default ProfilePage;
