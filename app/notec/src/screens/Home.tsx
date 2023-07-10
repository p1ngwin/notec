import { IPerson } from "@/types/person/Person";
import { fetchData } from "@/utils/api/fetch";
import { postData } from "@/utils/api/post";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Home = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    return postData("http://localhost:8000/persons/add", data);
  };

  return (
    <>
      <h1>Hello from Home</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input {...register("first_name", { required: true })} />
        <br />
        <input {...register("last_name", { required: true })} />
        <br />
        <input {...register("phone_number", { required: true })} />
        <br />
        <input {...register("email")} />
        <br />
        <input type="submit" />
      </form>
    </>
  );
};

export default Home;
