import { State } from '~/server/enums/state'
import { Category } from './category.entity'
import { CategoryRepository } from './category.repository'

export class CategoryController {
  categories() {
    return CategoryRepository.findActives()
  }

  create(newCategory: Category) {
    return CategoryRepository.create(newCategory)
  }

  update(id: number, newData: Partial<Category>) {
    return CategoryRepository.update(id, newData)
  }

  remove(id: number) {
    return CategoryRepository.update(id, { state: State.DELETED })
  }
}
