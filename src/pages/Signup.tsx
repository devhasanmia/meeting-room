import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import { TUser } from "../types/Signup.type";
import Button from "../components/ui/Button";
import { useSignupMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "../schemas/validation";
import { Divider } from "antd";
import { Link } from "react-router-dom";

const Signup = () => {
  const [signup, { isLoading }] = useSignupMutation();

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
      toast.success("User Created Successfully");
      reset();
    } catch (error: any) {
      toast.error(error.data.errorMessages[0].message);
    }
  };

  return (
    <div>
      <div className="bg-gray-100 flex items-center justify-center h-screen">
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
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  {...register("role")}
                  id="role"
                  name="role"
                  className="mt-1 block w-full p-3 border border-green-400 rounded-md shadow-sm focus:outline-none ring-1 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
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
    </div>
  );
};

export default Signup;
