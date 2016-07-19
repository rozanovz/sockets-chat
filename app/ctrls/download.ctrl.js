const fs = require('fs');
const url = require('url');
const path = require('path');
const mime = require('mime');

module.exports = (req, res) => {
  let file = `${__dirname}/tmp/${url.parse(req.url, true).query.name}`;
  res.setHeader('Content-disposition', `attachment; filename=${path.basename(file)}`);
  res.setHeader('Content-type', mime.lookup(file));
  fs.createReadStream(file).pipe(res);
};