export type ArticleDTO = {
  id: string;
  slug: string;
  title: string;
  image: string;
  createdDate: Date;
  tags: string[];
  content: string;
  views: number;
};
