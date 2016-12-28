import _ from 'lodash';

const safeVariableName = (fileName) => {
  const indexOfDot = fileName.indexOf('.');

  if (indexOfDot === -1) {
    return fileName;
  } else {
    return fileName.slice(0, indexOfDot);
  }
};

const buildExportBlock = (files) => {
  let importBlock;

  importBlock = _.map(files, (fileName) => {
    return 'export ' + safeVariableName(fileName) + ' from \'./' + fileName + '\';';
  });

  importBlock = '//es6-imports\n\n' + importBlock.join('\n');

  let es5Imports = _.map(files, (fileName) => {
    return 'exports[\'' + safeVariableName(fileName) + '\'] =  require(\'./' + fileName + '\');';
  });

  es5Imports = '//es5-imports\n\n' + es5Imports.join('\n');

  return importBlock + '\n\n' + es5Imports;
};

export default (filePaths, options = {}) => {
  let code;

  code = '';

  if (options.banner) {
    const banners = _.isArray(options.banner) ? options.banner : [options.banner];

    banners.forEach((banner) => {
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
