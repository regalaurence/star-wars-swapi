export const getId = (url) => {
    const splittedURL = url.split('/');
    const idIndex = splittedURL.length - 2
    const id = splittedURL[idIndex]
    return id
}