import React from 'react' 
import Container from 'react-bootstrap/Container'

export const render = (isLoading, isError, component) => {
    if (isLoading) {
        return (
            <Container className="text-center">
            <div className="spinner-border mx-auto" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            </Container>
        )
    }
    if (isError) {
        return 'Encountered an error, please try again'
    }
    return (
        component
    )
}
