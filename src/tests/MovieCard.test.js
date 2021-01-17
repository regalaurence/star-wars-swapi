import { render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MovieCard } from '../components/movies'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'





describe('MovieCard', () => {
  it('should render correctly', async () => {
    const mockUrl = 'https://film.url/films/123/'
    const mockMovieTitle = 'Mock Movie Title'
    const history = createMemoryHistory()
    const { getByText } = render(<Router history={history}><MovieCard title={mockMovieTitle} filmURL= {mockUrl} /></Router>)
    const titleNode = getByText(mockMovieTitle)
    expect(titleNode).toBeInTheDocument()
    expect(getByText('Details').closest('a')).toHaveAttribute('href', '/films/123')

  });
});

