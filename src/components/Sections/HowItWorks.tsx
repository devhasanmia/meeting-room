const HowItWorks = () => {
    const steps = [
      {
        id: 1,
        title: "Browse Available Rooms",
        description: "View a list of meeting rooms with real-time availability and amenities.",
        icon: "🗂️",
      },
      {
        id: 2,
        title: "Select Date & Time",
        description: "Choose your desired date and time with our intuitive calendar interface.",
        icon: "📅",
      },
      {
        id: 3,
        title: "Confirm Your Booking",
        description: "Reserve your selected room and receive instant booking confirmation.",
        icon: "✅",
      },
      {
        id: 4,
        title: "Manage Your Schedule",
        description: "Easily modify or cancel bookings as your plans change.",
        icon: "🔄",
      },
    ];
  
    return (
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-gray-600 mb-12">
            Simple steps to book and manage your meeting spaces.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div
                key={step.id}
                className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-6">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default HowItWorks;
  