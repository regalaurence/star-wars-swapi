import axios from 'axios'


export const populateWithURLS = (arrayOfURLs, state) => {
    let objPromises = arrayOfURLs.map(URL =>
        axios.get(URL)
    )

    return Promise.all(objPromises, "stateName")
        .then((response) => {
            console.log('res', response)
            const objects = response.map(o => o.data)
            this.setState({
                "stateName": objects,
                status: 'final'
            })
        }).catch((error) => {
            this.setState({ status: 'error' })
        })
}