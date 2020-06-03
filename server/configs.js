const elems = {
    riadagestan: {
        title: '.itemTitle',
        image: '.preview_picture',
        attr: 'src',
        text: '#qaz',
        views: '.itemHits b',
    },
    magastimes: {
        title: '.td-post-title .entry-title',
        image: 'meta[property="og:image"]',
        attr: 'content',
        text: '.td-post-content p',
        views: '.td-post-views span',
    },
}

export { elems };