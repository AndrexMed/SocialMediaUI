export interface Post {
    id: number;
    userId: number | undefined;
    date: Date;
    description: string;
    image: string;
    title: string;
}

export interface CreatePostDTO extends Omit<Post, 'id'> { }