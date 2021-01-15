export const render = (isLoading, isError, component) => {
    if (isLoading) {
        return (
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        )
    }
    if (isError) {
        return 'Encountered an error, please try again'
    }
    return (
        component
    )
}
