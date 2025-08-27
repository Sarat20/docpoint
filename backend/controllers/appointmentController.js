import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import mongoose from "mongoose";

export const createAppointment = async (req, res) => {
  try {
    const {
      docId,
      slotDate,
      slotTime,
      amount
    } = req.body;

    const newAppointment = new appointmentModel({
      userId: req.user.id, 
      docId,
      slotDate,
      slotTime,
      amount,
      date: Date.now()
    });

    await newAppointment.save();

  
    await doctorModel.findByIdAndUpdate(docId, {
      $set: {
        [`slots_booked.${slotDate}.${slotTime}`]: true
      }
    }, { upsert: true });

    res.status(201).json({ success: true, message: "Appointment booked successfully" });
  } catch (err) {
    console.error("Error creating appointment:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getUserAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({ userId: req.user.id })
      .populate("docId", "name image speciality")
      .sort({ date: -1 });

    res.status(200).json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({ docId: req.user.id })
      .populate("userId", "name image phone")
      .sort({ date: -1 });

    res.status(200).json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

  
    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

  
    appointment.cancelled = true;
    await appointment.save();

  
    if (appointment.docId && appointment.slotDate && appointment.slotTime) {
      await doctorModel.findByIdAndUpdate(appointment.docId, {
        $unset: {
          [`slots_booked.${appointment.slotDate}.${appointment.slotTime}`]: ""
        }
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
      appointment
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getDoctorEarnings = async (req, res) => {
  try {
    const earnings = await appointmentModel.aggregate([
      {
        $match: {
          docId: new mongoose.Types.ObjectId(req.user.id),
          cancelled: false
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    const totalEarnings = earnings.length > 0 ? earnings[0].total : 0;

    res.status(200).json({ success: true, totalEarnings });
  } catch (err) {
    console.error("Earnings Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
