"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowUpRight, type LucideIcon, ShieldCheck, ScanLine, CalendarClock, DoorOpen } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5491166485555";
const FORM_URL = "https://forms.gle/bWMVDQgThA19acUF6";
const PORTAL_URL = "https://portal.dim.com.ar/";

type Faq = {
  icon: LucideIcon;
  question: string;
  answer: React.ReactNode;
};

const FAQS: Faq[] = [
  {
    icon: ShieldCheck,
    question: "¿Atienden obras sociales y prepagas?",
    answer: (
      <>
        <p className="text-[#4B4F56] font-light text-sm leading-relaxed mb-4">
          Si, atendemos una gran cantidad de coberturas médicas y prepagas, como
          así también de forma particular.
        </p>
        <Link
          href="/coberturas-medicas"
          className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
        >
          Ver coberturas
          <ArrowUpRight size={15} strokeWidth={2.25} aria-hidden="true" />
        </Link>
      </>
    ),
  },
  {
    icon: ScanLine,
    question: "¿Qué tipo de resonancias realizan?",
    answer: (
      <p className="text-[#4B4F56] font-light text-sm leading-relaxed">
        Realizamos estudios con y sin contraste, incluyendo resonancias de
        cerebro, columna, abdomen, cardíacas, mamas, próstata y más.
      </p>
    ),
  },
  {
    icon: CalendarClock,
    question: "¿Cómo puedo sacar turno?",
    answer: (
      <p className="text-[#4B4F56] font-light text-sm leading-relaxed">
        Podés hacerlo por{" "}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#F26A21] font-medium hover:underline"
        >
          WhatsApp
        </a>
        , completar el{" "}
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#F26A21] font-medium hover:underline"
        >
          formulario
        </a>{" "}
        o ingresar al{" "}
        <a
          href={PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#F26A21] font-medium hover:underline"
        >
          Portal de Turnos.
        </a>
      </p>
    ),
  },
  {
    icon: DoorOpen,
    question: "¿Tienen resonador abierto?",
    answer: (
      <p className="text-[#4B4F56] font-light text-sm leading-relaxed">
        Nuestros resonadores son abiertos o semiabiertos. Las salas de resonancia
        magnética son amplias y confortables, con un ambiente relajado y pensado
        para que te sientas en confianza. Para tu tranquilidad, podés asistir un
        día a visualizar los equipos antes del turno.
      </p>
    ),
  },
];

export default function ResonanciaFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {FAQS.map((faq, index) => {
        const Icon = faq.icon;
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.question}
            className="bg-white border border-[#E6EAF1] rounded-2xl overflow-hidden transition-colors hover:border-[#F26A21]/40"
          >
            <button
              onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
              aria-expanded={isOpen}
              className="w-full flex items-center gap-4 p-5 text-left"
            >
              <span className="w-10 h-10 shrink-0 bg-gradient-to-br from-[#FFF3EC] to-[#F4EFE7] rounded-xl flex items-center justify-center">
                <Icon size={18} className="text-[#F26A21]" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="flex-1 font-medium text-[#081827] leading-snug">
                {faq.question}
              </span>
              <span className="shrink-0 text-[#737985]" aria-hidden="true">
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
              </span>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-0">
                <div className="pl-14">{faq.answer}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
