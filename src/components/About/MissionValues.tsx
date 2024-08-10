"use client";

const MissionValues = () => {
  return (
    <section className="bg-base-100 py-12">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Our Mission & Values</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="p-6 bg-base-200 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p>
              To empower businesses with innovative solutions that drive growth and efficiency. We are committed to delivering excellence through our products and services.
            </p>
          </div>
          <div className="p-6 bg-base-200 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Our Values</h3>
            <ul className="list-disc list-inside">
              <li>Integrity</li>
              <li>Innovation</li>
              <li>Customer Focus</li>
              <li>Teamwork</li>
              <li>Excellence</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionValues;
