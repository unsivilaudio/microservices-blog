type Post = {
    id: string;
    title: string;
};

export type Posts = {
    [key: string]: Post;
};
