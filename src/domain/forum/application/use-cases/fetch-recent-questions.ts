import { Question } from '../../enterprise/entities/question.js'
import type { QuestionsRepository } from '../repositories/questions.repository.js'

interface FecthRecentQuestionsUseCaseRequest {
  page: number
}

interface FecthRecentQuestionsUseCaseResponse {
  questions: Question[]
}

export class FecthRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page
  }: FecthRecentQuestionsUseCaseRequest): Promise<FecthRecentQuestionsUseCaseResponse> {

    const questions = await this.questionsRepository.findManyRecent({
      page
    })

    return {
      questions
    } 
  }
}
