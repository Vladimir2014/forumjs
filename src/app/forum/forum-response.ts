import { PostModel } from '../shared/post.model';

export class ForumModel {
    id?: number;
    name: string;
    description: string;
    numberOfPosts?: number;
    posts?: PostModel[];
}