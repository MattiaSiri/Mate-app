import Image from 'next/image';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import AOS from 'aos';

export default function HowItWorks() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const steps = [
    {
      image: '/hiw0.png',
      title: 'Crea il tuo profilo',
      description: 'Aggiungi foto, informazioni e cosa cerchi da un coinquilino.',
    },
    {
      image: '/hiw1.png',
      title: 'Compila il questionario',
      description: 'Conosci i tuoi match grazie a un test psicologico.',
    },
    {
      image: '/hiw2.png',
      title: 'Incontra i coinquilini compatibili',
      description: 'Chattate e scegliete in modo semplice con chi vivere.',
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white via-blue-50 to-blue-100 text-center">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Come funziona Mate</h2>
        <p className="text-lg text-gray-600 mb-12">Scopri come trovare il coinquilino giusto in pochi click.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105 p-6 flex flex-col items-center text-center"
            >
              <Image src={step.image} alt={step.title} width={160} height={160} className="mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
