interface Hero {
    id: number;
    name: string;
    owner: string;
}

const heroes: Hero[] = [
    {
        id: 1,
        name: 'Iron Man',
        owner: 'Marvel'
    },

    {
        id: 2,
        name: 'SpiderMan',
        owner: 'Marvel'
    },

    {
        id: 3,
        name: 'Batman',
        owner: 'DC',
    }
]

export default heroes;