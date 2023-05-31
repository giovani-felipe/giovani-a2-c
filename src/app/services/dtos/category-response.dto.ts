export type CategoryDTO = {
  id: number;
  name: string;
};

export type CategoryResponseDTO = {
  trivia_categories: CategoryDTO[];
};
