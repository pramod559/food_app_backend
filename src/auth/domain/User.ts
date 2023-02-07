export default class User {
    to: any;
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly type: string
    ) { }
}