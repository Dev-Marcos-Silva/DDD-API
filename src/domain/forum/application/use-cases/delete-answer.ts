import type { AnswersRepository } from '../repositories/answers-repository.js'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {

    const question = await this.answersRepository.findById(answerId)

    if(!question){
      throw new Error('Question not found.')
    }

    if(authorId !== question.authorId.toString()){
      throw new Error('Not allowed.')
    }

    await this.answersRepository.delete(question)

    return { } 
  }
}
