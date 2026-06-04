import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../components/ui/Input";
import { TUser } from "../../types/Signup.type";
import Button from "../../components/ui/Button";
import { useSignupMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "../../schemas/validation";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FiUserPlus } from "react-icons/fi";

const Signup = () => {
  const [signup, { isLoading, data: signupData }] = useSignupMutation();
  const navigate = useNavigate();
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
      navigate(`/login`, { replace: true });
    } catch (error: any) {
      toast.error(error?.data?.errorMessages?.[0]?.message || "Registration failed");
    }
  };

  useEffect(() => {
    if (signupData) {
      toast.success(signupData?.message);
    }
  }, [signupData]);

  return (
    <div className="bg-slate-50 flex items-center justify-center min-h-screen px-4 py-12">
      <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-2xl">
        {/* Top Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="flex justify-center mx-auto items-center rounded-2xl w-12 h-12 bg-indigo-50 text-indigo-600 shadow-inner">
            <FiUserPlus className="text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Create Account</h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Sign up to get started booking rooms
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              errors={errors}
              register={register("name")}
              type="text"
              label="Full Name"
              name="name"
              placeholder="John Doe"
            />
            <Input
              errors={errors}
              register={register("email")}
              type="email"
              label="Email Address"
              name="email"
              placeholder="john@example.com"
            />
            <Input
              errors={errors}
              register={register("password")}
              type="password"
              label="Password"
              name="password"
              placeholder="••••••••"
            />
            <Input
              errors={errors}
              register={register("phone")}
              type="text"
              label="Phone Number"
              name="phone"
              placeholder="+88017XXXXXXXX"
            />
          </div>
          <Input
            errors={errors}
            register={register("address")}
            type="text"
            label="Address"
            name="address"
            placeholder="Natore, Bangladesh"
          />

          <div className="pt-2">
            <Button
              type="submit"
              text="Register"
              lodding={isLoading}
              disabled={isLoading}
              bgColor="bg-indigo-600 hover:bg-indigo-700"
            />
          </div>
        </form>

        {/* Bottom Link */}
        <p className="text-center mt-6 text-sm text-slate-500 font-medium">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline transition">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
