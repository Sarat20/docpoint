import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import cloudinary from 'cloudinary';

const registerDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      available, 
      fees,
      address, 
      dob,
      gender,
      phone
    } = req.body;

    const imageFile = req.file;

    console.log("Received body for registration:", req.body);
    console.log("Received file for registration:", req.file);

    if (
      !name || !email || !password || !speciality || !degree || !experience ||
      !about || !fees || !address || !gender || !phone || !dob
    ) {
      return res.status(400).json({ success: false, message: "Please provide all required details" });
    }

    if (!imageFile) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ success: false, message: "Doctor already exists with this email" });
    }
    const cloudinaryRes = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: 'image',
      folder: 'doctor_profiles'
    });

    const imageUrl = cloudinaryRes.secure_url;
    const hashedPassword = await bcrypt.hash(password, 10);

    let parsedAddress;
    try {
        parsedAddress = JSON.parse(address);
    } catch (parseError) {
        console.error("Error parsing address JSON:", parseError);
        return res.status(400).json({ success: false, message: "Invalid address format" });
    }

    const isAvailable = available === 'true'; 

    const newDoctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      available: isAvailable,
      fees,
      dob,
      gender,
      phone,
      address: parsedAddress, 
      date: Date.now()
    });

    const savedDoctor = await newDoctor.save();

    const token = jwt.sign({ id: savedDoctor._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d'
    });

    res.status(201).json({ success: true, dtoken: token });
  } catch (error) {
    console.error("Doctor registration error:", error); 
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });

        if (!doctor) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const changeAvailability = async (req, res) => {
    try {
        const doctorId = req.user.id; 
        const docData = await doctorModel.findById(doctorId);

        if (!docData) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        await doctorModel.findByIdAndUpdate(doctorId, { available: !docData.available });
        res.json({ success: true, message: "Availability changed successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        res.json({ success: true, doctors });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const appointmentsDoctor = async (req, res) => {
    try {
        const doctorId = req.user.id; 
        const appointments = await appointmentModel.find({ docId: doctorId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export {
    registerDoctor,
    loginDoctor,
    changeAvailability,
    doctorList,
    appointmentsDoctor
};