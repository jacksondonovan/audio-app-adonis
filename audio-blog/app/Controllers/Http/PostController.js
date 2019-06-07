'use strict'
const axios = require('axios')

const UserFile = use('App/Models/UserFile')
const ApiEndpoint = 'https://gtvnoefe9c.execute-api.us-east-1.amazonaws.com/audio/uploads/'

class PostController {
  async index({ view }) {
    const user_files = await UserFile.all()

    for(let i = 0; i < user_files.rows.length; i++) {
      let abbrevFileName = user_files.rows[i]['$attributes'].file.split('/');
      user_files.rows[i]['$attributes'].abbrev_file = abbrevFileName[abbrevFileName.length - 1];
    }

    return view.render('posts.index', {
      user_files: user_files.toJSON()
    })
  }

  async add({ view }) {
    return view.render('posts.index')
  }

  async store({ request, response, session }) {
    const user_file = new UserFile()

    axios.post(ApiEndpoint, {
      file: request.input('file'),
      author: request.input('author')
    }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });

    user_file.file = ApiEndpoint + request.input('file')
    user_file.author = request.input('author')

    await user_file.save()

    session.flash({ notification: 'Post Added!' })

    return response.redirect('/posts')
  }
}

module.exports = PostController
