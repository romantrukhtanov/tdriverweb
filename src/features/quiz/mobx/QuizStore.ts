import { action, computed, makeObservable, observable } from 'mobx';
import * as R from 'remeda';

import { add, date as getDate, UnitOfTime } from 'services/datetime';
import type { Services } from 'services/servicesProvider';
import type * as M from 'services/questions/mobx/model';

import { DEFAULT_QUESTION, DEFAULT_QUIZ_TIME_MINUTES } from '../constants';

class QuizStore {
  constructor(private services: Services) {
    makeObservable(this);
  }

  @observable currentIndex = 0;
  @observable questions: M.Question[] = [];
  @observable activeQuestion: M.Question = DEFAULT_QUESTION;
  @observable isShowQuestionMark = false;
  @observable isGoToMainPage = false;

  @observable completedAt: Date = new Date();
  @observable finishedAt: Date = new Date();
  @observable private _isFinishedQuiz = false;

  @computed
  public get wrongAnswers() {
    return this.questions.reduce((acc, question) => {
      return question.status === 'wrong' ? acc + 1 : acc;
    }, 0);
  }

  @computed
  public get rightAnswers() {
    return this.questions.reduce((acc, question) => {
      return question.status === 'right' ? acc + 1 : acc;
    }, 0);
  }

  @computed
  public get isActiveQuestionAnswered() {
    if (!this.activeQuestion) {
      return false;
    }
    return this.checkAnsweredQuestion(this.activeQuestion);
  }

  @computed
  public get questionsAmount() {
    return this.questions.length;
  }

  @computed
  public get isFinishedQuiz() {
    if (this._isFinishedQuiz) {
      return true;
    }
    return this.answeredQuestionsAmount === this.questionsAmount;
  }

  @action
  private setIsFinishedQuiz(flag: boolean) {
    this._isFinishedQuiz = flag;
  }

  @computed
  public get answeredQuestionsAmount() {
    return this.questions.filter(this.checkAnsweredQuestion).length;
  }

  @action
  public setCurrentIndex = (nextIndex: number) => {
    this.currentIndex = nextIndex;
  };

  @action
  public setFinishedAt = (date: Date) => {
    this.finishedAt = date;
  };

  @action
  public setCompletedAt = (date: Date) => {
    this.completedAt = date;
  };

  @action
  public setQuestions = (questions: M.Question[]) => {
    this.questions = questions;
  };

  @action
  public startQuiz = (questions: M.Question[]) => {
    this.setQuestions(questions);
    this.setActiveQuestion(questions[0]);
    this.setCompletedAt(this.getQuizCompleteDate());
  };

  @action
  public resetQuiz = () => {
    this.questions = [];
    this.setActiveQuestion(DEFAULT_QUESTION);
    this.setDefaultQuizState();
  };

  @action
  public repeatQuiz = () => {
    this.questions = this.services.questions.patchToLocalQuestions(this.questions);
    this.setActiveQuestion(this.questions[0]);
    this.setDefaultQuizState();
  };

  @action
  private setDefaultQuizState = () => {
    this.setCurrentIndex(0);
    this.setIsFinishedQuiz(false);
    this.setIsShowQuestionMark(false);
    this.setCompletedAt(this.getQuizCompleteDate());
  };

  @action
  public setActiveQuestion = (question: M.Question) => {
    this.activeQuestion = question;
  };

  @action
  public setNextQuestion = () => {
    const nextIndex = this.getNextQuestionIndex();

    this.setCurrentIndex(nextIndex);
    this.setActiveQuestion(this.questions[nextIndex]);
  };

  @action
  public setIsShowQuestionMark = (flag: boolean) => {
    this.isShowQuestionMark = flag;
  };

  @action
  public setIsGoToMainPage = (flag: boolean) => {
    this.isGoToMainPage = flag;
  };

  @action
  public updateActiveQuestion = (updatedQuestion: M.Question) => {
    this.setActiveQuestion(updatedQuestion);

    this.setQuestions([
      ...this.questions.slice(0, this.currentIndex),
      updatedQuestion,
      ...this.questions.slice(this.currentIndex + 1),
    ]);
  };

  public getNextQuestionIndex(): number {
    const nextIndex = this.questions.findIndex(question => !this.checkAnsweredQuestion(question));

    if (nextIndex > 0) {
      return nextIndex;
    }

    return 0;
  }

  public checkAnsweredQuestion(question: M.Question): boolean {
    return R.isNumber(question.answeredIndex);
  }

  public checkAndSetFinishedQuiz = (forceFinish?: boolean) => {
    if (forceFinish) {
      this._isFinishedQuiz = forceFinish;
      this.setFinishedAt(getDate());
      return;
    }

    if (this.isFinishedQuiz) {
      this.setFinishedAt(getDate());
    }
  };

  public getQuizCompleteDate() {
    return add(getDate(), {
      [UnitOfTime.MINUTES]: DEFAULT_QUIZ_TIME_MINUTES,
      [UnitOfTime.SECONDS]: 1,
    });
  }
}

export { QuizStore };
