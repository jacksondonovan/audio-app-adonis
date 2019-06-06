'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserFilesSchema extends Schema {
  up () {
    this.create('user_files', (table) => {
      table.increments()
      table.string('file')
      table.string('author')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_files')
  }
}

module.exports = UserFilesSchema
