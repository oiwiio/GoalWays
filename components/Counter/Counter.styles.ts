import { StyleSheet ,Dimensions} from 'react-native';


const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 10,
    backgroundColor: '#0a0a2a', // galaxy-bg
    borderRadius: 30,
    overflow: 'hidden',
    position: 'relative',
  },
  
  starsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  
  star: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    zIndex: 1,
  },
  
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00f3ff',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 243, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  
  emoji: {
    fontSize: 28,
    marginLeft: 10,
  },
  
  planet: {
    width: width < 768 ? 200 : 250,
    height: width < 768 ? 200 : 250,
    borderRadius: width < 768 ? 100 : 125,
    backgroundColor: '#2a2352',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 20,
    zIndex: 1,
    borderWidth: 2,
    borderColor: 'rgba(0, 243, 255, 0.3)',
  },
  
  planetRing: {
    position: 'absolute',
    width: width < 768 ? 280 : 350,
    height: 15,
    backgroundColor: 'rgba(0, 243, 255, 0.4)',
    borderRadius: 7.5,
    zIndex: -1,
  },
  
  crater1: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: '#1a173a',
    borderRadius: 20,
    top: 50,
    left: 60,
  },
  
  crater2: {
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: '#1a173a',
    borderRadius: 15,
    bottom: 40,
    right: 50,
  },
  
  crater3: {
    position: 'absolute',
    width: 25,
    height: 25,
    backgroundColor: '#1a173a',
    borderRadius: 12.5,
    top: 70,
    right: 40,
  },
  
  counterText: {
    fontSize: width < 768 ? 56 : 72,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  
  buttonsContainer: {
    flexDirection: width < 768 ? 'column' : 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    zIndex: 1,
  },
  
  button: {
    flex: width < 768 ? 0 : 1,
    marginHorizontal: 5,
    marginBottom: width < 768 ? 10 : 0,
    borderRadius: 50,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  
  buttonInner: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonDecrement: {
    backgroundColor: '#ff0080', // Розовый
  },
  
  buttonReset: {
    backgroundColor: '#00ffaa', // Зеленый
  },
  
  buttonIncrement: {
    backgroundColor: '#9d00ff', // Фиолетовый
  },
  
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  
  messageContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 243, 255, 0.3)',
    alignItems: 'center',
    zIndex: 1,
  },
  
  messageText: {
    fontSize: 14,
    color: '#00f3ff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 243, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
});