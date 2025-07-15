import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpeciality, setSelectedSpeciality] = useState("General physician");
  const navigate = useNavigate();

  const specialities = [
    "General physician", "Gynecologist", "Dermatologist",
    "Pediatricians", "Neurologist", "Gastroenterologist"
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/doctor/list`);
        if (data.success) {
          setDoctors(data.doctors);
        }
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doc => doc.speciality === selectedSpeciality);

  return (
    <div className="min-h-[80vh] p-6">
      <h1 className="text-2xl font-semibold mb-4">Browse through the doctors</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-3">
          {specialities.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedSpeciality(item)}
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
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
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
    </div>
  );
};

export default DoctorList;
