import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'


function PostCard({$id, title, featuredImage}) {
    // const imageUrl = appwriteService.getFilePreview(featuredImage);
    // console.log("Image preview URL:", imageUrl);
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 dark:bg-gray-800 rounded-xl p-4 transition-colors duration-300 shadow-sm hover:shadow-md'>
            <div className='w-full mb-4 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-600'>
                <img src={appwriteService.getFileView(featuredImage)} alt={title}
                className='w-full h-auto object-cover' />

            </div>
            <h2 className='text-xl font-bold text-gray-900 dark:text-white'>{title}</h2>
        </div>
    </Link>
  )

}

export default PostCard
