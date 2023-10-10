import { action, autorun, computed, makeObservable, observable } from 'mobx';
import * as R from 'remeda';

import type { Services } from 'services';
import type { Language } from 'services/i18n';
import type { Tickets } from 'public/data/typings';

import { DEFAULT_CATEGORIES_DATA, DEFAULT_QUIZ_QUESTIONS_AMOUNT } from '../constants';
import { convertTickets } from './server/converters';
import { checkCategory, getLocalQuestion } from './helpers';
import * as S from './server/types';
import * as M from './model';

/* eslint-disable @typescript-eslint/naming-convention */
const ticketsDict: Record<Language, (() => Promise<{ default: Tickets }>) | null> = {
  ru: () => import(/* webpackChunkName: "tickets/ru" */ 'public/data/tickets_ru.json'),
  uz: () => import(/* webpackChunkName: "tickets/uz" */ 'public/data/tickets_uz.json'),
  uzk: () => import(/* webpackChunkName: "tickets/uzk" */ 'public/data/tickets_uzk.json'),
};
/* eslint-enable @typescript-eslint/naming-convention */

class QuestionsStore {
  constructor(private services: Services) {
    makeObservable(this);

    autorun(() => {
      const { selectedLanguage } = this.services.settings;
      ticketsDict[selectedLanguage]?.().then(({ default: tickets }) => {
        this.setTicketsDictionary(selectedLanguage, tickets);
      });
    });
  }

  @observable.struct private ticketsDictionary: Partial<Record<Language, Tickets>> = {};
  @observable public tickets: M.TicketData[] = [];

  @computed
  public get allQuestions() {
    return this.tickets.flatMap(ticket => ticket.questions);
  }

  @computed
  public get ticketsAmount() {
    return this.tickets.length;
  }

  @computed
  public get categories() {
    return this.allQuestions.reduce<M.CategoriesData>((acc, question) => {
      if (Array.isArray(question.category)) {
        question.category.forEach(category => {
          acc[category].push(question);
        });
      } else {
        acc[question.category].push(question);
      }

      return acc;
    }, R.clone(DEFAULT_CATEGORIES_DATA));
  }

  getQuestions = ({ ticketID, category }: { ticketID?: number; category?: string }) => {
    if (ticketID) {
      return this.getQuestionsByTicketID(Number(ticketID));
    }
    if (category) {
      return this.getQuestionsByCategory(category);
    }
    return this.getRandomQuestions(DEFAULT_QUIZ_QUESTIONS_AMOUNT);
  };

  getRandomQuestions = (amount: number): M.Question[] => {
    const randomQuestions = R.take(R.shuffle(this.allQuestions), amount);
    return randomQuestions.map(getLocalQuestion);
  };

  getQuestionsByCategory = (category: string) => {
    if (checkCategory(category)) {
      const categoryQuestions = this.categories[category];
      return categoryQuestions.map(getLocalQuestion);
    }
    return null;
  };

  // TODO: Add check tickets function
  getQuestionsByTicketID = (ticketID: number) => {
    const ticket = this.tickets.find(ticketData => ticketData.id === ticketID);

    if (!ticket) {
      return null;
    }

    return ticket.questions.map(getLocalQuestion);
  };

  @action
  setTickets = () => {
    const { selectedLanguage } = this.services.settings;
    const ticketsData = this.ticketsDictionary[selectedLanguage];

    this.tickets = convertTickets(ticketsData as S.Ticket[]);
  };

  patchToLocalQuestions = (questions: M.Question[]) => {
    return questions.map((question, index) => getLocalQuestion(question.questionData, index));
  };

  @action
  private setTicketsDictionary = (language: Language, tickets: Tickets) => {
    this.ticketsDictionary[language] = tickets;
    this.setTickets();
  };
}

export { QuestionsStore };
