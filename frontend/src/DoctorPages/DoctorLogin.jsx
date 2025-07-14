import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const DoctorLogin = () => {
  const navigate = useNavigate();

const [mode, setMode] = useState("Login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
    speciality: "",
    degree: "",
    experience: "",
    about: "",
    available: true,
    fees: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const endpoint =
      mode === "Sign Up" ? "/api/doctor/register" : "/api/doctor/login";

    const payload =
      mode === "Sign Up"
        ? { ...form, address: { line: form.address } }
        : { email: form.email, password: form.password };

    try {
      const { data } = await axios.post(`${BASE_URL}${endpoint}`, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (!data.success) {
        setErrorMsg(data.message || "Something went wrong");
      } else {
        localStorage.setItem("dtoken", data.token);
        setSuccessMsg(`${mode} successful!`);
        setForm({
          name: "",
          email: "",
          password: "",
          image: "",
          speciality: "",
          degree: "",
          experience: "",
          about: "",
          available: true,
          fees: "",
          address: "",
        });

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Server error – please try again later";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center justify-center"> {/* Added justify-center */}
        <div
          className={`flex flex-col gap-5 m-auto items-start p-6 
                       w-full border rounded-xl text-zinc-600 text-sm shadow-lg
                       ${
                         mode === "Sign Up"
                           ? "max-w-3xl" // Larger for sign up form
                           : "max-w-md" // Smaller, more square for login form
                       }`}
        >
          <p className="text-2xl font-semibold">
            {mode === "Sign Up" ? "Doctor Registration" : "Doctor Login"}
          </p>
          <p>
            Please {mode === "Sign Up" ? "sign up " : "log in "}to manage your appointments
          </p>

          {/* REGISTRATION FIELDS */}
          {mode === "Sign Up" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div>
                  <p>Full Name</p>
                  <input name="name" value={form.name} onChange={onChange} required className="border rounded w-full p-2 mt-1" />
                </div>
                <div>
                  <p>Speciality</p>
                  <input name="speciality" value={form.speciality} onChange={onChange} required className="border rounded w-full p-2 mt-1" />
                </div>
                <div>
                  <p>Degree</p>
                  <input name="degree" value={form.degree} onChange={onChange} required className="border rounded w-full p-2 mt-1" />
                </div>
                <div>
                  <p>Experience</p>
                  <input name="experience" value={form.experience} onChange={onChange} required className="border rounded w-full p-2 mt-1" />
                </div>
                <div>
                  <p>Image URL</p>
                  <input name="image" value={form.image} onChange={onChange} required className="border rounded w-full p-2 mt-1" />
                </div>
                <div>
                  <p>Fees</p>
                  <input type="number" name="fees" value={form.fees} onChange={onChange} required className="border rounded w-full p-2 mt-1" />
                </div>
              </div>

              <div className="w-full">
                <p>About</p>
                <textarea name="about" value={form.about} onChange={onChange} required className="border rounded w-full p-2 mt-1 h-24 resize-y" /> {/* Added h-24 and resize-y for textarea */}
              </div>

              <div className="w-full">
                <p>Address</p>
                <input name="address" value={form.address} onChange={onChange} required className="border rounded w-full p-2 mt-1" />
              </div>
            </>
          )}

          {/* COMMON FIELDS (EMAIL + PASSWORD) */}
          <div className="w-full">
            <p>Email</p>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
              className="border rounded w-full p-2 mt-1"
            />
          </div>

          <div className="w-full">
            <p>Password</p>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              required
              className="border rounded w-full p-2 mt-1"
            />
          </div>

          {/* FEEDBACK */}
          {errorMsg && <p className="text-red-600 text-xs mt-1">{errorMsg}</p>}
          {successMsg && <p className="text-green-600 text-xs mt-1">{successMsg}</p>}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="text-white bg-primary w-full py-2 rounded-md text-base hover:opacity-90 disabled:opacity-60"
          >
            {loading
              ? mode === "Sign Up"
                ? "Signing up…"
                : "Logging in…"
              : mode === "Sign Up"
              ? "Create Account"
              : "Login"}
          </button>

          {/* TOGGLE SIGN UP / LOGIN */}
          {mode === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setMode("Login")}
                className="text-primary underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create a new account?{" "}
              <span
                onClick={() => setMode("Sign Up")}
                className="text-primary underline cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default DoctorLogin;