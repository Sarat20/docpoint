import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../config';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpeciality, setSelectedSpeciality] = useState("General physician");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const specialities = [
    "General physician", "Gynecologist", "Dermatologist",
    "Pediatricians", "Neurologist", "Gastroenterologist"
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          speciality: selectedSpeciality,
          page: String(page),
          limit: '12',
          available: 'true',
        });
        const url = `${BASE_URL}/api/doctor/list?${params.toString()}`;
        const { data } = await axios.get(url);
        if (data.success) {
          setDoctors(data.doctors || []);
          setPages(data.pages || 1);
          setTotal(data.total || 0);
        }
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [selectedSpeciality, page]);

  const filteredDoctors = doctors; // now server-side filtered

  const onChangeSpeciality = (item) => {
    setSelectedSpeciality(item);
    setPage(1);
  };

  const transformCloudinaryThumb = (url) => {
    try {
      if (!url) return url;
      const marker = '/upload/';
      const idx = url.indexOf(marker);
      if (idx === -1) return url;
      const prefix = url.substring(0, idx + marker.length);
      const suffix = url.substring(idx + marker.length);
      const transform = 'f_auto,q_auto,w_400,h_240,c_fill';
      return `${prefix}${transform}/${suffix}`;
    } catch { return url; }
  };

  return (
    <div className="min-h-[80vh] p-6">
      <h1 className="text-2xl font-semibold mb-4">Browse through the doctors</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-3">
          {specialities.map((item) => (
            <button
              key={item}
              onClick={() => onChangeSpeciality(item)}
              className={`px-4 py-2 border rounded-md ${
                selectedSpeciality === item
                  ? "bg-blue-100 text-blue-800 font-medium"
                  : "bg-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 flex-1">
          {loading ? (
            <p>Loading doctors...</p>
          ) : filteredDoctors.length === 0 ? (
            <p>No doctors found for this speciality.</p>
          ) : (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                onClick={() => navigate(`/doctor/${doctor._id}`)}
                className="cursor-pointer bg-white text-gray-800 border rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={transformCloudinaryThumb(doctor.image)}
                  alt={doctor.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                  loading="lazy"
                />
                <h2 className="text-lg font-semibold">{doctor.name}</h2>
                <p className="text-sm text-gray-600">{doctor.degree}</p>
                <p className="text-sm">{doctor.experience} years experience</p>
                <p className="text-sm font-medium mt-2">₹{doctor.fees} consultation</p>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Pagination */}
      <div className="flex items-center gap-2 mt-6">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">Page {page} of {pages} · {total} results</span>
        <button
          disabled={page >= pages}
          onClick={() => setPage((p) => Math.min(pages, p + 1))}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DoctorList;
