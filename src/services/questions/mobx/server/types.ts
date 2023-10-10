export type Category =
  | 'terms'
  | 'obligations'
  | 'traffic_lights'
  | 'emergency_signals'
  | 'start_of_movements'
  | 'transport_location'
  | 'speed'
  | 'overtake'
  | 'parking'
  | 'equal_intersections'
  | 'regulated_intersections'
  | 'unregulated_intersections'
  | 'railway'
  | 'motorway'
  | 'external_lights'
  | 'towing'
  | 'people_transportation'
  | 'cargo_transportation'
  | 'warning_signs'
  | 'prohibition_signs'
  | 'prescriptive_signs'
  | 'additional_signs'
  | 'road_markers'
  | 'exploitation'
  | 'identification_signs'
  | 'auto_control'
  | 'medical_aid';

export type Question = {
  id: number;
  category: Category | Category[];
  question: string;
  answers: string[];
  answer: number;
  image?: string;
  video?: string;
};

export type Ticket = {
  id: number;
  questions: Question[];
};
