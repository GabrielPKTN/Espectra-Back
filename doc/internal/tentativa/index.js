const getById =           require('./getById.js')
const post =              require('./post.js')


module.exports = {
    "v1/espectra/tentativa/": {
        ...post
    },

    "v1/espectra/tentativa/{id}": {
        ...getById
    }

}