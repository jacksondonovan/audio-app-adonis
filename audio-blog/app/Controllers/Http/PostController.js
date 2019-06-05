'use strict'

//Bring in model
const Post = use('App/Models/Post')

class PostController {
  async index({ view }) {

    // const posts = [
    //   {title: 'Post One', body: 'This is post 1'},
    //   {title: 'Post Two', body: 'This is post 2'},
    //   {title: 'Post Three', body: 'This is post 3'}
    // ]

    const posts = await Post.all();

    return view.render('posts.index', {
      title: 'Latest Posts',
      posts: posts.toJSON()
    })
  }

  async add({ view }) {
    return view.render('posts.add')
  }
}

module.exports = PostController
