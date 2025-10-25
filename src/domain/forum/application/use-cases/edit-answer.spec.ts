import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js'
import { EditAnswerUseCase } from './edit-answer.js'
import { makeAnswer } from 'test/factories/make-answer.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'

let inMemoryAnswersRepository: InMemoryAnswersRepository
// system under test
let sut: EditAnswerUseCase 

describe('Edit Answer', () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {

    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1')
      }, 
        new UniqueEntityId('answer-1')
    )
    
    await inMemoryAnswersRepository.create(newAnswer)
    
    await sut.execute({
      authorId: 'author-1',
      content: 'Conteúdo teste',
      answerId: newAnswer.id.toValue()
    })
    
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Conteúdo teste', 
    })
  })

  it('should not able to edit a answer from another user', async () => {

    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1')
      }, 
        new UniqueEntityId('answer-1')
    )
    
    await inMemoryAnswersRepository.create(newAnswer)

    await expect(() => {
      return sut.execute({
        authorId: 'author-2',
        content: 'Conteúdo teste',
        answerId: newAnswer.id.toValue()
      })
    }).rejects.toBeInstanceOf(Error)
    
  })
})
