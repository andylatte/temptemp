export type ActiveScreen = 
  | 'overview' 
  | 'methoden' 
  | 'fuer-wen' 
  | 'haltung' 
  | 'ueber-mich' 
  | 'preise' 
  | 'kontakt'
  | 'methoden-lab'
  | 'rechner'
  | 'buchen';

export interface SupervisionFormat {
  id: string;
  title: string;
  subtitle: string;
  targetGroup: string;
  description: string;
  bulletPoints: string[];
  priceTag: string;
  priceNote: string;
  duration: string;
  actionText: string;
  icon: string;
}

export interface CohortSchedule {
  id: string;
  title: string;
  focus: string;
  dates: string[];
  time: string;
  capacity: number;
  availableSeats: number;
  status: 'open' | 'few_seats' | 'waitlist';
}

export interface BookingAppointment {
  date: string;
  time: string;
  name: string;
  email: string;
  phone?: string;
  format: string;
  topic?: string;
  mode: 'video' | 'phone' | 'atelier';
}

export interface ConstellationFigure {
  id: string;
  label: string;
  role: string;
  x: number;
  y: number;
  rotation: number;
  color: string;
  type: 'person' | 'client' | 'leader' | 'boundary' | 'resource';
}
