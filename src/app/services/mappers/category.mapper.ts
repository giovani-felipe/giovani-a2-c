import { Category } from '../../models/category';
import { CategoryDTO } from '../dtos/category-response.dto';

export class CategoryMapper {
  static toModel(dto: CategoryDTO): Category {
    return {
      id: dto.id,
      name: dto.name,
    };
  }
}
