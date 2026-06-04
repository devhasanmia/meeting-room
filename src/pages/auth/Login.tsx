import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { TUser } from "../../types/Signup.type";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { loginValidation } from "../../schemas/validation";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { tokenVerify } from "../../utils/tokenVerify";
import { FiLock } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  type TuserLogin = Pick<TUser, "email" | "password">;
  const [login, { isLoading, data: loginData }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TuserLogin>({
    resolver: zodResolver(loginValidation),
  });

  const onSubmit: SubmitHandler<TuserLogin> = async (formData) => {
    try {
      const res = await login(formData).unwrap();
      const userDecoded = tokenVerify(res.token);
      dispatch(
        setUser({
          user: userDecoded,
          token: res?.token,
        })
      );
      navigate(`/`, { replace: true });
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    if (loginData) {
      toast.success(loginData?.message);
    }
  }, [loginData]);

  return (
    <div className="bg-slate-50 flex items-center justify-center min-h-screen px-4 py-12">
      <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md">
        {/* Top Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="flex justify-center mx-auto items-center rounded-2xl w-12 h-12 bg-indigo-50 text-indigo-600 shadow-inner">
            <FiLock className="text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Welcome Back</h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Login to access your bookings
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            errors={errors}
            register={register("email")}
            type="text"
            label="Email Address"
            name="email"
            placeholder="name@example.com"
          />
          <Input
            errors={errors}
            register={register("password")}
            type="password"
            label="Password"
            name="password"
            placeholder="••••••••"
          />
          <div className="pt-2">
            <Button
              type="submit"
              text="Login"
              lodding={isLoading}
              disabled={isLoading}
              bgColor="bg-indigo-600 hover:bg-indigo-700"
            />
          </div>
        </form>

        {/* Bottom Link */}
        <p className="text-center mt-6 text-sm text-slate-500 font-medium">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline transition">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
