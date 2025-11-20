import { Size } from "@prisma/client";

export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  link?: string | null;
  sizes: Size | null;
  isActive: boolean;
};
