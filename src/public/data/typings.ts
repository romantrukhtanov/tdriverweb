type Question = {
  id: number;
  question: string;
  category: string | string[];
  answers: string[];
  answer: number;
  image?: string;
  video?: string;
}

type Ticket = {
  id: number;
  questions: Question[]
};

export type Tickets = Ticket[];
