"use client";

const MissionValues = () => {
  return (
    <section className="bg-base-00 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-center text-primary mb-12">
          Our Mission & Values
        </h2>
        <div className="grid gap-12 md:grid-cols-2">
          <div className="bg-base-200 p-8 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold text-primary mb-6">
              Our Mission
            </h3>
            <p className="text-lg leading-relaxed">
              Our mission is to revolutionize the job market by connecting employers with top talent and providing job seekers with the tools they need to succeed. We strive to foster a dynamic and inclusive platform that enhances career opportunities and drives professional growth.
            </p>
          </div>
          <div className="bg-base-200 p-8 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold text-primary mb-6">
              Our Values
            </h3>
            <ul className="list-disc list-inside text-lg leading-relaxed space-y-4">
              <li><strong>Integrity:</strong> We uphold the highest ethical standards in everything we do.</li>
              <li><strong>Innovation:</strong> We embrace new technologies and ideas to stay ahead in the evolving job market.</li>
              <li><strong>Customer Focus:</strong> We prioritize the needs of our users and strive to exceed their expectations.</li>
              <li><strong>Teamwork:</strong> We believe in the power of collaboration and working together to achieve common goals.</li>
              <li><strong>Excellence:</strong> We are committed to delivering superior quality in our services and solutions.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionValues;
