import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const fetchProfileAndAppointments = async () => {
    try {
      const token = localStorage.getItem("dtoken");
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch doctor profile
      const profileRes = await axios.get("http://localhost:2000/api/doctor/get-profile", { headers });
      const doctorData = profileRes.data.doctor;
      setDoctor(doctorData);
      setFormData(doctorData);

      // Fetch doctor appointments
      const appointmentsRes = await axios.get("http://localhost:2000/api/doctor/appointments", { headers });
      const appts = appointmentsRes.data.appointments || [];
      setAppointments(appts);

      // Calculate total earnings from non-cancelled appointments
      const earnings = appts
        .filter(app => !app.cancelled)
        .reduce((acc, app) => acc + (app.fees || doctorData.fees || 0), 0);
      setTotalEarnings(earnings);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileAndAppointments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("dtoken");
      await axios.post("http://localhost:2000/api/doctor/update-profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile updated successfully");
      setDoctor(formData);
      setEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Profile update failed");
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        const token = localStorage.getItem("dtoken");
        await axios.put(
          `http://localhost:2000/api/appointment/cancel/${appointmentId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Appointment cancelled");
        fetchProfileAndAppointments();
      } catch (err) {
        console.error(err);
        toast.error("Failed to cancel appointment");
      }
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      {/* Doctor Profile */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Doctor Profile</h2>
        {editing ? (
          <>
            <input type="text" name="name" value={formData.name || ''} onChange={handleChange} placeholder="Name" className="w-full p-2 mb-2 border rounded" />
            <input type="text" name="speciality" value={formData.speciality || ''} onChange={handleChange} placeholder="Speciality" className="w-full p-2 mb-2 border rounded" />
            <input type="text" name="degree" value={formData.degree || ''} onChange={handleChange} placeholder="Degree" className="w-full p-2 mb-2 border rounded" />
            <input type="number" name="experience" value={formData.experience || ''} onChange={handleChange} placeholder="Experience (years)" className="w-full p-2 mb-2 border rounded" />
            <textarea name="about" value={formData.about || ''} onChange={handleChange} placeholder="About" className="w-full p-2 mb-2 border rounded" />
            <input type="number" name="fees" value={formData.fees || ''} onChange={handleChange} placeholder="Consultation Fee" className="w-full p-2 mb-2 border rounded" />
            <input type="text" name="address.line1" value={formData.address?.line1 || ''} onChange={handleChange} placeholder="Address Line 1" className="w-full p-2 mb-2 border rounded" />
            <input type="text" name="address.line2" value={formData.address?.line2 || ''} onChange={handleChange} placeholder="Address Line 2" className="w-full p-2 mb-2 border rounded" />
            <input type="text" name="address.city" value={formData.address?.city || ''} onChange={handleChange} placeholder="City" className="w-full p-2 mb-2 border rounded" />
            <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
          </>
        ) : (
          <div className="space-y-2 text-gray-800">
            <p><strong>Name:</strong> {doctor.name}</p>
            <p><strong>Email:</strong> {doctor.email}</p>
            <p><strong>Speciality:</strong> {doctor.speciality}</p>
            <p><strong>Degree:</strong> {doctor.degree}</p>
            <p><strong>Experience:</strong> {doctor.experience} years</p>
            <p><strong>About:</strong> {doctor.about}</p>
            <p><strong>Fees:</strong> ₹{doctor.fees}</p>
            <p><strong>Slot:</strong> {doctor.slot || 'Not Set'}</p>
            <p><strong>Address:</strong> {[doctor.address?.line1, doctor.address?.line2, doctor.address?.city].filter(Boolean).join(', ')}</p>
            <button onClick={() => setEditing(true)} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">Edit Profile</button>
          </div>
        )}
      </div>

      {/* Appointments */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Appointments</h2>
        <div className="mb-4">
          <p><strong>Total Appointments:</strong> {appointments.length}</p>
          <p className="text-green-600 font-semibold"><strong>Total Earnings:</strong> ₹{totalEarnings}</p>
        </div>

        {appointments.length === 0 ? (
          <p>No appointments yet.</p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((app) => (
              <li key={app._id} className="border p-4 rounded-lg bg-gray-50">
                <p><strong>Date:</strong> {new Date(app.slotDate || app.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {app.slotTime || app.slot?.startTime || 'N/A'}</p>
                <p><strong>Fee:</strong> ₹{app.fees || doctor.fees}</p>
                <p><strong>Status:</strong> {app.cancelled ? 'Cancelled' : 'Booked'}</p>
                {!app.cancelled && (
                  <button
                    onClick={() => handleCancelAppointment(app._id)}
                    className="bg-red-500 text-white px-3 py-1 mt-2 rounded hover:bg-red-600"
                  >
                    Cancel Appointment
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
