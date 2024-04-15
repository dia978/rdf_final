import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import * as Yup from "yup";

interface FormData {
  name: string;
  email: string;
  dob: string;
  contactDetails: string;
  educationalBackground: string;
}

function UserRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    dob: "",
    contactDetails: "",
    educationalBackground: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        dob: Yup.string().required("Date of birth is required"),
        contactDetails: Yup.string().required("Contact details are required"),
        educationalBackground: Yup.string().required(
          "Educational background is required"
        ),
      });

      await schema.validate(formData, { abortEarly: false });

      const age = calculateAge(formData.dob);
      if (age < 18) {
        toast.error("You must be at least 18 years old to submit the form");
        return;
      }

      if (age > 26) {
        toast.error("You must be 26 years old or younger to submit the form");
        return;
      }

      const response = await fetch("/api/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Form submitted successfully");
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          dob: "",
          contactDetails: "",
          educationalBackground: "",
        });
      } else {
        toast.error("Failed to submit form");
      }
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
      toast.error("Failed to submit form");
    } finally {
      setLoading(false);
    }
  }

  function calculateAge(dob: string): number {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit} className="grid gap-2">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="contactDetails">Contact Details:</label>
          <input
            type="number"
            id="contactDetails"
            name="contactDetails"
            value={formData.contactDetails}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="educationalBackground">Educational Background:</label>
          <select
            id="educationalBackground"
            name="educationalBackground"
            value={formData.educationalBackground}
            onChange={handleChange}
            required
          >
            <option value="">Select Educational Background</option>
            <option value="O-level's">O-level</option>
            <option value="A-level's">A-level</option>
            <option value="Bachelor's">Bachelor&apos;s</option>
            <option value="Master's">Master&apos;s</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
        {/* Other form inputs */}
        <div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            disabled={loading}
            className={`border-primary text-primary bg-white border rounded-lg gap-2 hover:bg-primary hover:border-[yellow] hover:text-white sm:text-xs p-2 md:px-4 md:py-2 flex items-center justify-center ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </motion.button>
        </div>
      </form>
    </>
  );
}

export default UserRegistrationForm;
