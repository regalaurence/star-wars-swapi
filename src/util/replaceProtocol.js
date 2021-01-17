export const replaceProtocol = (arrayOfURLs) => {

    let updatedURLs = []
    for (let i = 0; i < arrayOfURLs.length; i++) {
       let replacedURL = arrayOfURLs[i].replace("http://", "https://");
        updatedURLs.push(replacedURL)
    }
    return updatedURLs
}