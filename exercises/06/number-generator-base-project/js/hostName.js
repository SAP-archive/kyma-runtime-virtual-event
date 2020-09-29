/**
 * get the hostname using simple rest call
 */
const getHostName = () => {
    restUtils.get('/rest/info')
        .then((info) => {
            console.log('info', info);
            let infoJson = JSON.parse(info);
            document.getElementById('hostname').innerText = "Hostname: " + infoJson.hostname + ", request count: " + infoJson.numRequests;
            addOrUpdateHistogramById(infoJson.hostname, infoJson.values, infoJson.numRequests); // TODO add values
            return infoJson.hostname;
        })
        .catch((error) => {
            return "could not retrieve host name. Status: " + error.status + ", Reason:" + error.statusText;
        })
}
