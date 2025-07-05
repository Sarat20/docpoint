import React, { useEffect, useState } from "react";
import axios from "axios";

const defaultImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "Not Selected",
    dob: "Not Selected",
    address: { line1: "", line2: "" },
    image: ""
  });

  const [previewImage, setPreviewImage] = useState(defaultImage);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch current user profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${BASE_URL}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });

      setUser(data.user);
      setPreviewImage(data.user.image || defaultImage);
    } catch (err) {
      console.error("❌ Error fetching profile:", err);
      setMessage("Failed to load profile.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "line1" || name === "line2") {
      setUser({ ...user, address: { ...user.address, [name]: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("phone", user.phone);
      formData.append("gender", user.gender);
      formData.append("dob", user.dob);
      formData.append("line1", user.address.line1);
      formData.append("line2", user.address.line2);
      if (user.image instanceof File) {
        formData.append("image", user.image);
      }

      const token = localStorage.getItem("token");
      const { data } = await axios.put(`${BASE_URL}/api/user/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      setMessage("✅ Profile updated successfully.");
      setUser(data.user);
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      setMessage("❌ Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>

      {message && (
        <p className="text-sm mb-4 text-center text-blue-600">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-sm text-zinc-700">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <img
            src={previewImage}
            alt="User"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div>
          <label>Name</label>
          <input
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            value={user.email}
            readOnly
            className="w-full p-2 border rounded bg-gray-100 mt-1"
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div>
          <label>Gender</label>
          <select
            name="gender"
            value={user.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="Not Selected">Not Selected</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={user.dob !== "Not Selected" ? user.dob : ""}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div>
          <label>Address Line 1</label>
          <input
            name="line1"
            value={user.address.line1}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div>
          <label>Address Line 2</label>
          <input
            name="line2"
            value={user.address.line2}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white py-2 px-4 rounded hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
