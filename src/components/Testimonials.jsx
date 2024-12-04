/* eslint-disable react/no-unescaped-entities */
const Testimonials = () => {
    const testimonials = [
      {
        id: 1,
        name: "John Doe",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        feedback: "The visa application process was seamless and quick. Highly recommend!",
        country: "USA",
      },
      {
        id: 2,
        name: "Jane Smith",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        feedback: "Great platform with accurate information. Made my travel planning hassle-free.",
        country: "Canada",
      },
      {
        id: 3,
        name: "Akira Tanaka",
        image: "https://randomuser.me/api/portraits/men/77.jpg",
        feedback: "Exceptional service! The step-by-step guidance was very helpful.",
        country: "Japan",
      },
    ];
  
    return (
      <section className="py-12 bg-light dark:bg-gray-800 transition duration-500">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto ">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="card shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-700"
            >
              <div className="p-6 text-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 mx-auto rounded-full border-2 border-gray-300 dark:border-gray-500"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.country}</p>
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  "{testimonial.feedback}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Testimonials;
  