const modelUtils = require('./model-utils');
const loadModels = require('./model-loader');
const { getModelByQuery, getModelsByQuery } = require('./model-matcher');


module.exports = {
    loadModels,
    getModelByQuery,
    getModelsByQuery,
    ...modelUtils
};
