'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const HeroSection: React.FC = () => (
  <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
    <div className="container mx-auto px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Forge App</h1>
      <p className="text-lg md:text-xl mb-8">Track your fitness journey with ease and style.</p>
      <button className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
        Get Started
      </button>
    </div>
  </section>
);

const FeatureShowcase: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Features</h2>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/3 px-4 mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <LucideIcon name="activity" className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Customizable Plans</h3>
            <p>Create and manage personalized workout plans.</p>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-4 mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <LucideIcon name="bar-chart" className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p>Monitor your progress with detailed analytics.</p>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-4 mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <LucideIcon name="watch" className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Device Integration</h3>
            <p>Sync with your favorite wearables for accurate data.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Page: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-2xl">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <HeroSection />
      <FeatureShowcase />
    </div>
  );
};

export default Page;