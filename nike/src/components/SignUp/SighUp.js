"use client";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  name: yup.string().trim().required("Name is required").min(2, "Minimum 2 characters"),
  surname: yup.string().trim().required("Surname is required").min(2, "Minimum 2 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function SignUp() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("User Data:", data);
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/success");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white px-4">
      <h1 className="text-3xl font-extrabold text-zinc-500 mb-2">Register</h1>
      <p className="text-lg font-extrabold text-zinc-300 mb-6">Get in Touch</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-zinc-900 p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="w-full p-3 bg-black outline-none rounded"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <input
            {...register("surname")}
            type="text"
            placeholder="Surname"
            className="w-full p-3 bg-black outline-none rounded"
          />
          {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname.message}</p>}
        </div>

        <div className="mb-4">
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-black outline-none rounded"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-black outline-none rounded"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex justify-center">
          <Button
            className="bg-[#484444] text-white font-semibold text-sm uppercase px-8 py-4 tracking-wide transition hover:bg-[#5a5a5a]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>

      <p className="text-xs text-gray-400 mt-4">
        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
      </p>
    </div>
  );
}
