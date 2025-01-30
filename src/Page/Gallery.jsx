import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import { toast } from "react-toastify";

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    caption: "",
    type: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Example for handling form data submission
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("image", formData.image);
    formDataToSubmit.append("caption", formData.caption);
    formDataToSubmit.append("type", formData.type);

    try {
      const response = await fetch(
        "https://advanced-engineering-admin.vercel.app/api/v1/gallery/upload",
        {
          method: "POST",
          headers: {
            authorization: localStorage.getItem("token"),
          },
          body: formDataToSubmit,
        }
      );

      const data = await response.json();

      if (data?.success) {
        toast.success("Gallery added successfully!");
        fetchgalleryData();
      } else {
        toast.error("Falied to upload!");
      }
    } catch (error) {
      toast.error("Falied to upload!");
    }

    // Reset form and close modal
    setFormData({ image: null, caption: "", type: "" });
    setIsModalOpen(false);
  };

  const [loading, setLoading] = useState(true);
  const [galleryData, setGalleryData] = useState([]);

  const fetchgalleryData = async () => {
    const response = await fetch(
      "https://advanced-engineering-admin.vercel.app/api/v1/gallery"
    );
    const data = await response.json();
    setGalleryData(data?.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchgalleryData();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(
      `https://advanced-engineering-admin.vercel.app/api/v1/gallery/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json()

    if(data?.success){
      toast.success("Item deleted");
      fetchgalleryData();

    }else{
      toast.error("Faield to delete!")
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-[1000px] max-h-[700px] overflow-y-scroll">
      <div className="flex justify-end mt-10">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-white px-4 py-2 bg-fuchsia-800 hover:bg-fuchsia-400 transition-all duration-300 font-bold  rounded-lg"
        >
          Add Gallery
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <h2 className="text-lg font-bold mb-4">Add Gallery</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Caption
                </label>
                <input
                  type="text"
                  name="caption"
                  value={formData.caption}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                  placeholder="Enter caption"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                  required
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  <option value="Exhibition">Exhibition</option>
                  <option value="Awards">Awards</option>
                  <option value="Projects">Projects</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-fuchsia-800 text-white rounded-lg hover:bg-fuchsia-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* gallery */}
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {galleryData?.map((card) => (
          <div
            key={card._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
          >
            <img
              src={card.image}
              alt={card.caption}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">{card.caption}</h2>
              <p className="text-gray-600">
                <span className="font-medium">Type:</span> {card.type}
              </p>

              <button
                onClick={() => handleDelete(card._id)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
