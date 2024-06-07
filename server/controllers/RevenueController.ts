import { Request, Response } from "express";
import mongoose, { FilterQuery, isValidObjectId } from "mongoose";
import { IRevenue } from "../types/revenue/types";
import { RevenueModel } from "../models/Revenue";
import { IAppointment } from "../types/appointment/types";

const RevenueController = {
  getRevenue: async (req: Request, res: Response) => {
    const { uid } = req.user ?? {};
    if (!uid) return res.status(401).json({ error: "Not authorized" });

    const pipeline: FilterQuery<any[]> = [
      {
        $match: {
          uuid: uid,
        },
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
          name: "$service.service",
          net_profit: "$service.price",
          real_profit: "$real_profit",
          is_paid: "$is_paid",
          payment_type: "$payment_type",
        },
      },
    ];

    try {
      const revenue: IRevenue[] = await RevenueModel.aggregate(pipeline);

      if (!revenue || revenue.length < 1)
        return res.status(204).json({ error: "No data found." });

      return res.status(200).json(revenue);
    } catch (error) {
      res.status(500).json({ error: "Error getting data" });
    }
  },

  getRevenueById: async (req: Request, res: Response) => {
    const { uid } = req.user ?? {};
    if (!uid) return res.status(401).json({ error: "Not authorized" });
    if (!isValidObjectId(req?.params?.id))
      return res.status(500).json({ error: "Wrong ID format!" });

    const id = new mongoose.Types.ObjectId(req?.params?.id);

    try {
      const revenue: IRevenue | null = await RevenueModel.findOne({
        _id: id,
        uuid: uid,
      });
      if (revenue && revenue !== null) return res.status(200).json(revenue);

      return res.status(404).json({ error: "Expense not found!" });
    } catch (error) {
      res.status(500).json({ error: "Error retreiving expenses" });
    }
  },

  createRevenue: async (req: Request, res: Response) => {
    const { uid } = req.user ?? {};
    if (!uid) return res.status(401).json({ error: "Not authorized" });
    const {
      name,
      service_id,
      client_id,
      payment_type,
      date,
      is_paid,
      net_profit,
      real_profit,
    } = req.body ?? {};

    if (!req.body)
      return res.status(400).json({ error: "Please provide required data" });

    try {
      const revenueData: IRevenue = {
        name,
        service_id,
        client_id,
        payment_type,
        date,
        is_paid,
        net_profit,
        real_profit,
        uuid: uid,
      };

      const newRevenue = new RevenueModel(revenueData);

      await newRevenue.save();
      res.status(201).json(newRevenue);
    } catch (error) {
      res.status(500).json({ error: "Error creating new revenue" });
    }
  },
  deleteRevenueById: async (req: Request, res: Response) => {
    const { uid } = req.user ?? {};
    if (!uid) return res.status(401).json({ error: "Not authorized" });
    const { id } = req.params;

    try {
      const deletedRevenue = await RevenueModel.findOneAndDelete({
        id,
        uuid: uid,
      });

      if (!deletedRevenue) {
        return res.status(404).json({ error: "Expense not found!" });
      }
      res.json(deletedRevenue);
    } catch (error) {
      res.status(500).json({ error: "Error deleting expense" });
    }
  },
};

export default RevenueController;
