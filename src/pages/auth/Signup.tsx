import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../components/ui/Input";
import { TUser } from "../../types/Signup.type";
import Button from "../../components/ui/Button";
import { useSignupMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "../../schemas/validation";
import { Divider } from "antd";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Signup = () => {
  const [signup, { isLoading, data: signupData }] = useSignupMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUser>({
    resolver: zodResolver(userValidation),
  });

  const onSubmit: SubmitHandler<TUser> = async (formData) => {
    try {
      await signup(formData).unwrap();
      reset();
    } catch (error: any) {
      toast.error(error.data.errorMessages[0].message);
    }
  };

  useEffect(() => {
    if (signupData) {
      toast.success(signupData?.message);
    }
  }, [signupData]);

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-[100vh]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <Divider style={{ fontSize: "40px" }}>Sign Up</Divider>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              errors={errors}
              register={register("name")}
              type="text"
              label="Full Name"
              name="name"
              placeholder="Enter your full name"
            />

            <Input
              errors={errors}
              register={register("email")}
              type="email"
              label="Email"
              name="email"
              placeholder="Enter your Email Address"
            />
            <Input
              errors={errors}
              register={register("password")}
              type="password"
              label="Password"
              name="password"
              placeholder="Password"
            />
            <Input
              errors={errors}
              register={register("phone")}
              type="text"
              label="Phone"
              name="phone"
              placeholder="Phone Number"
            />
            <Input
              errors={errors}
              register={register("address")}
              type="text"
              label="address"
              name="address"
              placeholder="address"
            />
          </div>
          <Button
            type="submit"
            text="Register"
            lodding={isLoading}
            disabled={isLoading}
          />
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
