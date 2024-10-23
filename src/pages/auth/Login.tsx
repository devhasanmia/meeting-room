import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { TUser } from "../../types/Signup.type";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { loginValidation } from "../../schemas/validation";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () => {
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
      await login(formData).unwrap();
      reset();
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  useEffect(() => {
    if (loginData) {
      toast.success(loginData?.message);
    }
  }, [loginData]);

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <Divider style={{ fontSize: "40px" }}>Login</Divider>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols md:grid-cols gap-6">
            <Input
              errors={errors}
              register={register("email")}
              type="text"
              label="Enter your Email Address"
              name="email"
              placeholder="Enter your email address"
            />
            <Input
              errors={errors}
              register={register("password")}
              type="password"
              label="Enter your Password"
              name="password"
              placeholder="Enter your password"
            />
          </div>
          <Button
            type="submit"
            text="Login"
            lodding={isLoading}
            disabled={isLoading}
          />
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
