export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  link?: string | null;
  order?: string | null;
  isActive: boolean;
};
