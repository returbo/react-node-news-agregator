import React from 'react';

const Post = props => {
    return (
        <div className="post">
            <div 
                className="post__image" 
                style={{ backgroundImage: `url(${ props.image })`}} 
            />
            <div className="post__info">
                <h2 className="post__title">{props.title}</h2>
                <p className="post__description">{props.description}</p>
            </div>
        </div>
    )
}

export default Post;