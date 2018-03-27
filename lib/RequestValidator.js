const logger = require('./logger.js');
const fileExtensions = {
  ".jpg": ".jpg",
  ".jpeg": ".jpeg",
  ".bmp": ".bmp",
  ".gif": ".gif",
  ".png": ".png",
  ".ico": ".ico",
  ".pdf": ".pdf",
  ".css": ".css",
  ".html": ".html",
  ".js": ".js",
  ".zip": ".zip",
  ".pdf": ".pdf",
  ".doc": ".doc",
  ".docx": ".docx",
  ".xls": ".xls",
  ".xlsx": ".xlsx",
  ".ppt": ".ppt",
  ".pptx": ".pptx",
};

class RequestValidator {
  // filter incoming request and eliminate ones that are not async
  // example: file request
  isValidRequest(req) {
    let validRequest = true;
    let url = req.url.toLowerCase();
    let method = req.method.toLowerCase();
    if (method === "get") {
      if (this.isFileRequest(url)) validRequest = false;
      if (this.isRootPage(url)) validRequest = false;
      if (!validRequest) {
        logger.log(
          `Node Reaction Agent - RequestValidator - request ignored - method: ${
            method
          } url: ${url}`
        );
      }
    }
    return validRequest;
  }

  isRootPage(url) {
    let rootPage = false;
    if (url === "/") {
      rootPage = true;
    }
    return rootPage;
  }

  isFileRequest(url) {
    let fileRequest = false;
    let fileExt = url.substr(url.lastIndexOf("."));
    if (fileExt === -1) return fileRequest;
    if (fileExtensions[fileExt] !== undefined) fileRequest = true;
    return fileRequest;
  }
}
// create a singleton
const requestValidator = new RequestValidator();

module.exports = requestValidator;
