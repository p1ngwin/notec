import mongoose, { FilterQuery, isValidObjectId } from "mongoose";
import { AppointmentModel } from "../models/Appointment";
import { PersonModel } from "../models/Person";
import { IAppointment } from "../types/appointment/types";
import { Request, Response } from "express";
import { dateType } from "../utils/helpers/queryTypeHelpers";
import { IRevenue } from "../types/revenue/types";
import { RevenueModel } from "../models/Revenue";
import { IService } from "../types/service/types";
import { ServiceModel } from "../models/Services";

const AppointmentController = {
  getAppointments: async (req: Request, res: Response) => {
    const { uid } = req.user ?? {};
    if (!uid) return res.status(401).json({ error: "Not authorized" });

    const { date, dateOnly, id } = req.query ?? req.body ?? {};

    const pipeline: FilterQuery<IAppointment[]> = [
      {
        $match: {
          uuid: uid,
        },
      },
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
          let: { service_ids: "$service_id" }, // Store the array of service_ids in a variable
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$service_ids"], // Use the $in operator to match with the array
                },
              },
            },
          ],
          as: "services", // Store the matched services in the "services" field
        },
      },
      {
        $project: {
          date: "$date",
          time: "$time",
          service: {
            $reduce: {
              input: "$services",
              initialValue: "",
              in: {
                $concat: [
                  "$$value",
                  { $cond: [{ $eq: ["$$value", ""] }, "", ", "] },
                  "$$this.service",
                ],
              },
            },
          },
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

    if (id && mongoose.Types.ObjectId.isValid(id as string)) {
      const _id = new mongoose.Types.ObjectId(id as string);
      pipeline.unshift({
        $match: {
          _id,
        },
      });
    }

    if (dateOnly) {
      pipeline.unshift({
        $match: {
          $expr: {
            $eq: [
              { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
              dateOnly, // Assuming dateOnly is a Date object
            ],
          },
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
    const { uid } = req.user ?? {};
    if (!uid) return res.status(401).json({ error: "Not authorized" });

    if (!person_id)
      return res.status(400).json({ error: "Missing person id!" });

    try {
      // Check if the person exists
      const person = await PersonModel.findById(person_id);

      if (!person) {
        return res.status(404).json({ error: "Person not found!" });
      }

      const services = await ServiceModel.find({
        _id: { $in: service_id },
      })
        .select("price")
        .lean();

      const appointmentData: IAppointment = {
        person_id,
        date: date,
        time: time,
        service_id,
        uuid: uid,
      };

      const appointment = new AppointmentModel(appointmentData);

      await appointment.save();

      const revenueData: IRevenue = {
        service_id,
        person_id,
        net_profit: services.reduce((acc, ser) => acc + ser.price!, 0),
        date,
        is_paid: false,
        uuid: uid,
      };

      const newRevenue = new RevenueModel(revenueData);

      await newRevenue.save();

      if (appointment || newRevenue)
        res.status(201).json({ revenue: newRevenue, appoinment: appointment });
    } catch (error) {
      res.status(500).json({ error: "Error creating appointment" });
    }
  },
  updateAppointment: async (req: Request, res: Response) => {
    const { uid } = req.user ?? {};
    if (!uid) return res.status(401).json({ error: "Not authorized" });

    if (!isValidObjectId(req?.params?.id))
      return res.status(500).json({ error: "Wrong ID format!" });

    const id = new mongoose.Types.ObjectId(req.params.id);
    const { person_id, date, time, service_id, uuid } = req.body;
    try {
      const appointmentData: IAppointment = {
        person_id,
        date,
        time,
        service_id,
        uuid,
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
    const { uid } = req.user ?? {};
    if (!uid) return res.status(401).json({ error: "Not authorized" });

    if (!isValidObjectId(req?.params?.id))
      return res.status(500).json({ error: "Wrong ID format!" });

    const id = new mongoose.Types.ObjectId(req.params.id);

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
