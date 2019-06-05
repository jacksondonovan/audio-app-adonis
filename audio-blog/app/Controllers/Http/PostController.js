'use strict'

//Bring in model
const Post = use('App/Models/Post')

class PostController {
  async index({ view }) {
    const posts = await Post.all();

    return view.render('posts.index', {
      title: 'Latest Posts',
      posts: posts.toJSON()
    })
  }

  async add({ view }) {
    return view.render('posts.index')
  }

  async store({ request, response, session }) {
    const post = new Post();

    post.file = request.input('file')
    post.author = request.input('author')

    await post.save()

    session.flash({ notification: 'Post Added!' })

    return response.redirect('/posts')
  }
}

module.exports = PostController
