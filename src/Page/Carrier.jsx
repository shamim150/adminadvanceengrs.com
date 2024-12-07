import React, { useState } from "react";
import PageDesign from "../assets/Components/pageDesign";

// Career Admin Panel Component
const Carrier = () => {
  const [jobPostings, setJobPostings] = useState([
    { title: "Software Engineer", description: "Develop and maintain software applications.", postedDate: "2024-12-01" },
    { title: "Product Manager", description: "Lead and manage product development processes.", postedDate: "2024-12-05" },
  ]);

  const handleAddJobPost = () => {
    const newJob = { title: "New Position", description: "Job description here", postedDate: new Date().toLocaleDateString() };
    setJobPostings([...jobPostings, newJob]);
  };

  return (
    <PageDesign className="bg-yellow-200 text-gray-800">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Job Postings</h1>

        {/* Job Postings Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Current Job Postings</h2>
          <div className="space-y-4">
            {jobPostings.map((job, index) => (
              <div key={index} className="border-b pb-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                <p className="text-gray-600">{job.description}</p>
                <span className="text-sm text-gray-500">{job.postedDate}</span>
              </div>
            ))}
          </div>
          <button
            onClick={handleAddJobPost}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add New Job Post
          </button>
        </div>
      </div>
    </PageDesign>
  );
};

export default Carrier;
