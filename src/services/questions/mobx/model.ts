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

export type QuestionData = {
  id: number;
  category: Category | Category[];
  question: string;
  answers: string[];
  rightAnswer: number;
  image?: string;
  video?: string;
};

export type TicketData = {
  id: number;
  questions: QuestionData[];
};

export type CategoriesData = Record<Category, QuestionData[]>;

export type QuestionStatus = 'default' | 'right' | 'wrong';

export type Question = {
  localIndex: number;
  questionData: QuestionData;
  status: QuestionStatus;
  answeredIndex?: number;
};
