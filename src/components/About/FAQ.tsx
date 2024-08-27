"use client";

const FAQ = () => {
  return (
    <section className="bg-base-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-center text-primary mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div className="bg-base-200 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              What types of job listings are available on your platform?
            </h3>
            <p className="text-lg leading-relaxed">
              Our platform features a diverse range of job listings including full-time, part-time, contract, and freelance opportunities across various industries. Whether you are looking for entry-level positions or executive roles, you will find a wide array of options to suit your career aspirations.
            </p>
          </div>
          <div className="bg-base-200 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              How do I apply for a job through your site?
            </h3>
            <p className="text-lg leading-relaxed">
              Applying for a job is simple. Once you find a listing that interests you, click on the &quot;Apply&quot; button and follow the prompts to submit your application. You can upload your resume, cover letter, and any other required documents directly through our platform.
            </p>
          </div>
          <div className="bg-base-200 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              How can employers post job openings?
            </h3>
            <p className="text-lg leading-relaxed">
              Employers can easily post job openings by creating an account on our platform. Once logged in, you can navigate to the &quot;Post a Job&quot; section, fill out the necessary details about the position, and publish your listing. Our team is available to assist you with any questions during the process.
            </p>
          </div>
          <div className="bg-base-200 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              Do you offer any resources for job seekers?
            </h3>
            <p className="text-lg leading-relaxed">
              Yes, we provide various resources to support job seekers, including resume building tips, interview preparation guides, and career advice articles. Our goal is to help you succeed in your job search and advance your career.
            </p>
          </div>
          <div className="bg-base-200 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              What should I do if I encounter issues on the site?
            </h3>
            <p className="text-lg leading-relaxed">
              If you experience any issues with our site, please contact our support team through the &quot;Contact Us&quot; page. We are committed to providing prompt assistance and resolving any problems you may encounter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
