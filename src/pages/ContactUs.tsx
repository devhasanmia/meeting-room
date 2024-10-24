import { Divider } from "antd";
import Input from "../components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../schemas/validation";
import Button from "../components/ui/Button";
import { toast } from "sonner";

const ContactUs = () => {
  type TContact = {
    name: string;
    email: string;
    subject: string;
    message: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TContact>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<TContact> = async (formData) => {
    try {
      toast.success("Thank you! Your message has been successfully sent.");
      reset();
    } catch (error) {
      console.log(error);
    }

    console.log(formData);
  };
  return (
    <div className=" bg-gray-100 flex items-center justify-center p-6 min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <Divider style={{ fontSize: "30px" }}>Contact Us</Divider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-between space-y-6">
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-gray-600">hasanmiaweb@gmail.com</p>
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-gray-600">+88 01740398196</p>
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">Office Address</h3>
              <p className="text-gray-600">
                Chandrapur, Purulia - 6400, Gurudaspur, Natore
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Name"
              name="name"
              placeholder="Enter your Full Name"
              register={register("name")}
              errors={errors}
              type="text"
            />
            <Input
              label="Email"
              name="email"
              placeholder="Enter your Vaild Email"
              register={register("email")}
              errors={errors}
              type="text"
            />
            <Input
              label="Subject"
              name="subject"
              placeholder="Enter subject"
              register={register("subject")}
              errors={errors}
              type="text"
            />
            <Input
              label="Message"
              name="message"
              placeholder="Message"
              register={register("message")}
              errors={errors}
            />
            <Button text="Send Message" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
