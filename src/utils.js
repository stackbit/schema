const _ = require('lodash');


module.exports = {
    failFunctionWithTag,
    assertFunctionWithFail,
    copyIfNotSet,
    copy,
    rename,
    joinPathAndGlob,
    globToArray
};


function failFunctionWithTag(tag) {
    return function fail(message) {
        throw new Error(`[${tag}] ${message}`);
    };
}

function assertFunctionWithFail(fail) {
    return function assert(value, message) {
        if (!value) {
            fail(message);
        }
    }
}

function copyIfNotSet(sourceObject, sourcePath, targetObject, targetPath, transform) {
    if (!_.has(targetObject, targetPath)) {
        copy(sourceObject, sourcePath, targetObject, targetPath, transform);
    }
}

function copy(sourceObject, sourcePath, targetObject, targetPath, transform) {
    if (_.has(sourceObject, sourcePath)) {
        let value = _.get(sourceObject, sourcePath);
        if (transform) {
            value = transform(value);
        }
        _.set(targetObject, targetPath, value);
    }
}

function rename(object, oldPath, newPath) {
    if (_.has(object, oldPath)) {
        _.set(object, newPath, _.get(object, oldPath));
        oldPath = _.toPath(oldPath);
        if (oldPath.length > 1) {
            object = _.get(object, _.initial(oldPath));
        }
        delete object[_.last(oldPath)];
    }
}

function joinPathAndGlob(pathStr, glob) {
    glob = globToArray(glob);
    return _.map(glob, (globPart) => _.compact([pathStr, globPart]).join('/'));
}

function globToArray(glob) {
    return _.chain(glob).castArray().compact().reduce((accum, globPart) => {
        const globParts = _.chain(globPart).trim('{}').split(',').compact().value();
        return _.concat(accum, globParts)
    }, []).value();
}
