import React from "react";
import { useRouter } from "next/router";

const UnauthorizedPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="h-screen grid place-items-center text-center">
      <div className="">
        <h1 className="font-bold text-[red] mb-4">
          Error 403: Unauthorized Access
        </h1>
        <p className="mb-8">
          You do not have permission to access this page. Please contact your
          administrator for assistance.
        </p>
        <button
          className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={handleGoBack}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
