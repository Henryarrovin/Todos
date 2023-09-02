import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import AppBar from './components/AppBar';

export default function App() {
  const [todos, setTodos] = useState([
    {text: 'Learn flutter', key: '1'},
    {text: 'Learn react-native', key: '2'},
    {text: 'Learn react', key: '3'}
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key)
    })
  }

  const submitHandler = (text) => {
    if (text.length != 0){
      setTodos((prevTodos) => {
        return [
          { text: text, key: Math.random().toString()},
          ...prevTodos
        ]
      });
    } else {
      Alert.alert('OOPS!', 'Todos must be over 3 chars long', [
        {text: 'Understood', onPress: () => console.log('alert closed')}
      ])
    }
    
  }

  return (
      <View style={styles.container}>
        <AppBar/>
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler}/>
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => 
                <TodoItem item={item} pressHandler={pressHandler}/>
              }
            />
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  }
});
