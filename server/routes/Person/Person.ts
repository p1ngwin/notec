import { connect } from "mongoose";
import { PersonModel } from "../../models/Person";
import dotenv from "dotenv";
dotenv.config();

const uri = String(process.env.DATABASE_CONNECTION);

export async function AddPerson() {
  // 4. Connect to MongoDB
  await connect(uri);

  const person = new PersonModel({
    first_name: "Bill",
    last_name: "Billson",
    email: "bill@initech.com",
    phone_number: "040-725-101",
  });
  await person.save();

  console.log(person); // 'bill@initech.com'
}

export async function GetPersons() {
  // 4. Connect to MongoDB
  await connect(uri);

  const persons = await PersonModel.find();

  console.log(persons); // 'bill@initech.com'
}
