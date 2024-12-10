export type ActionResponseType<T> = {
    isOk: boolean;
    data?: T;
    message?: string;
    error?: string;
};
