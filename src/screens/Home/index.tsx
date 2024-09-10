import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { styles } from './styles'
import { Participant } from '@/components/Participant'
import { useState } from 'react'

export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')

  function handleAddParticipant() {
    if (!participantName) {
      Alert.alert('Aviso', 'Digite o nome do participante.')
      setParticipantName('')
      return
    }

    if (participants.includes(participantName)) {
      Alert.alert('Aviso', 'Já existe um participante na lista com esse nome.')
      setParticipantName('')
      return
    }

    setParticipants([...participants, participantName])
    setParticipantName('')
  }

  function handleRemoveParticipant(participant: string) {
    setParticipants(participants.filter((name) => name !== participant))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>
      <Text style={styles.eventDate}>Quinta, 5 de Setembro de 2024.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
          value={participantName}
          onChangeText={setParticipantName}
        />

        <TouchableOpacity
          testID="participant-add-button"
          style={styles.button}
          onPress={handleAddParticipant}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            name={item}
            onRemove={() => handleRemoveParticipant(item)}
          />
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
