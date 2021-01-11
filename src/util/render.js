export const render = (status, component) => {
    if (status === 'fetching' || status === 'initial') {
        return 'Loading...'
    }
    if (status === 'error') {
        return 'Encountered an error, please try again'
    }
    return (
        component
    )
}