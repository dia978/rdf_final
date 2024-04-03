import DecoratedList from "@/components/Atoms/decoratedList";
import RootLayout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function About() {
  const [activeTab, setActiveTab] = useState("about");

  const handleTabClick = (tab:any) => {
    setActiveTab(tab);
  };
  return (
    <RootLayout>
      <section className="w-full h-full py-16 flex-col items-center flex bg-white justify-center text-black">
        <div
          className="w-[90%] h-full flex flex-col items-center gap-8"
          id="about"
        >
          <div className="grid md:grid-cols-2 gap-16 w-full h-full">
            <div className="md:h-[80vh] w-full md:border-l-[20px] md:border-b-[20px] sm:border-[5px] border-primary">
              <div className="md:ml-4 md:-mt-4 h-full w-full">
                <Image
                unoptimized
                placeholder="empty"
                blurDataURL={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' rx='8' ry='8' fill='%23E2E8F0'/%3E%3Cline x1='0' y1='0' x2='60' y2='60' stroke='%234B5563' stroke-width='1.5'/%3E%3Cline x1='60' y1='0' x2='0' y2='60' stroke='%234B5563' stroke-width='1.5'/%3E%3C/svg%3E`}
                width={0}
                height={0}
                sizes="100vw"
                  src="/images/csm_1_550f3dd2a4.jpg"
                  className="object-cover w-full h-full md:rounded-xl"
                  alt="Image"
                />
              </div>
            </div>
            <div className="h-full w-full h-full flex justify-start flex-col gap-8">
              <div>
                <h2 className="text-primary">About Us</h2>
              </div>
              <div className="w-full h-full">
                <div className="overflow-x-hidden">
                  <div className="flex justify-between sm:flex-wrap items-center gap-4">
                    <Link
                      className={`py-4 hover:text-primary relative ${
                        activeTab === "about"
                          ? "font-bold text-primary"
                          : "text-gray-600"
                      }`}
                      href="#about"
                      onClick={() => handleTabClick("about")}
                    >
                      Who&nbsp;We&nbsp;Are
                      {activeTab === "about" && (
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
                      )}
                    </Link>
                    <Link
                      className={`py-4 hover:text-primary relative ${
                        activeTab === "mission"
                          ? "font-bold text-primary"
                          : "text-gray-600"
                      }`}
                      href="#mission"
                      onClick={() => handleTabClick("mission")}
                    >
                      Mission
                      {activeTab === "mission" && (
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
                      )}
                    </Link>
                    <Link
                      className={`py-4 hover:text-primary relative ${
                        activeTab === "Vision"
                          ? "font-bold text-primary"
                          : "text-gray-600"
                      }`}
                      href="#Vision"
                      onClick={() => handleTabClick("Vision")}
                    >
                      Vision
                      {activeTab === "Vision" && (
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
                      )}
                    </Link>
                  </div>
                </div>
                <div className="w-full h-full mt-4">
                  {activeTab === "about" && (
                    <div className="h-full w-full h-full flex justify-start flex-col gap-8">
                      
                      <p className="text-justify">
                        
                      &quot;We&quot; refers to the Rwanda Defense Force (RDF), the national military of Rwanda. Established in 1994 following the Rwandan Genocide, the RDF is committed to safeguarding Rwanda&quot;s sovereignty and ensuring national security. It comprises the Rwanda Land Force, Rwanda Air Force, and Rwanda National Police. Renowned for its peacekeeping efforts, the RDF contributes troops to United Nations and African Union missions worldwide. Additionally, the RDF is actively involved in community development projects, contributing to the socio-economic progress of Rwanda.
                      </p>
                    </div>
                  )}
                  {activeTab === "mission" && (
                    <div className="h-full w-full h-full flex justify-start flex-col gap-8">
                      <p className="text-justify">
                      To protect Rwanda&quot;s sovereignty, defend its territorial integrity, and ensure the safety and security of its citizens through professional and dedicated military service.
                      </p>
                      
                    </div>
                  )}
                  {activeTab === "Vision" && (
                    <div className="h-full w-full h-full flex justify-start flex-col gap-8">
                      <p className="text-justify">
                      To be a modern, effective, and respected military force, recognized for its commitment to national defense, peacekeeping, and contributions to global security efforts, while upholding the values of integrity, professionalism, and patriotism.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  );
}
