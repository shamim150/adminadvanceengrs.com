import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Carrier = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    job_title: "",
    designation: "",
    description: "",
    experience: "",
    education_qualification: "",
    salary_range: "",
    location: "",
    application_deadline: "",
    benefits: "",
    contact_information: "",
    vacancy: "",
  });

  const [jobData, setJobData] = useState([]);
  console.log(jobData);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://advanced-engineering-admin.vercel.app/api/v1/carrier",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (data.success) {
        toast.success("Job added successfully!");
        fetchJobData();
        setIsModalOpen(false);
        setFormData({
          job_title: "",
          designation: "",
          description: "",
          experience: "",
          education_qualification: "",
          salary_range: "",
          location: "",
          application_deadline: "",
          benefits: "",
          contact_information: "",
          vacancy: "",
        });
      } else {
        toast.error("Failed to add job!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred!");
    }
  };

  const fetchJobData = async () => {
    const response = await fetch("https://advanced-engineering-admin.vercel.app/api/v1/carrier",{
      headers:{
        "authorization":localStorage.getItem("token")
      }
    });
    const data = await response.json();
    setJobData(data?.data || []);
  };

  useEffect(() => {
    fetchJobData();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(
      `https://advanced-engineering-admin.vercel.app/api/v1/carrier/${id}`,
      {
        method: "DELETE",
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    const data = await response.json();

    if (data.success) {
      toast.success("Job deleted successfully!");
      fetchJobData();
    } else {
      toast.error("Failed to delete job!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-end mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Job
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
            <h2 className="text-lg font-bold mb-4">Add Job Posting</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(formData).map((key) => (
                  <div key={key} className="mb-4">
                    <label
                      htmlFor={key}
                      className="block text-gray-700 font-medium mb-2"
                    >
                      {key.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase())}
                    </label>
                    {key === "description" || key === "benefits" ? (
                      <textarea
                        name={key}
                        id={key}
                        value={formData[key]}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        required
                      ></textarea>
                    ) : (
                      <input
                        type={key === "application_deadline" ? "date" : "text"}
                        name={key}
                        id={key}
                        value={formData[key]}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Job List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {jobData?.map((job) => (
          <div
            key={job._id}
            className="bg-white shadow-lg rounded-lg p-4 border"
          >
            <h3 className="text-xl font-bold">{job.job_title}</h3>
            <p className="text-gray-600">
              <strong>Designation:</strong> {job.designation}
            </p>
            <p className="text-gray-600">
              <strong>Experience:</strong> {job.experience}
            </p>
            <p className="text-gray-600">
              <strong>Salary:</strong> {job.salary_range}
            </p>
            <p className="text-gray-600">
              <strong>Location:</strong> {job.location}
            </p>
            <button
              onClick={() => handleDelete(job._id)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carrier;
