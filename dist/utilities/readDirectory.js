'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _validateTargetDirectory = require('./validateTargetDirectory');

var _validateTargetDirectory2 = _interopRequireDefault(_validateTargetDirectory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hasIndex = directoryPath => {
  const indexPath = _path2.default.resolve(directoryPath, 'index.js');

  try {
    _fs2.default.statSync(indexPath);

    return true;
  } catch (error) {
    return false;
  }
};

const hasNoExtension = fileName => {
  const matches = fileName.match(/\./g);

  return !matches;
};

const hasMultipleExtensions = fileName => {
  const matches = fileName.match(/\./g);

  return matches && matches.length > 1;
};

const isSafeName = fileName => {
  return (/^[a-z][a-z0-9._]+$/i.test(fileName)
  );
};

const removeDuplicates = files => {
  return _lodash2.default.filter(files, fileName => {
    return !_lodash2.default.includes(files, fileName + '.js');
  });
};

exports.default = function (directoryPath) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  let children;

  if (!(0, _validateTargetDirectory2.default)(directoryPath, { silent: options.silent })) {
    return false;
  }

  children = _fs2.default.readdirSync(directoryPath);

  children = _lodash2.default.filter(children, fileName => {
    const absolutePath = _path2.default.resolve(directoryPath, fileName);
    const isDirectory = _fs2.default.statSync(absolutePath).isDirectory();

    if (!isSafeName(fileName)) {
      return false;
    }

    if (hasNoExtension(fileName) && !isDirectory) {
      return false;
    }

    if (hasMultipleExtensions(fileName)) {
      return false;
    }

    if (_lodash2.default.startsWith(fileName, 'index.js')) {
      return false;
    }

    if (!isDirectory && (!_lodash2.default.endsWith(fileName, '.js') || !_lodash2.default.endsWith(fileName, '.jsx'))) {
      return false;
    }

    if (isDirectory && !hasIndex(absolutePath)) {
      return false;
    }

    return true;
  });

  children = removeDuplicates(children);

  return children.sort();
};
//# sourceMappingURL=readDirectory.js.map