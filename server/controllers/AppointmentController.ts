import mongoose from "mongoose";
import { AppointmentModel } from "../models/Appointment";
import { PersonModel } from "../models/Person";
import { IAppointment } from "../types/appointment/types";
import { Request, Response } from "express";
import { dateType, idType } from "../utils/helpers/queryTypeHelpers";

const AppointmentController = {
  getAppointments: async (req: Request, res: Response) => {

    const { date } = req?.query ?? {}
    console.log("Date:", date);
    try {
      if (date) {
        console.log("searching by date...", req.query.date)

        const appointments: IAppointment[] = await AppointmentModel.aggregate([
          {
            $match: {
              date: dateType(req.query.date as string)
            }
          },
          {
            $lookup: {
              from: "people",
              localField: "person_id",
              foreignField: "_id",
              as: "person"
            }
          },
          {
            $unwind: "$person"
          },
          {
            $project: {
              _id: 0,
              appointment_id: "$_id",
              appointment_date: "$date",
              appointment_time: "$time",
              appointment_service: "$service",
              person_id: "$person._id",
              person_name: { $concat: ["$person.first_name", " ", "$person.last_name"] },
              person_phone: "$person.phone_number",
              person_email: "$person.email"
            }
          }
        ]);

        return res.status(200).json(appointments);
      }

      console.log("Searching all...")

      const appointment: IAppointment[] = await AppointmentModel.find();

      return res.status(200).json(appointment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error getting data" });
    }
  },
  createAppointment: async (req: Request, res: Response) => {
    const { person_id, date, time, service } = req.body ?? {}

    if (!person_id) return res.status(400).json({ error: "Missing person id!" });

    try {

      // Check if the person exists
      const person = await PersonModel.findById(person_id);

      if (!person) {
        return res.status(404).json({ error: "Person not found!" });
      }

      const appointmentData: IAppointment = {
        person_id,
        date,
        time,
        service
      }

      const appointment = new AppointmentModel(appointmentData);

      await appointment.save();
      res.status(201).json(appointment);

    } catch (error) {
      console.log(error);
    }
  },
  updateAppointment: async (req: Request, res: Response) => {
    const { id, person_id, date, time, service, } = req.body
    try {
      const appointmentData: IAppointment = {
        id,
        person_id,
        date,
        time,
        service
      };

      const filter = { _id: id };
      const options = { new: true }; // Return the updated document

      const updatedAppointment = await AppointmentModel.findOneAndUpdate(filter, appointmentData, options)

      if (!updatedAppointment) {
        return res.status(404).json({ error: "Appointment not found!" });
      }

      res.json(updatedAppointment);

    }
    catch (error) {
      console.log("Error updating appointment", error);
      res.status(500).json({ error: "Error updating appointment" })
    }
  },
  deleteAppointment: async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
      const deletedAppointment = await AppointmentModel.findByIdAndDelete(id)

      if (!deletedAppointment) {
        return res.status(404).json({ error: "Appointment not found!" });
      }

      res.json(deletedAppointment)
    }
    catch (error) {
      console.log("Error deleting appointment: ", error)
      res.status(500).json({ error: "Error deleting appointment" })
    }


  }
}

export default AppointmentController;
