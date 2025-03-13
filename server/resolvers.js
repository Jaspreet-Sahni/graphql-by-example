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
                {
                    id: 'test-id3',
                    title: 'The title 3',
                    description: 'The description 3'
                    },

        ]
        },
        greeting:() => 'Hello World'
    }
}