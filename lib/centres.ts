export type Zone = "Todos" | "Ramos Mejía" | "Morón" | "Buenos Aires";

export interface Centre {
  name: string;
  zone: Zone;
  address: string;
  mapsUrl: string;
  image?: string;
  hours: {
    weekday: string;
    saturday: string;
    sunday?: string;
  };
  tags: string[];
  featured?: boolean;
}

export const CENTRES: Centre[] = [
  // ── Ramos Mejía ──────────────────────────────────────────
  {
    name: "DIM Alta Complejidad",
    zone: "Ramos Mejía",
    address: "Espora 18, Ramos Mejía",
    mapsUrl: "https://maps.google.com/?q=Espora+18+Ramos+Mejia+Buenos+Aires",
    hours: { weekday: "7:00 – 21:00", saturday: "7:00 – 19:00", sunday: "8:00 – 17:30" },
    tags: ["Alta complejidad", "Imágenes", "Laboratorio"],
    featured: true,
  },
  {
    name: "DIM Rivadavia",
    zone: "Ramos Mejía",
    address: "Av. Rivadavia 14252, Ramos Mejía",
    mapsUrl: "https://maps.google.com/?q=Av.+Rivadavia+14252+Ramos+Mejia+Buenos+Aires",
    hours: { weekday: "Abierto 24 horas", saturday: "7:00 – 18:30", sunday: "7:00 – 18:30" },
    tags: ["Guardia 24hs", "Clínica", "Laboratorio"],
    featured: true,
  },
  {
    name: "DIM Sede Central",
    zone: "Ramos Mejía",
    address: "Belgrano 136, Ramos Mejía",
    mapsUrl: "https://maps.google.com/?q=Belgrano+136+Ramos+Mejia+Buenos+Aires",
    image: "https://dim.com.ar/nuestros-centros-y-horarios/img/1.DIM%20Sede%20Central.jpg",
    hours: { weekday: "7:00 – 20:00", saturday: "7:00 – 13:00" },
    tags: ["Imágenes", "Consultas", "Laboratorio"],
    featured: true,
  },
  {
    name: "DIM Mujer",
    zone: "Ramos Mejía",
    address: "Av. Rivadavia 14282, Ramos Mejía",
    mapsUrl: "https://maps.google.com/?q=Av.+Rivadavia+14282+Ramos+Mejia+Buenos+Aires",
    hours: { weekday: "7:30 – 20:00", saturday: "7:30 – 17:00" },
    tags: ["Ginecología", "Mamografía", "Densitometría"],
  },
  {
    name: "DIM Cardiovascular",
    zone: "Ramos Mejía",
    address: "Belgrano 137, Ramos Mejía",
    mapsUrl: "https://maps.google.com/?q=Belgrano+137+Ramos+Mejia+Buenos+Aires",
    image: "https://dim.com.ar/nuestros-centros-y-horarios/img/cardiovascular.png",
    hours: { weekday: "7:00 – 20:00", saturday: "7:00 – 12:30" },
    tags: ["Cardiología", "Ecocardiografía", "Holter"],
  },
  {
    name: "DIM Traumatología",
    zone: "Ramos Mejía",
    address: "Monteagudo 50, Ramos Mejía",
    mapsUrl: "https://maps.google.com/?q=Monteagudo+50+Ramos+Mejia+Buenos+Aires",
    image: "https://dim.com.ar/nuestros-centros-y-horarios/img/mont.png",
    hours: { weekday: "8:00 – 18:30", saturday: "8:00 – 12:00" },
    tags: ["Traumatología", "Ortopedia"],
  },
  {
    name: "DIM Odontología",
    zone: "Ramos Mejía",
    address: "Av. Rivadavia 14230, Ramos Mejía",
    mapsUrl: "https://maps.google.com/?q=Av.+Rivadavia+14230+Ramos+Mejia+Buenos+Aires",
    image: "https://dim.com.ar/nuestros-centros-y-horarios/img/3.DIM%20Odontologia.jpg",
    hours: { weekday: "8:00 – 20:00", saturday: "8:00 – 12:00" },
    tags: ["Odontología", "Radiología dental"],
  },
  {
    name: "DIM Kinesiología",
    zone: "Ramos Mejía",
    address: "Avellaneda 40, Ramos Mejía",
    mapsUrl: "https://maps.google.com/?q=Avellaneda+40+Ramos+Mejia+Buenos+Aires",
    image: "https://dim.com.ar/nuestros-centros-y-horarios/img/kinesioavellaneda.png",
    hours: { weekday: "7:30 – 19:30", saturday: "7:30 – 12:30" },
    tags: ["Kinesiología", "Rehabilitación"],
  },
  {
    name: "DIM Dermatología & Estética",
    zone: "Ramos Mejía",
    address: "Belgrano 162, Ramos Mejía",
    mapsUrl: "https://maps.google.com/?q=Belgrano+162+Ramos+Mejia+Buenos+Aires",
    image: "https://dim.com.ar/nuestros-centros-y-horarios/img/13.DIM%20Dermatolog%C3%ADa.png",
    hours: { weekday: "8:00 – 20:00", saturday: "8:00 – 17:00" },
    tags: ["Dermatología", "Estética médica"],
  },
  {
    name: "DIM Ramos Norte",
    zone: "Ramos Mejía",
    address: "Ardoino 640, Ramos Mejía",
    mapsUrl: "https://maps.google.com/?q=Ardoino+640+Ramos+Mejia+Buenos+Aires",
    image: "https://dim.com.ar/nuestros-centros-y-horarios/img/12.DIM%20Ramos%20Norte.png",
    hours: { weekday: "7:00 – 18:00", saturday: "7:00 – 17:00" },
    tags: ["Consultas", "Imágenes"],
  },

  // ── Morón ──────────────────────────────────────────────
  {
    name: "DIM CEPEM",
    zone: "Morón",
    address: "Machado 750, Morón",
    mapsUrl: "https://maps.google.com/?q=Machado+750+Moron+Buenos+Aires",
    image: "https://dim.com.ar/nuestros-centros-y-horarios/img/8.DIM%20Cepem.png",
    hours: { weekday: "7:00 – 21:00", saturday: "7:00 – 17:00" },
    tags: ["Alta complejidad", "PET-CT", "Medicina nuclear"],
    featured: true,
  },
  {
    name: "DIM Morón",
    zone: "Morón",
    address: "Av. Rivadavia 17624, Morón",
    mapsUrl: "https://maps.google.com/?q=Av.+Rivadavia+17624+Moron+Buenos+Aires",
    image: "https://dim.com.ar/nuestros-centros-y-horarios/img/10.DIM%20Moron.png",
    hours: { weekday: "7:00 – 20:00", saturday: "7:30 – 12:00" },
    tags: ["Consultas", "Imágenes", "Laboratorio"],
  },
  {
    name: "DIM Morón Traumatología",
    zone: "Morón",
    address: "Av. Rivadavia 17601, Morón",
    mapsUrl: "https://maps.google.com/?q=Av.+Rivadavia+17601+Moron+Buenos+Aires",
    image: "https://dim.com.ar/nuestros-centros-y-horarios/img/11.DIM%20Moron%20Traumatologia.jpg",
    hours: { weekday: "8:00 – 20:00", saturday: "8:00 – 12:00" },
    tags: ["Traumatología", "Ortopedia"],
  },

  // ── Buenos Aires ───────────────────────────────────────
  {
    name: "DIM Liniers",
    zone: "Buenos Aires",
    address: "Av. Rivadavia 10964, Liniers",
    mapsUrl: "https://maps.google.com/?q=Av.+Rivadavia+10964+Liniers+Buenos+Aires",
    image: "https://dim.com.ar/nuestros-centros-y-horarios/img/liniersok.png",
    hours: { weekday: "7:00 – 18:30", saturday: "7:00 – 13:00" },
    tags: ["Imágenes", "Laboratorio"],
  },
  {
    name: "DIM Caballito",
    zone: "Buenos Aires",
    address: "Av. Rivadavia 6001, Caballito",
    mapsUrl: "https://maps.google.com/?q=Av.+Rivadavia+6001+Caballito+Buenos+Aires",
    image: "https://dim.com.ar/nuestros-centros-y-horarios/img/centrodimcaballito.png",
    hours: { weekday: "7:00 – 13:30", saturday: "7:00 – 13:00" },
    tags: ["Imágenes", "Laboratorio"],
  },
  {
    name: "DIM Once",
    zone: "Buenos Aires",
    address: "Av. Rivadavia 2198, Once",
    mapsUrl: "https://maps.google.com/?q=Av.+Rivadavia+2198+Once+Buenos+Aires",
    image: "https://dim.com.ar/nuestros-centros-y-horarios/img/centrodimonce.png",
    hours: { weekday: "7:00 – 18:30", saturday: "7:00 – 13:00" },
    tags: ["Imágenes", "Laboratorio"],
  },
];
