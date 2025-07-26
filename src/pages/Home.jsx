import React, {useEffect, useState} from 'react'
import appwriteService from '../appwrite/config'
import authService from '../appwrite/auth';
import { Container, PostCard } from '../components'
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([])
    const {user, loading} = useAuth();


    useEffect(() => {

        if(user) {
            appwriteService.getPosts((posts) => {
                if(posts) {
                    setPosts(posts.documents)
                }
            })
        }



    }, [user])

    if(loading) return null;

    if(!user) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                                Login to read Posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <h1 className='text-3xl font-bold mb-6 text-green-900 flex items-center justify-center my-auto'>
                    Welcome to your Blog
                </h1>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
        
            </Container>
        </div>
    )

}

export default Home
