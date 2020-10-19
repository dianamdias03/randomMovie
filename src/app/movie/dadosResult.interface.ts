import { Movie } from './movie.interface';
export interface dadosResult {
  page: number;
  total_results: number;
  total_pages: number;
  results: Movie[];
}
