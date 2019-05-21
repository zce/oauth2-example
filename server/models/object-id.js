// https://github.com/typicode/lodash-id/blob/master/src/index.js

const objectId = require("bson-objectid")

module.exports = {
  __id () {
    return this.id || 'id'
  },

  __createId () {
    return objectId().str
  },

  // Empties properties
  __empty (doc) {
    this.forEach(doc, (value, key) => delete doc[key])
  },

  // Removes an item from an array
  __remove (array, item) {
    const index = this.indexOf(array, item)
    if (index !== -1) array.splice(index, 1)
  },

  insert (collection, doc) {
    const id = doc[this.__id()] || this.__createId()

    const exists = this.getById(collection, id)
    if (exists) throw new Error('Insert failed, duplicate id')

    doc = this.assign({ id }, doc)
    collection.push(doc)
    return doc
  },

  upsert (collection, doc) {
    if (doc[this.__id()]) {
      // id is set
      const entry = this.getById(collection, doc[this.__id()])
      if (entry) {
        // replace properties of existing object
        this.__empty(entry)
        this.assign(entry, doc)
      } else {
        // push new object
        collection.push(doc)
      }
    } else {
      // create id and push new object
      doc[this.__id()] = this.__createId()
      collection.push(doc)
    }

    return doc
  },

  getById (collection, id) {
    return this.find(collection, doc => {
      if (!this.has(doc, this.__id())) return null

      return doc[this.__id()].toString() === id.toString()
    })
  },

  updateById (collection, id, attrs) {
    const doc = this.getById(collection, id)

    if (doc) {
      this.assign(doc, attrs, { id: doc.id })
    }

    return doc
  },

  updateWhere (collection, predicate, attrs) {
    const docs = this.filter(collection, predicate)

    docs.forEach(doc => this.assign(doc, attrs, { id: doc.id }))

    return docs
  },

  replaceById (collection, id, attrs) {
    const doc = this.getById(collection, id)

    if (doc) {
      const docId = doc.id
      this.__empty(doc)
      this.assign(doc, attrs, { id: docId })
    }

    return doc
  },

  removeById (collection, id) {
    const doc = this.getById(collection, id)

    this.__remove(collection, doc)

    return doc
  },

  removeWhere (collection, predicate) {
    const docs = this.filter(collection, predicate)

    docs.forEach(doc => this.__remove(collection, doc))

    return docs
  }
}
