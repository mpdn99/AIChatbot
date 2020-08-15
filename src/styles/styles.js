/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
    justifyContent: 'center',
  },
  circle: {
    borderRadius: 500 / 2,
    backgroundColor: '#FFF',
    position: 'absolute',
    left: -120,
    top: -20,
  },
  input: {
    marginTop: 16,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#BAB7C3',
    borderRadius: 30,
    paddingHorizontal: 16,
    color: '#514E5A',
    fontWeight: '600',
  },
  button: {
    width: 160,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#68c2e8',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default styles;
