import '@testing-library/jest-dom/extend-expect'
import { getId } from '../util'


describe('getId',  () => {
    
    const mockUrl = 'https://film.url/films/123/'

    it('should return a string', () => {
        const id = getId(mockUrl)
        expect(id).toBe('123') 
    })
})