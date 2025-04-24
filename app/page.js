"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BookOpen,
  User,
  Briefcase,
  ThumbsUp,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import HowItWorks from "./HowItWorks";


function Hero() {
  return (
    <section className="bg-gradient-to-tr from-[#EAF0FF] to-white pt-24 pb-32">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight"
        >
          Transform Your Learning Experience with{" "}
          <span className="text-[#274DF0]">AI</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto"
        >
          Explore our smart dashboards tailored for Educators, Students, and Job
          Seekers.
        </motion.p>

        {/* 🚀 Feature Cards with Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <FeatureCard
            icon={<BookOpen className="w-10 h-10 text-[#274DF0]" />}
            title="Educator Dashboard"
            desc="Design custom learning paths using Gen AI for your students."
            href="/dashboard"
          />
          <FeatureCard
            icon={<User className="w-10 h-10 text-[#274DF0]" />}
            title="Student Dashboard"
            desc="Access personalized courses and Study materials"
            href="/dashboard"
          />
          <FeatureCard
            icon={<Briefcase className="w-10 h-10 text-[#274DF0]" />}
            title="Mock Interview"
            desc="Simulate real interviews with instant AI feedback and performance reports to ace your dream job."
            href="https://ai-mock-interviews-nu.vercel.app/"
          />
        </motion.div>

        <br />
        <HowItWorks />
        <WhyChooseUs />
        {/* <Footer /> */}
      </div>
    </section>
  );
}

// ✨ Animated Feature Card
function FeatureCard({ icon, title, desc, href }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white bg-opacity-60 backdrop-blur-lg p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transform transition-all duration-300 text-left"
    >
      <div className="mb-4">{icon}</div>
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <p className="mt-2 text-gray-600">{desc}</p>
      <Link href={href}>
        <Button className="mt-6 px-5 py-2">Explore</Button>
      </Link>
    </motion.div>
  );
}

// 🏁 Last Section - Why Choose Us
function WhyChooseUs() {
  const perks = [
    {
      icon: <ThumbsUp className="w-8 h-8 text-[#274DF0]" />,
      title: "User-Friendly Design",
      description:
        "Clean, intuitive dashboards for every user role with smooth navigation.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#274DF0]" />,
      title: "AI-Powered Efficiency",
      description:
        "Get smarter recommendations, automatic assessments, and adaptive learning paths.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#274DF0]" />,
      title: "Secure & Reliable",
      description:
        "Your data is encrypted, protected, and handled with utmost privacy standards.",
    },
  ];

  return (
    <section className="mt-16 bg-gradient-to-b from-white to-[#EAF0FF] py-20">
      <div className="text-center px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Why Choose Us?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          We’re not just another AI platform. We’re your partner in smarter
          learning, career prep, and seamless teaching.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {perks.map((perk, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.2 }}
              className="p-6 rounded-xl bg-white shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300"
            >
              <div className="mb-3 flex justify-center">{perk.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {perk.title}
              </h3>
              <p className="mt-2 text-gray-600">{perk.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 👇 Footer Component

export default Hero;
