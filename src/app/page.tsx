"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Logo } from "@/components/svg/logo";
import { useUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export default function Home() {
  const { user, signIn, pending, error } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  if (user) redirect("/photos");

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signIn(email, password);
  };

  return (
    <div className="max-w-xs md:h-screen flex flex-col justify-center mx-auto">
      <div className="w-full flex flex-col items-center justify-center space-y-6 mb-10">
        <Logo />
        <h1 className="font-bold text-xl">Sign in to your account</h1>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Username"
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          error={errors.email}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Password"
          {...register("password", { required: true })}
          error={error ?? errors.password}
        />
        <Button type="submit" loading={pending}>
          Sign in
        </Button>
      </form>
    </div>
  );
}
