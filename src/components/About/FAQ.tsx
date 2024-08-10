"use client";

const FAQ = () => {
  return (
    <section className="bg-base-200 py-12">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">What services do you offer?</h3>
            <p className="mt-4">We offer a wide range of services including product development, consulting, and support. Our team is skilled in various technologies and is ready to assist you with your projects.</p>
          </div>
          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">How can I get started?</h3>
            <p className="mt-4">You can start by signing up for a free trial on our website. If you have any questions, feel free to contact our support team.</p>
          </div>
          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Do you offer customer support?</h3>
            <p className="mt-4">Yes, we offer 24/7 customer support. Our team is here to help you with any issues or questions you may have.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
