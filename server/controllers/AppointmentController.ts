import { FilterQuery } from "mongoose";
import { AppointmentModel } from "../models/Appointment";
import { PersonModel } from "../models/Person";
import { IAppointment } from "../types/appointment/types";
import { Request, Response } from "express";
import { dateType } from "../utils/helpers/queryTypeHelpers";

const AppointmentController = {
  getAppointments: async (req: Request, res: Response) => {
    const { date } = req.query ?? req.body ?? {};

    const pipeline: FilterQuery<IAppointment[]> = [
      {
        $lookup: {
          from: "people",
          localField: "person_id",
          foreignField: "_id",
          as: "person",
        },
      },
      {
        $unwind: "$person",
      },
      {
        $lookup: {
          from: "services",
          localField: "service_id",
          foreignField: "_id",
          as: "service",
        },
      },
      {
        $unwind: "$service",
      },
      {
        $project: {
          date: "$date",
          time: "$time",
          service: "$service.service",
          person_id: "$person._id",
          first_name: "$person.first_name",
          last_name: "$person.last_name",
          phone: "$person.phone_number",
          email: "$person.email",
        },
      },
      {
        $sort: {
          date: 1,
        },
      },
    ];

    if (date) {
      pipeline.unshift({
        $match: {
          date: dateType(date as string),
        },
      });
    }

    try {
      const appointments: IAppointment[] = await AppointmentModel.aggregate(
        pipeline
      );

      if (!appointments || appointments.length < 1)
        return res.status(204).json({ error: "No data found." });

      return res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Error getting data" });
    }
  },
  createAppointment: async (req: Request, res: Response) => {
    const { person_id, date, time, service_id } = req.body ?? {};

    if (!person_id)
      return res.status(400).json({ error: "Missing person id!" });

    try {
      // Check if the person exists
      const person = await PersonModel.findById(person_id);

      if (!person) {
        return res.status(404).json({ error: "Person not found!" });
      }

      const appointmentData: IAppointment = {
        person_id,
        date: date,
        time: time,
        service_id,
      };

      const appointment = new AppointmentModel(appointmentData);

      await appointment.save();
      res.status(201).json(appointment);
    } catch (error) {
      res.status(500).json({ error: "Error creating appointment" });
    }
  },
  updateAppointment: async (req: Request, res: Response) => {
    const { id, person_id, date, time, service_id } = req.body;
    try {
      const appointmentData: IAppointment = {
        id,
        person_id,
        date,
        time,
        service_id,
      };

      const filter = { _id: id };
      const options = { new: true }; // Return the updated document

      const updatedAppointment = await AppointmentModel.findOneAndUpdate(
        filter,
        appointmentData,
        options
      );

      if (!updatedAppointment) {
        return res.status(404).json({ error: "Appointment not found!" });
      }

      res.json(updatedAppointment);
    } catch (error) {
      res.status(500).json({ error: "Error updating appointment" });
    }
  },
  deleteAppointment: async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
      const deletedAppointment = await AppointmentModel.findByIdAndDelete(id);

      if (!deletedAppointment) {
        return res.status(404).json({ error: "Appointment not found!" });
      }

      res.json(deletedAppointment);
    } catch (error) {
      res.status(500).json({ error: "Error deleting appointment" });
    }
  },
};

export default AppointmentController;
