import axios from 'axios'
import { render, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MovieList } from '../components/movies'
import { movies } from './mocks/movies'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'


describe('MovieList',  () => {
    afterEach(cleanup);
    it('should have a title', () => {
        const history = createMemoryHistory()
        jest.spyOn(axios, 'get').mockResolvedValue({ data: { results: movies }})

        const { getByText } = render(<Router history={history}><MovieList /></Router>)
        const titleNode = getByText('Pick a Star Wars Movie')
        expect(titleNode).not.toBeUndefined()
    })

    it('get all the movies, and have equal amount of cards', async () => {
        const history = createMemoryHistory()
        jest.spyOn(axios, 'get').mockResolvedValue({ data: { results: movies }})
        const { getAllByText } =  render(<Router history={history}><MovieList /></Router>)
        await waitFor(() => {
            const cards = getAllByText('Details')
            expect(cards.length).toEqual(movies.length)
        })
    })
})