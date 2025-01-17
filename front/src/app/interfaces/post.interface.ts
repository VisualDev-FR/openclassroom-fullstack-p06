export interface Post {
  id: number;
  topic_id: number;
  user_id: number;
  title: string;
  description: string;
  created_at: Date;
}
