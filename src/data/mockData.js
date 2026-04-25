export const kpiData = {
  totalCatch2025: 1250430, // TM
  catch2024: 1100500, // TM
  catch2023: 1050000, // TM
  quotaAssigned: 2000000, // TM
  activeVessels: 452,
  topZone: "Norte-Centro"
};

export const vesselsData = [
  { id: 1, matricula: "CE-1234-PM", nombre: "MARIA I", tipo: "Industrial", capacidad: 350, puerto: "Chimbote", estado: "Activa", ultimaSalida: "2025-05-10", license: "Vigente" },
  { id: 2, matricula: "PL-5678-CM", nombre: "DON JOSE", tipo: "Artesanal", capacidad: 30, puerto: "Paita", estado: "Inactiva", ultimaSalida: "2025-05-01", license: "Vigente" },
  { id: 3, matricula: "CE-9012-PM", nombre: "PESCADOR III", tipo: "Industrial", capacidad: 420, puerto: "Callao", estado: "Activa", ultimaSalida: "2025-05-11", license: "Vigente" },
  { id: 4, matricula: "SU-3456-PM", nombre: "SUR OLA", tipo: "Industrial", capacidad: 380, puerto: "Ilo", estado: "Activa", ultimaSalida: "2025-05-09", license: "Vigente" },
  { id: 5, matricula: "NO-7890-CM", nombre: "NORTEÑO", tipo: "Artesanal", capacidad: 25, puerto: "Chicama", estado: "Inactiva", ultimaSalida: "2025-04-20", license: "Expirada" },
];

export const monthlyCatchData = [
  { month: "Ene", captura: 150000, limite: 200000 },
  { month: "Feb", captura: 180000, limite: 200000 },
  { month: "Mar", captura: 210000, limite: 200000 },
  { month: "Abr", captura: 250000, limite: 200000 },
  { month: "May", captura: 280000, limite: 200000 },
  { month: "Jun", captura: 180430, limite: 200000 }
];

export const fleetCatchData = [
  { name: "Industrial", value: 85 },
  { name: "Artesanal", value: 15 }
];

export const zoneCatchData = [
  { name: "Norte", value: 45 },
  { name: "Centro", value: 35 },
  { name: "Sur", value: 20 }
];

export const portCatchData = [
  { name: "Chimbote", value: 30 },
  { name: "Callao", value: 25 },
  { name: "Paita", value: 20 },
  { name: "Ilo", value: 15 },
  { name: "Otros", value: 10 }
];

export const mapZonesData = [
  { id: 1, name: "Zona Norte (Piura/Lambayeque)", coords: [-5.5, -81.5], density: "Alta", catch: 560000 },
  { id: 2, name: "Zona Centro (Ancash/Lima)", coords: [-10.0, -78.5], density: "Muy Alta", catch: 680000 },
  { id: 3, name: "Zona Sur (Ica/Moquegua)", coords: [-15.5, -75.5], density: "Media", catch: 210430 }
];
