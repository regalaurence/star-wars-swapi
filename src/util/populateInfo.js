import axios from 'axios';

// populateInfo('characters', response.data.characters, this)

export const populateInfo = (key, arrayOfURLs, context) => {
        let promises = arrayOfURLs.map(url =>
            axios.get(url)
        )
        return Promise.all(promises)
            .then((response) => {
                const listOfItems = response.map(item => item.data)
                if (listOfItems.length > 0) {
                    context.setState({
                        [key]: {
                            status: {
                                error: false,
                                isNotEmpty: true,
                                loading: false 
                            },
                            items: listOfItems,
                        }
                    })
                }
            })
            .catch((error) => {
                context.setState({
                    [key]: {
                        ...context.state[key],
                        status: {
                            ...context.state[key].status,
                            error: true
                        }
                    }
                })
    })
}  
    
