import React from 'react';
import { Item, Label } from 'semantic-ui-react'

const setText = (s) =>
    s.length >= 300
        ? s.substr(0, 300) + "..."
        : s;


const Post = ({ url, parseTitle, parseImage, parseText , parseViews }) => {
    return (
        <Item>
            <Item.Image src={parseImage} />
            <Item.Content>
                <Item.Header as='a' href={url} target='_blank'>{parseTitle}</Item.Header>
                <Item.Description>{setText(parseText)}</Item.Description>
                <Item.Extra>
                    <Label icon='eye' content={parseViews} />
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}

export default Post;