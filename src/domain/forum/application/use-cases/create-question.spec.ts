import type { QuestionsRepository } from '../repositories/questions.repository.js'
import type { Question } from '../../enterprise/entities/question.js'
import { CreateQuestionUseCase } from './create-question.js'

const fakeQuestionRepository: QuestionsRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (question: Question) => {},
}

test('Create an question', async () => {
  const CreateQuestion = new CreateQuestionUseCase(fakeQuestionRepository)

  const { question } = await CreateQuestion.execute({
    authorId: '1',
    title: 'Nova pergunta',
    content: 'Conteúdo da pergunta'
  })

  expect(question.id).toBeTruthy()
})
