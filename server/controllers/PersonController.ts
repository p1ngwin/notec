import mongoose, { isValidObjectId } from "mongoose";
import { PersonModel } from "../models/Person";
import { IPerson } from "../types/person/types";
import { Request, Response } from "express";

const PersonController = {
  getAllPersons: async (req: Request, res: Response) => {
    const { uid } = req.user ?? {};
    if (!uid) return res.status(401).json({ error: "Not authorized" });

    try {
      const persons: IPerson[] = await PersonModel.find({ uuid: uid });
      return res.status(200).json(persons);
    } catch (error) {
      res.status(500).json({ error: "Error getting data" });
    }
  },

  getPerson: async (req: Request, res: Response) => {
    const { uid } = req.user ?? {};
    if (!uid) return res.status(401).json({ error: "Not authorized" });

    if (!isValidObjectId(req?.params?.id))
      return res.status(500).json({ error: "Wrong ID format!" });

    const id = new mongoose.Types.ObjectId(req?.params?.id);

    try {
      const person: IPerson | null = await PersonModel.findById(id);
      if (person && person !== null) return res.status(200).json(person);

      return res.status(404).json({ error: "Person not found!" });
    } catch (error) {
      res.status(500).json({ error: "Error retreiving person" });
    }
  },

  createPerson: async (req: Request, res: Response) => {
    const { first_name, last_name, email, phone_number } = req.body ?? {};
    const { uid } = req.user ?? {};

    if (!first_name || !last_name) {
      return res
        .status(500)
        .json({ error: "Please enter all required fields." });
    }

    if (!uid) return res.status(401).json({ error: "Not authorized" });

    try {
      const personData: IPerson = {
        first_name,
        last_name,
        email,
        phone_number,
        uuid: uid,
      };

      const person = new PersonModel(personData);

      await person.save();
      res.status(201).json(person);
    } catch (error) {
      res.status(500).json({ error: "Error creating person" });
    }
  },

  updatePerson: async (req: Request, res: Response) => {
    const { uid } = req.user ?? {};
    if (!uid) return res.status(401).json({ error: "Not authorized" });

    const id = new mongoose.Types.ObjectId(req?.params?.id);

    const { first_name, last_name, phone_number, email } = req.body;

    try {
      const personData: IPerson = {
        first_name,
        last_name,
        email,
        phone_number,
        uuid: uid,
      };

      const filter = { _id: id };
      const options = { new: true }; // Return the updated document

      const updatedPerson = await PersonModel.findByIdAndUpdate(
        filter,
        personData,
        options
      );

      if (!updatedPerson) {
        return res.status(404).json({ error: "Person not found!" });
      }

      res.json(updatedPerson);
    } catch (error) {
      res.status(500).json({ error: "Error updating person" });
    }
  },
  deletePerson: async (req: Request, res: Response) => {
    const { uid } = req.user ?? {};
    if (!uid) return res.status(401).json({ error: "Not authorized" });

    if (!isValidObjectId(req?.params?.id))
      return res.status(500).json({ error: "Wrong ID format!" });

    const id = new mongoose.Types.ObjectId(req.params.id);

    try {
      const deletedPerson = await PersonModel.findByIdAndDelete(id);

      if (!deletedPerson) {
        return res.status(404).json({ error: "Person not found!" });
      }

      res.json(deletedPerson);
    } catch (error) {
      res.status(500).json({ error: "Error deleting person" });
    }
  },
};

export default PersonController;
