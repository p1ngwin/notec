import { Request, Response } from "express";
import { IService } from "../types/service/types";
import { ServiceModel } from "../models/Services";
import mongoose, { isValidObjectId } from "mongoose";

const ServiceController = {
  getServices: async (req: Request, res: Response) => {
    try {
      const services: IService[] = await ServiceModel.find();

      if (!services || services.length < 1)
        return res.status(204).json({ error: "No data found." });

      return res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ error: "Error getting data" });
    }
  },

  getService: async (req: Request, res: Response) => {
    if (!isValidObjectId(req?.params?.id))
      return res.status(500).json({ error: "Wrong ID format!" });

    const id = new mongoose.Types.ObjectId(req?.params?.id);

    try {
      const service: IService | null = await ServiceModel.findById(id);
      if (service && service !== null) return res.status(200).json(service);

      return res.status(404).json({ error: "Service not found!" });
    } catch (error) {
      res.status(500).json({ error: "Error retreiving service" });
    }
  },

  createService: async (req: Request, res: Response) => {
    const { service, price } = req.body ?? {};

    if (!service || !price)
      return res.status(400).json({ error: "Please provide required data" });

    try {
      const serviceData: IService = {
        service,
        price,
      };

      const newService = new ServiceModel(serviceData);

      await newService.save();
      res.status(201).json(newService);
    } catch (error) {
      res.status(500).json({ error: "Error creating appointment" });
    }
  },
  deleteService: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const deletedService = await ServiceModel.findByIdAndDelete(id);

      if (!deletedService) {
        return res.status(404).json({ error: "Appointment not found!" });
      }
      res.json(deletedService);
    } catch (error) {
      res.status(500).json({ error: "Error deleting appointment" });
    }
  },
};

export default ServiceController;
