import { AnswerQuestionUseCase } from './answer-question.js'
import type { AnswersRepository } from '../repositories/answers-repository.js'
import type { Answer } from '../../enterprise/entities/answer.js'

const fakeAnswerRepository: AnswersRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (answer: Answer) => {},
}

test('Create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestion.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
