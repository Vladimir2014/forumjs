import { Post } from '../../post/models/post';

export class Forum {
    id?: number;
    name: string;
    description: string;
    numberOfPosts?: number;
    posts?: Post[];
}