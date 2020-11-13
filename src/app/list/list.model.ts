export class List {
    constructor(
                public date: Date,
                public title: string, 
                public color: string,
                public list: [{ task: string, completed: boolean }],
                public id?: string
    ) {}
}