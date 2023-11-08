import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from '../components/HomePage/HomePage'

test('loads and displays video', async () =>{
    render(<HomePage/>)
    await screen.findByRole('heading')
    expect(screen.getByRole('heading')).toHaveTextContent('Popular Movies')

})