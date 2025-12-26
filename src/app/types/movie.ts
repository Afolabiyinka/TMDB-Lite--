export interface MovieType {
  id: string | number;
  title?: string;
  name?: string;
  poster_path?: string;
  release_date?: string;
  [key: string]: any;
}
