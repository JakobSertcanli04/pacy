export interface Session {
  title: string
  wiifm: string
}

export interface Chapter {
  title: string
  sessions: Session[]
}

export interface Article {
  title: string
  content: string
  wordCount: number
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface TrainingProgram {
  chapters: Chapter[]
  articles: Article[]
  quizQuestions: QuizQuestion[]
}

