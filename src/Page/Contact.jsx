import React, { useEffect, useState } from "react";
import Loading from "../Components/Loading";

const Contact = () => {
  const [loading, setLoading] = useState(true);

  const [contactData, setContactData] = useState([]);
  const fetchContactData = async () => {
    const response = await fetch(
      "https://advanced-engineering-admin.vercel.app/api/v1/contactUs",
      {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    setContactData(data?.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  if (loading) {
    return (
    <Loading/>
    );
  }


  return (
    <div className="container mx-auto p-4 text-white">
      <h2 className="text-xl font-bold mb-4">Data Table</h2>
      <div className="overflow-x-auto overflow-y-scroll max-h-[700px]">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="sticky top-0 left-0">
            <tr className="bg-gray-500">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2 w-96">Message</th>
              <th className="border border-gray-300 px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {contactData?.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.address}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.message}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contact;
