const username = 'colinknebl';
const password = '%25%5ETYGHBN56tyghbn';
export const connectionString = `mongodb+srv://${username}:${password}@cluster0-d6pn8.azure.mongodb.net/test?retryWrites=true&w=majority`;

export const Mutation = {
    addPost(id: number, title: string) {
        console.log('added Post!', id, title);
        return {
            id,
        };
    },
};
