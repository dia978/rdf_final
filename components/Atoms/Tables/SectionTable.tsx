/* eslint-disable @next/next/no-img-element */
import React from "react";

interface Section {
  _id: string;
  imageUrls: string[];
}

interface SectionTableProps {
  sections: Section[];
  onDelete: (id: string) => void;
  onEdit: (section: Section) => void;
}

const SectionTable: React.FC<SectionTableProps> = ({
  sections,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Section Table</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Image URLs</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section) => (
            <tr key={section._id} className="border-b">
              <td className="p-3">
                {section.imageUrls.map((item, index) => (
                  <img
                    key={index}
                    src={item}
                    alt={"index " + index}
                    className="h-24 w-24"
                  />
                ))}
              </td>
              <td className="p-3">
                <button
                  className="px-3 py-1 rounded mr-2"
                  onClick={() => onEdit(section)}
                >
                  <img
                    loading="lazy"
                    src="/icons/update_ijqjnj.svg"
                    alt=""
                    className=""
                  />
                </button>
                <button
                  className="px-3 py-1 rounded"
                  onClick={() => onDelete(section._id)}
                >
                  <img
                    loading="lazy"
                    src="/icons/delete_tvo46a.svg"
                    alt=""
                    className=""
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SectionTable;
