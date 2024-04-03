import Image from "next/image";
import React from "react";

interface ListProps {
  details: string;
  color: string;
}

const DecoratedList: React.FC<ListProps> = ({ details, color }) => {
  const parts = details.split(":");

  return (
    <div className="pb-6">
      {parts.length === 2 ? (
        <div className="w-full gap-4 flex">
          <Image
            placeholder="empty"
            blurDataURL={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' rx='8' ry='8' fill='%23E2E8F0'/%3E%3Cline x1='0' y1='0' x2='60' y2='60' stroke='%234B5563' stroke-width='1.5'/%3E%3Cline x1='60' y1='0' x2='0' y2='60' stroke='%234B5563' stroke-width='1.5'/%3E%3C/svg%3E`}
            src="/images/svg/tabler_bounce-right.svg"
            alt=""
            width={0}
            height={0}
            className="w-6 h-6 mt-1.5"
          />
          <p className={`text-${color} `}>
            <strong className="text-primary">{parts[0]}:</strong> {parts[1]}
          </p>
        </div>
      ) : (
        <div className="w-full gap-4 flex">
          <Image
            placeholder="empty"
            blurDataURL={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' rx='8' ry='8' fill='%23E2E8F0'/%3E%3Cline x1='0' y1='0' x2='60' y2='60' stroke='%234B5563' stroke-width='1.5'/%3E%3Cline x1='60' y1='0' x2='0' y2='60' stroke='%234B5563' stroke-width='1.5'/%3E%3C/svg%3E`}
            src="/images/svg/tabler_bounce-right.svg"
            alt=""
            width={0}
            height={0}
            className="w-6 h-6 mt-1.5"
          />
          <p className={`text-${color} `}>{details}</p>
        </div>
      )}
    </div>
  );
};

export default DecoratedList;
