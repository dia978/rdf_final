/* eslint-disable @next/next/no-img-element */

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-primary"
    >
      <div className="w-full flex pt-12 justify-center">
        <div className="w-[80%]">
          <div className="px-8 bg-white grid place-items-end shadow shadow-primary md:rounded-[36px] sm:rounded-[20px]">
            <div className="md:flex md:justify-between md:py-16 py-4 grid md:gap-16 w-full">
              <div className="my-6 md:mb-0 flex justify-center">
              <Link href={"/"} passHref className="text-primary flex items-center rounded-full p-0">
            <img src="/logo.png" alt="" className="h-12" /><h5>RDF Recruitment</h5>
          </Link>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:gap-6 md:grid-cols-3 md:w-[80%]">
                <div>
                  <div className="flex flex-col sm:gap-4 h-full justify-between">
                    <Link href="/" className="hover:text-primary">
                      Home
                    </Link>
                    <Link href="/about" className="hover:text-primary">
                      About Us
                    </Link>
                    <Link href="/services" className="hover:text-primary">
                      Services
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col sm:gap-4 h-full justify-between">
                    
                    <Link href="/user-registration" className="hover:text-primary">
                      Application Portal
                    </Link>
                    <Link href="/boarding" className="hover:text-primary">
                      Boarding
                    </Link>
                    <Link href="/login" className="hover:text-primary">
                      Login 
                    </Link>
                  </div>
                </div>
                <div className="">
                  <div className="flex flex-col sm:gap-4 h-full justify-between">
                   
                    <Link
                      href={"tel:+2507888888888"}
                      className="hover:text-primary"
                    >
                      +250&nbsp;888&nbsp;888&nbsp;888
                    </Link>
                    <Link
                      href={"mailto:info@greenhillsacademy.rw"}
                      className="hover:text-primary"
                    >
                      info@rdf.rw
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full justify-center flex">
              <div className="w-[80%]">
                <hr />
                <div className="flex md:pt-2 sm:py-2 w-full justify-center">
                  <div className="w-full">
                    <div className="flex justify-center w-full">
                      <Link
                        href={""}
                        className="text-black text-center my-2 pt-4 font-normal"
                      >
                        &copy;RDF Recruitment {currentYear}
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </footer>
  );
};
export default Footer;
