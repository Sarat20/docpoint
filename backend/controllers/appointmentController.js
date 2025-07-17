import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";

// Create a new appointment
export const createAppointment = async (req, res) => {
  try {
    const {
      docId,
      slotDate,
      slotTime,
      amount
    } = req.body;

    const newAppointment = new appointmentModel({
      userId: req.user.id, // CHANGED: from req.user._id to req.user.id
      docId,
      slotDate,
      slotTime,
      amount,
      date: Date.now()
    });

    await newAppointment.save();

    // Mark the time slot as booked in doctor model
    await doctorModel.findByIdAndUpdate(docId, {
      $set: {
        [`slots_booked.${slotDate}.${slotTime}`]: true
      }
    }, { upsert: true });

    res.status(201).json({ success: true, message: "Appointment booked successfully" });
  } catch (err) {
    // Added a console log for better debugging
    console.error("Error creating appointment:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get user's appointments
export const getUserAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel
      // CHANGED: from req.user._id to req.user.id
      .find({ userId: req.user.id })
      .populate("docId", "name image speciality")
      .sort({ date: -1 });

    res.status(200).json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get doctor's appointments
export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel
      // CHANGED: from req.doctor._id to req.user.id, as authDoctor sets req.user
      .find({ docId: req.user.id })
      .populate("userId", "name image phone")
      .sort({ date: -1 });

    res.status(200).json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Cancel an appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Find the appointment to get its details before updating
    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // You might want to add a check here to ensure the user cancelling is the one who booked it
    // if (appointment.userId.toString() !== req.user.id) {
    //   return res.status(403).json({ success: false, message: "Forbidden: You cannot cancel this appointment." });
    // }

    // Mark the appointment as cancelled
    appointment.cancelled = true;
    await appointment.save();

    // Free up the slot in the doctor's schedule
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