"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  fullName: yup.string().trim().required("Full name is required").min(2, "Minimum 2 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function SignUp() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await axios.post("/api/register", data);

      if (res.status === 201) {
        alert("Registration successful!");
        router.push("/success");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white px-4">
      <h1 className="text-6xl font-extrabold text-zinc-500 mb-2">Register</h1>
      <p className="text-lg font-extrabold text-zinc-300 mb-6">Get in Touch</p>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg bg-zinc-900 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <input {...register("fullName")} type="text" placeholder="Full Name" className="w-full p-3 bg-black outline-none rounded" />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
        </div>

        <div className="mb-4">
          <input {...register("email")} type="email" placeholder="Email" className="w-full p-3 bg-black outline-none rounded" />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <input {...register("password")} type="password" placeholder="Password" className="w-full p-3 bg-black outline-none rounded" />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#484444] text-white font-semibold text-sm uppercase px-8 py-4 tracking-wide transition hover:bg-[#5a5a5a]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
