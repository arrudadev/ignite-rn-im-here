import { Text, View } from 'react-native'
import { styles } from './styles'

export function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>
      <Text style={styles.eventDate}>Quinta, 5 de Setembro de 2024.</Text>
    </View>
  )
}
