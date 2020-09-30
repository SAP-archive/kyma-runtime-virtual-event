/**
 * Utils to debug host name
 */
const get = (url) => {
    var request = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
        request.onreadystatechange = () => {
            // Only run if the request is complete
            if (request.readyState !== 4) return;

            // Process the response
            if (request.status >= 200 && request.status < 300) {
                // If successful
                resolve(request.response);
            } else {
                // If failed
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
        };

        request.open ('GET', url, true);
        request.send();
    })
}

var restUtils = {
    get: get
};