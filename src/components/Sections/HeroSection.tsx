import CustomLink from "../ui/CustomLink";
const HeroSection = () => {
  return (
    <div className="relative h-[750px] flex items-center justify-center text-center bg-gray-800 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-emerald-300 opacity-40"
        style={{
          backgroundImage: `url(${"https://ctfassets.imgix.net/vh7r69kgcki3/46VeGE2tnqmkRLYI6VEJeh/9e35ea0ec8c67569128be3f0bccff6eb/Web_150DPI-20221216_WeWork_Product_Shoot_Q4_3.jpg"})`,
        }}
      ></div>

      <div className="relative z-10 p-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Book Your Ideal Meeting Room with Ease.
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Efficient, hassle-free room booking for all your meeting needs.
        </p>

        <CustomLink to="/meeting-rooms" className="bg-green-400 p-3 rounded-md">
          Book Now
        </CustomLink>
      </div>
    </div>
  );
};

export default HeroSection;
