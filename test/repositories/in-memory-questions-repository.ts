import type { QuestionsRepository } from "@/domain/forum/application/repositories/questions.repository.js";
import type { Question } from "@/domain/forum/enterprise/entities/question.js";

export class InMemoryQuestionsRepository implements QuestionsRepository {
    public items: Question[] = []

    async findBySlug(slug: string) {
        const question = this.items.find(item => item.slug.value === slug)

        if(!question) {
            return null
        }

        return question
    }

    async create(question: Question) {
        this.items.push(question)
    }
}