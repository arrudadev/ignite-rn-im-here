import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { Participant } from '@/components/Participant'

export function Home() {
  const participants = [
    'Alexandre',
    'Rodrigo',
    'Vini',
    'Diego',
    'Biro',
    'Ana',
    'Isa',
    'Jack',
    'Mayk',
    'João',
    'Maria',
    'Vitória',
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>
      <Text style={styles.eventDate}>Quinta, 5 de Setembro de 2024.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant name={item} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista
            de presença.
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
