import { Alert } from 'react-native'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { Home } from './index'

jest.mock('react-native/Libraries/Alert/Alert', () => {
  return {
    alert: jest.fn(),
  }
})

describe('Home screen', () => {
  it('should render the event name', () => {
    render(<Home />)

    expect(screen.getByText('Nome do Evento')).toBeDefined()
  })

  it('should render the event date', () => {
    render(<Home />)

    expect(screen.getByText('Quinta, 5 de Setembro de 2024.')).toBeDefined()
  })

  it('should render a form to add participants', () => {
    render(<Home />)

    expect(screen.getByPlaceholderText('Nome do participante')).toBeDefined()
    expect(screen.getByTestId('participant-add-button')).toBeDefined()
    expect(screen.getByText('+')).toBeDefined()
  })

  it('should be able to add a participant to the list', () => {
    render(<Home />)

    const input = screen.getByPlaceholderText('Nome do participante')
    const addButton = screen.getByTestId('participant-add-button')

    fireEvent.changeText(input, 'John Doe')
    fireEvent.press(addButton)

    expect(screen.getByText('John Doe')).toBeDefined()
  })

  it('should show an alert if the participant name is empty', () => {
    render(<Home />)

    const addButton = screen.getByTestId('participant-add-button')

    fireEvent.press(addButton)

    expect(Alert.alert).toHaveBeenCalledWith(
      'Aviso',
      'Digite o nome do participante.',
    )
  })

  it('should show an alert if the participant already exists', () => {
    render(<Home />)

    const input = screen.getByPlaceholderText('Nome do participante')
    const addButton = screen.getByTestId('participant-add-button')

    fireEvent.changeText(input, 'John Doe')
    fireEvent.press(addButton)
    fireEvent.changeText(input, 'John Doe')
    fireEvent.press(addButton)

    expect(Alert.alert).toHaveBeenCalledWith(
      'Aviso',
      'Já existe um participante na lista com esse nome.',
    )
  })

  it('should be able to remove a participant from the list', () => {
    render(<Home />)

    const input = screen.getByPlaceholderText('Nome do participante')
    const addButton = screen.getByTestId('participant-add-button')

    fireEvent.changeText(input, 'John Doe')
    fireEvent.press(addButton)

    const removeButton = screen.getByTestId('participant-remove-button')
    fireEvent.press(removeButton)

    expect(screen.queryByText('John Doe')).toBeNull()
  })

  it('should render the empty state message if there are no participants', () => {
    render(<Home />)

    expect(
      screen.getByText(
        `Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.`,
      ),
    ).toBeDefined()
  })
})
