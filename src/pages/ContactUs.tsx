import Input from "../components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../schemas/validation";
import Button from "../components/ui/Button";
import { toast } from "sonner";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

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
    <div className="bg-slate-50 min-h-screen py-28 px-6">
      <div className="w-full max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Contact Us
          </h1>
          <p className="text-base text-slate-500 font-medium">
            Have questions about bookings, pricing, or custom options? Drop us a line below.
          </p>
        </div>

        {/* Grid Info + Form */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
          {/* Contact Details Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Email Card */}
            <div className="flex items-center space-x-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300">
              <div className="flex justify-center items-center rounded-xl w-12 h-12 bg-indigo-50 text-indigo-600 shrink-0">
                <FiMail className="text-xl" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Email Address</h4>
                <a href="mailto:hasanmiaweb@gmail.com" className="text-slate-500 text-sm font-medium hover:text-indigo-600 transition-colors mt-0.5 block">
                  hasanmiaweb@gmail.com
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="flex items-center space-x-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300">
              <div className="flex justify-center items-center rounded-xl w-12 h-12 bg-emerald-50 text-emerald-600 shrink-0">
                <FiPhone className="text-xl" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Phone Number</h4>
                <p className="text-slate-500 text-sm font-medium mt-0.5">+88 01740398196</p>
              </div>
            </div>

            {/* Office Address Card */}
            <div className="flex items-center space-x-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300">
              <div className="flex justify-center items-center rounded-xl w-12 h-12 bg-violet-50 text-violet-600 shrink-0">
                <FiMapPin className="text-xl" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Office Address</h4>
                <p className="text-slate-500 text-sm font-medium mt-0.5 leading-relaxed">
                  Chandrapur, Purulia - 6400, Gurudaspur, Natore
                </p>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="md:col-span-3 bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-lg">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="name"
                  placeholder="John Doe"
                  register={register("name")}
                  errors={errors}
                  type="text"
                />
                <Input
                  label="Email Address"
                  name="email"
                  placeholder="john@example.com"
                  register={register("email")}
                  errors={errors}
                  type="email"
                />
              </div>
              <Input
                label="Subject"
                name="subject"
                placeholder="How can we help you?"
                register={register("subject")}
                errors={errors}
                type="text"
              />
              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  placeholder="Write your details here..."
                  className={`w-full px-4 py-3 rounded-lg border text-slate-800 placeholder-slate-400 bg-white transition-all duration-300 focus:outline-none focus:ring-2 min-h-32 focus:border-indigo-500 focus:ring-indigo-100 ${
                    errors.message
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500 animate-pulse">{errors.message.message}</p>
                )}
              </div>
              <Button text="Send Message" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
