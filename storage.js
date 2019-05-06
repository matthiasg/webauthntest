
// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/fido');

const map = new Map()

function getCredentials(uid) {
  if (map.has(uid)) {
    return map.get(uid)
  } else {
    const m = new Map()
    map.set(uid, m)
    return m
  }
}

module.exports = storage = {
  Credentials: {
    create(cred) {
      const ids = getCredentials(cred.uid)
      ids.set(cred.id, cred)
    },
    async findOne({ uid, id }) {
      const ids = getCredentials(uid)
      return ids.get(id)
    },
    async findOneAndUpdate({ uid, id }, updated) {
      const ids = getCredentials(uid)
      ids.set(id, updated)
    },
    async remove({ uid, id }) {
      const ids = getCredentials(uid)
      ids.remove(id)
    },
    find({ uid }) {
      const ids = getCredentials(uid)
      
      return {
        async lean() {
          return [...ids.values()]
        }
      }
    }
  }
}

module.exports = storage;