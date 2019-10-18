interface IName {
    first: string;
    last: string;
}

export class Person {
    constructor(
        public id: string,
        public name: IName,
        public email: string,
        public phone: string,
        public image: string
    ) {}
}
