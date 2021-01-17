import { render, fireEvent, waitFor, screen, getByTestId } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MovieDetails } from '../components/movies'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { movies, characters } from './mocks'
import axios from 'axios'


describe('MovieDetails', () => {
    it('should render title correctly', async () => {
        const mockUrl = 'https://film.url/films/123/'
        const mockMovieTitle = 'A New Hope'
        const history = createMemoryHistory();
        jest.spyOn(axios, 'get')
            .mockResolvedValueOnce({ data: movies[0] })
            .mockResolvedValueOnce({ data: characters[0] })
        const { getByText } = render(<Router history={history}>
            <MovieDetails
                match={{ params: { filmID: 1 } }}
                filmURL={mockUrl}
                currentFavoriteMoviesTitles={[mockMovieTitle]}
                currentFavoriteMovies={movies}
            />
        </Router>)
        await waitFor(() => {
            const titleNode = getByText(mockMovieTitle)
            expect(titleNode).toBeInTheDocument()
        }
        )
    });

    it('should render each info-line properly', async () => {
        const mockUrl = 'https://film.url/films/123/'
        const mockMovieDirector = movies[0].director
        const mockMovieTitle = movies[0].title
        const history = createMemoryHistory()

        jest.spyOn(axios, 'get')
            .mockResolvedValueOnce({ data: movies[0] })
            .mockResolvedValueOnce({ data: characters[0] })
        const { getByText } = render(<Router history={history}>
            <MovieDetails
                match={{ params: { filmID: 1 } }}
                filmURL={mockUrl}
                currentFavoriteMoviesTitles={[mockMovieTitle]}
                currentFavoriteMovies={movies}
            />
        </Router>)
        await waitFor(() => {
            const directorNode = getByText(mockMovieDirector)
            expect(directorNode).toBeInTheDocument()
        }
        )
    }
    )
});

