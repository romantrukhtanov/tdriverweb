import * as S from './types';
import * as M from '../model';

function convertQuestion(question: S.Question): M.QuestionData {
  return {
    id: question.id,
    category: question.category,
    question: question.question,
    answers: question.answers,
    rightAnswer: question.answer,
    image: question.image || undefined,
    video: question.video || undefined,
  };
}

function convertTicket(ticket: S.Ticket): M.TicketData {
  return {
    id: ticket.id,
    questions: ticket.questions.map(convertQuestion),
  };
}

export function convertTickets(tickets: S.Ticket[]): M.TicketData[] {
  return tickets.map(convertTicket);
}
