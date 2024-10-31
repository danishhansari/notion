export type User = {
  fullName: string;
  email: string;
  image: string;
};

export interface Document {
  id: number | null;
  title: string | null;
}
