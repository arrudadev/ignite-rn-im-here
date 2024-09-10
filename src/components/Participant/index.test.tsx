import { fireEvent, render, screen } from '@testing-library/react-native'
import { Participant } from './index'

describe('Participant component', () => {
  it('should render the name of the participant', () => {
    render(<Participant name="John Doe" onRemove={() => {}} />)

    expect(screen.getByText('John Doe')).toBeDefined()
  })

  it('should render a button to remove the participant', () => {
    render(<Participant name="John Doe" onRemove={() => {}} />)

    expect(screen.getByTestId('participant-remove-button')).toBeDefined()
    expect(screen.getByText('-')).toBeDefined()
  })

  it('should call the onRemove function when the button is pressed', () => {
    const onRemove = jest.fn()
    render(<Participant name="John Doe" onRemove={onRemove} />)

    fireEvent.press(screen.getByTestId('participant-remove-button'))

    expect(onRemove).toHaveBeenCalled()
  })
})
