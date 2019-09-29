import { MongoClient } from 'mongodb';
const uri =
    'mongodb+srv://colinknebl:%25%5ETYGHBN56tyghbn@cluster0-d6pn8.azure.mongodb.net/test?retryWrites=true&w=majority';

export const posts = [
    {
        title: 'title 1',
        id: 1,
    },
    {
        title: 'title 2',
        id: 2,
    },
];

export const Query = {
    users(parent, args, context) {
        return [{ name: 'Nextjs' }];
    },
    async specialUser(parent, args, context) {
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
        });
        await client.connect();
        const collection = client.db('test').collection('users');

        const user = collection.find({ name: 'Sue' });
        // console.log(await user.next());
        // client.close();
        // return {
        //     name: 'Sue',
        //     age: 26,
        //     status: 'pending',
        // };
        return await user.next();
    },
    posts(parent, args, context) {
        return posts;
    },
    post(parent, args: { id: string }, context): { title: string; id: number } {
        return posts.find(post => post.id == parseInt(args.id));
    },
};
