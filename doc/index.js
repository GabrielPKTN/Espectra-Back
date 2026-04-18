const basicInfo = require('./basicInfo')
const components = require('./components')
const paths = require('./paths')

module.exports = {
    paths: {
        ...basicInfo,
        ...components,
        ...paths
    }
}