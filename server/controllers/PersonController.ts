import mongoose, { isValidObjectId } from "mongoose";
import { PersonModel } from "../models/Person";
import { IPerson, IPersonModel } from "../types/person/types";
import { Request, Response } from "express";

const PersonController = {
  getAllPersons: async (_: any, res: Response) => {
    try {
      const persons: IPerson[] = await PersonModel.find();
      return res.status(200).json(persons);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error getting data" });
    }
  },

  getPerson: async (req: Request, res: Response) => {
    if (!isValidObjectId(req?.params?.id))
      return res.status(500).json({ error: "Wrong ID format!" });

    const id = new mongoose.Types.ObjectId(req?.params?.id);

    try {
      const person: IPerson | null = await PersonModel.findById(id);
      if (person && person !== null) return res.status(200).json(person);

      return res.status(404).json({ error: "Person not found!" });
    } catch (error) {
      console.log("Error retreiving person", error);
      res.status(500).json({ error: "Error retreiving person" });
    }
  },

  createPerson: async (req: Request, res: Response) => {
    const { first_name, last_name, email, phone_number } = req.body ?? {};

    if (!first_name || !last_name) {
      return res
        .status(500)
        .json({ error: "Please enter all required fields." });
    }

    try {
      const personData: IPerson = {
        first_name,
        last_name,
        email,
        phone_number,
      };

      const person = new PersonModel(personData);

      await person.save();
      res.status(201).json(person);
    } catch (error) {
      console.log(error);
    }
  },

  updatePerson: async (req: Request, res: Response) => {
    const { id, first_name, last_name, phone_number, email } = req.body;

    try {
      const personData: IPerson = {
        first_name,
        last_name,
        email,
        phone_number,
      };

      const filter = { _id: id };
      const options = { new: true }; // Return the updated document

      const updatedPerson = await PersonModel.findOneAndUpdate(
        filter,
        personData,
        options
      );

      if (!updatedPerson) {
        return res.status(404).json({ error: "Person not found!" });
      }

      res.json(updatedPerson);
    } catch (error) {
      console.log("Error updating person", error);
      res.status(500).json({ error: "Error updating person" });
    }
  },
  deletePerson: async (req: Request, res: Response) => {
    if (!isValidObjectId(req?.body?.id))
      return res.status(500).json({ error: "Wrong ID format!" });

    const id = new mongoose.Types.ObjectId(req?.body?.id);

    try {
      const deletedPerson = await PersonModel.findByIdAndDelete(id);

      if (!deletedPerson) {
        return res.status(404).json({ error: "Person not found!" });
      }

      res.json(deletedPerson);
    } catch (error) {
      console.log("Error deleting person: ", error);
      res.status(500).json({ error: "Error deleting person" });
    }
  },
};

export default PersonController;
