export abstract class CustomError extends Error {
    abstract getStatus(): number;
    abstract getResponse(): string;
}
