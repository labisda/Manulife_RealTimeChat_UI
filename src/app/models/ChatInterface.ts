export interface Chat {
    user_id: number;
    fullname: string;
    message: string;
    date_created: Date;
}

export interface InsertChat {
    user_id: number;
    message: string;
}