export const resolvers = {
    Query :{
        jobs: ()=>{
            return [
                {
                id: 'test-id1',
                title: 'The title 1',
                description: 'The description 1'
                },
                {
                id: 'test-id2',
                title: 'The title 2',
                description: 'The description 2'
                },
        ]
        },
        greeting:() => 'Hello World'
    }
}