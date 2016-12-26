'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const safeVariableName = fileName => {
  const indexOfDot = fileName.indexOf('.');

  if (indexOfDot === -1) {
    return fileName;
  } else {
    return fileName.slice(0, indexOfDot);
  }
};

const buildExportBlock = files => {
  let importBlock;

  importBlock = _lodash2.default.map(files, fileName => {
    return 'export ' + safeVariableName(fileName) + ' from \'./' + fileName + '\';';
  });

  importBlock = importBlock.join('\n');

  return importBlock;
};

exports.default = function (filePaths) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  let code;

  code = '';

  if (options.banner) {
    const banners = _lodash2.default.isArray(options.banner) ? options.banner : [options.banner];

    banners.forEach(banner => {
      code += banner + '\n';
    });

    code += '\n';
  }

  code += '// @create-index\n\n';

  if (filePaths.length) {
    const sortedFilePaths = filePaths.sort();

    code += buildExportBlock(sortedFilePaths) + '\n\n';
  }

  return code;
};
//# sourceMappingURL=createIndexCode.js.map