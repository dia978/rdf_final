import Link from "next/link";
import { MdEmail, MdLocationPin, MdMail, MdPhone } from "react-icons/md";
import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { motion } from "framer-motion";
import { Renderable, Toast, Toaster, toast } from "react-hot-toast";
import RootLayout from "../components/Layout";

const validationSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  email: yup.string().email("invalid email").required("email is required"),
  message: yup.string().required("message is required"),
});

export default function ContactPage() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        // Send POST request to API endpoint
        await axios.post("/api/query", values);
        toast.success("Form submitted successfully!"); // Display success message
        resetForm();
      } catch (error) {
        toast.error("An error occurred. Please try again later.");
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <RootLayout>
      <main>
        <Toaster position="top-center" reverseOrder={false} />
        <section
          className="flex justify-center"
          style={{
            backgroundImage: `url(${"h/icons/white2_qkbyoe.svg"})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        >
          <section className="md:w-[80%] sm:w-[80%] py-12">
            <div className="flex w-full justify-center">
              <form onSubmit={formik.handleSubmit} className="w-3/4">
                <div>
                  <h2 className="text-primary md:mb-6 sm:mb-4 font-bold uppercase">
                    Query Form
                  </h2>
                  <div className="mb-4">
                    <p className="pb-1">Name</p>
                    <input
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your name"
                      className={
                        formik.errors.name && formik.touched.name
                          ? "border-[red]"
                          : ""
                      }
                    />
                    {formik.errors.name && formik.touched.name && (
                      <span className="text-[red]">{formik.errors.name}</span>
                    )}
                  </div>
                  <div className="my-4">
                    <p className="pb-1">Email</p>
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="example@gmail.com"
                      className={
                        formik.errors.email && formik.touched.email
                          ? "border-[red]"
                          : ""
                      }
                    />
                    {formik.errors.email && formik.touched.email && (
                      <span className="text-[red]">{formik.errors.email}</span>
                    )}
                  </div>
                  <div className="my-4">
                    <p className="pb-1">Message</p>
                    <textarea
                      name="message"
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Your message for us"
                      rows={4}
                      className={
                        formik.errors.message && formik.touched.message
                          ? "border-[red]"
                          : ""
                      }
                    />
                    {formik.errors.message && formik.touched.message && (
                      <span className="text-[red]">
                        {formik.errors.message}
                      </span>
                    )}
                  </div>
                  <div className="my-8 flex justify-center">
                    <motion.button
                      type="submit"
                      disabled={formik.isSubmitting}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        background: "#fff",
                        color: "#4b5320",
                        border: "1px solid var(--color-border)",
                      }}
                      className="border rounded-lg gap-2 hover:bg-primary hover:border-[yellow] hover:text-white sm:text-xs p-2 md:px-4 md:py-2 flex items-center justify-center"
                    >
                      {formik.isSubmitting ? "Submitting..." : "Submit form"}
                    </motion.button>
                  </div>
                </div>
              </form>
            </div>
            <section className="flex justify-center text-black w-full">
              <div className="w-[80%] grid gap-16 place-items-center h-full">
                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-16">
                  <div className="grid gap-12 py-12 rounded-xl border-2 border-primary">
                    <div className="flex justify-center gap-4 items-center">
                      <h3>
                        {" "}
                        <MdPhone className="" />
                      </h3>

                      <h3 className="font-bold text-primary">Talk to Us</h3>
                    </div>
                    <div className="flex justify-center w-full">
                      <p className="text-center w-[80%]">
                        We welcome your thoughts, questions, and feedback.
                        Whether you&lsquo;re a member of the community, a
                        potential partner, or simply interested in learning more
                        about us, we&lsquo;re here to listen. Your input helps
                        us grow, improve, and better serve our mission.
                        Don&lsquo;t hesitate to reach out and start a
                        conversation with us. Let&lsquo;s work together to make
                        a positive impact and build a brighter future.
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <Link href={"tel:+250788888888"}>
                        <span className="text-center text-[#4b5320] font-bold underline">
                          +250 788 888 888
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="grid gap-12 py-12 rounded-xl border-2 border-primary">
                    <div className="flex justify-center gap-4 items-center">
                      <h3>
                        <MdEmail className="" />
                      </h3>

                      <p className="font-bold text-primary">Email Us</p>
                    </div>
                    <div className=" flex justify-center w-full">
                      <p className="text-center w-[80%]">
                        If you prefer to communicate via email, please feel free
                        to reach out to us at{" "}
                        <Link href={"mailto:info@rdf.rw"}>
                          <span className="text-center text-[#4b5320] font-bold underline">
                            info@rdf.rw
                          </span>
                        </Link>
                        . Whether you have inquiries, suggestions, or
                        collaboration proposals, we&lsquo;re here to respond
                        promptly and assist you in any way we can. Looking
                        forward to hearing from you!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </section>
      </main>
    </RootLayout>
  );
}
