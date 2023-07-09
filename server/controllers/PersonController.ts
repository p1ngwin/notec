import { PersonModel } from "../models/Person";
import { IPerson, IPersonModel } from "../types/Person";
import { Request, Response } from "express";

const PersonController = {
  getAllPersons: async (req: Request, res: Response) => {
    try {
      const persons: IPerson[] = await PersonModel.find();
      return res.status(200).json(persons);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error getting data" });
    }
  },
  createPerson: async (req: Request, res: Response) => {
    const { first_name, last_name, email, phone_number } = req.body;
    try {

      const personData: IPerson = {
        first_name,
        last_name,
        email,
        phone_number
      }

      const person = new PersonModel(personData);

      await person.save();
      res.status(201).json(person);

    } catch (error) {
      console.log(error);
    }
  },
  updatePerson: async (req: Request, res: Response) => {
    const { id, first_name, last_name, phone_number, email } = req.body
    try {
      const personData: IPerson = {
        first_name,
        last_name,
        email,
        phone_number
      };

      const filter = { _id: id };
      const options = { new: true }; // Return the updated document

      const updatedPerson = await PersonModel.findOneAndUpdate(filter, personData, options)

      if (!updatedPerson) {
        return res.status(404).json({ error: "Person not found!" });
      }

      res.json(updatedPerson);

    }
    catch (error) {
      console.log("Error updating person", error);
      res.status(500).json({ error: "Error updating person" })
    }
  },
  deletePerson: async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
      const deletedPerson = await PersonModel.findByIdAndDelete(id)

      if (!deletedPerson) {
        return res.status(404).json({ error: "Person not found!" });
      }

      res.json(deletedPerson)
    }
    catch (error) {
      console.log("Error deleting person: ", error)
      res.status(500).json({ error: "Error deleting person" })
    }


  }
}

export default PersonController;
