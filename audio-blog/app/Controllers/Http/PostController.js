'use strict'

const UserFile = use('App/Models/UserFile')

class PostController {
  async index({ view }) {
    const user_files = await UserFile.all()

    return view.render('posts.index', {
      user_files: user_files.toJSON()
    })
  }

  async add({ view }) {
    return view.render('posts.index')
  }

  async store({ request, response, session }) {
    const user_file = new UserFile()

    user_file.file = request.input('file')
    user_file.author = request.input('author')

    await user_file.save()

    session.flash({ notification: 'Post Added!' })

    return response.redirect('/posts')
  }
}

module.exports = PostController
