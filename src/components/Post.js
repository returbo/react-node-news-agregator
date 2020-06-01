import React from 'react';

const Post = ({ title, image, description }) => {
    return (
        <div className="post">
            <div 
                className="post__image" 
                style={{backgroundImage: `url(${image})` }}
            />
            <div className="post__info">
                <h2 className="post__title">{title}</h2>
                <p className="post__description">{description}</p>
            </div>
        </div>
    )
}

export default Post;