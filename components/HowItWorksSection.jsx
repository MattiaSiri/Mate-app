import React, { useEffect } from 'react';
import { FaUserPlus, FaQuestionCircle, FaUsers } from 'react-icons/fa';
import 'aos/dist/aos.css';
import AOS from 'aos';

function Step({ Icon, title, description }) {
  return (
    <div
      data-aos="fade-up"
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105 p-6 flex flex-col items-center text-center"
    >
      <Icon className="text-5xl text-purple-600 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default function HowItWorksSection() {
  useEffect(() => {
    AOS.init({ once: true, duration: 600 });
  }, []);

  const steps = [
    {
      Icon: FaUserPlus,
      title: 'Crea il tuo profilo',
      description: 'Inserisci foto e informazioni su di te e su cosa cerchi.',
    },
    {
      Icon: FaQuestionCircle,
      title: 'Compila il questionario',
      description: 'Scopri i match attraverso un semplice test.',
    },
    {
      Icon: FaUsers,
      title: 'Trova coinquilini compatibili',
      description: 'Incontra e scegli la persona giusta con cui vivere.',
    },
  ];

  const wavePath =
    'M0 67 C 273,183 822,-40 1440,74 V 104 H 0 V 67 Z';

  return (
    <section className="relative w-full bg-purple-50 py-16 overflow-hidden">
      <div className="absolute top-0 left-0 w-full -translate-y-full" aria-hidden="true">
        <svg viewBox="0 0 1440 104" className="w-full h-20 text-purple-50 fill-current rotate-180">
          <path d={wavePath} />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Come funziona</h2>
        <p className="text-lg text-gray-600 mb-12">Scopri come utilizzare il nostro servizio in tre semplici passi.</p>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, idx) => (
            <Step key={idx} {...step} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full translate-y-full" aria-hidden="true">
        <svg viewBox="0 0 1440 104" className="w-full h-20 text-purple-50 fill-current">
          <path d={wavePath} />
        </svg>
      </div>
    </section>
  );
}
