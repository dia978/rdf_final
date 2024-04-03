import RootLayout from "@/components/Layout";
import UserRegistrationForm from "@/components/UserRegistrationForm";
import React from "react";

export default function UserRegistration() {
  return (
    <RootLayout>
    <main
      className="flex justify-center pt-12"
      style={{
        backgroundImage: `url(${"h/icons/white2_qkbyoe.svg"})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      <section className="md:w-[80%] sm:w-[80%] py-12 flex justify-center">
        <div className="w-3/4 rounded shadow-xl border p-4">
          <h2 className="text-center text-primary md:mb-6 sm:mb-4 font-bold uppercase">
            Application Portal
          </h2>
          <UserRegistrationForm />
        </div>
      </section>
    </main>
    </RootLayout>
  );
}
