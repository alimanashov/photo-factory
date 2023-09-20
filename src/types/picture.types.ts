export interface Picture {
    id: string;
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
        small_s3: string;
    };
    user: {
        name: string;
        twitter_username: null | string;
        profile_image: {
            small: string;
            medium: string;
            large: string;
        };
    };
}

export interface User {
    id: string;
}
