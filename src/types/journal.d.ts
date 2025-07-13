export interface Journal {
  objectId: string;
  createdBy: string;
  title: string;
  content: string;
  tags: string[];
  categories: string[];
  coverImage: string;
  excerpt: string;
  publishDate: string;
  status: "draft" | "published";
  minutesRead?: number;
  slug: string;
}
