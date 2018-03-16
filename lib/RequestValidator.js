class RequestValidator {

    // filter incoming request and eliminate ones that are not async
    // example: file request  
    isValidRequest (req) {
        const fileExtensions = ['.jpg', '.jpeg', '.bmp', '.gif', '.png', '.ico', '.pdf', '.css', '.html', '.js']
        let validRequest = true;
        if (req.method.toLowerCase() === 'get'){
            
            if(req.url === '/' || req.url === '/script.js'){
                console.log(`Node Reaction Agent - RequestValidator - request ignored - req.method: ${req.method} req.url: ${req.url}`)
                validRequest = false;
            } 
        }
        return validRequest;
    }
}
 const requestValidator = new RequestValidator();

module.exports = requestValidator;