"use client";
import { motion } from "framer-motion";
import { Sparkles, Brain, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Sparkles className="w-8 h-8 text-[#274DF0]" />,
    title: "Step 1: Choose Your Role",
    description: "Select whether you're a student, educator, or job seeker to begin your personalized experience.",
  },
  {
    icon: <Brain className="w-8 h-8 text-[#274DF0]" />,
    title: "Step 2: AI Tailors Content",
    description: "The system generates personalized content and learning paths based on your profile and goals.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-[#274DF0]" />,
    title: "Step 3: Learn, Track, Succeed",
    description: "Engage with interactive tools, track your progress, and level up your skills or career readiness.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-white py-28 px-6 text-center mt-9">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">How It Works</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        A simple 3-step process to guide you from learning to success using smart AI features.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="p-8 rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-blue-50 transition-all duration-300"
          >
            <div className="mb-4 flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
            <p className="mt-2 text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
