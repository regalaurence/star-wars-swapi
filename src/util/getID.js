export const getId = (url) => {
    const splittedURL = url.split('/');
    splittedURL.pop()
    const id = splittedURL.splice(-1).pop()
    return id
}