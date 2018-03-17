class RequestValidator {
    // filter incoming request and eliminate ones that are not async
    // example: file request
    isValidRequest(req) {
      let validRequest = true;
      if (req.method.toLowerCase() === "get") {
        if (this.isFileRequest(req.url)) validRequest = false;
        if (this.isRootPage(req.url)) validRequest = false;
        if (!validRequest) {
          console.log(
            `Node Reaction Agent - RequestValidator - request ignored - req.method: ${req.method} req.url: ${req.url}`
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
      let fileRequest = true;
      const fileExtensions = [
        ".jpg",
        ".jpeg",
        ".bmp",
        ".gif",
        ".png",
        ".ico",
        ".pdf",
        ".css",
        ".html",
        ".js"
      ];
      fileExtensions.forEach(fileExtension => {
        if (url.indexOf(fileExtension) >= 0) return true;
      });
    }
  }
  const requestValidator = new RequestValidator();
  
  module.exports = requestValidator;
  