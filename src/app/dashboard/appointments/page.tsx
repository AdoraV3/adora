'use client'

import type { NextPage } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import DownloadTemplate from '@/features/appointments/download-template';
import BookingAppointment from '@/features/appointments/booking-appointment';
import Instructions from '@/features/appointments/instructions';

const AppointmentPage: NextPage = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(s => Math.min(s + 1, 2));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const progressWidth = step === 1 ? '50%' : '100%';

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <header className="mb-8">
          <h1 className="font-bold text-gray-900">Create your Appointment</h1>
          <div className="flex items-center mt-2">
            <p className="text-[var(--accent)] font-semibold mr-4 whitespace-nowrap">Step {step} of 2</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[var(--accent)] h-2 rounded-full transition-all duration-500 ease-in-out" 
                style={{ width: progressWidth }}
              ></div>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {step === 1 ? <DownloadTemplate /> : <BookingAppointment />}
          <Instructions step={step} />
        </main>

        <footer className="mt-12 flex justify-between items-center">
            <button 
                onClick={handleBack}
                disabled={step === 1}
                className="flex items-center gap-2 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ArrowLeft size={18} />
                Previous Step
            </button>
            <button 
                onClick={handleNext}
                disabled={step === 2}
                className="flex items-center gap-2 bg-[var(--accent)] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[var(--accent-dark)] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-50 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next Step
                <ArrowRight size={18} />
            </button>
        </footer>
      </div>
    </div>
  );
};

export default AppointmentPage;