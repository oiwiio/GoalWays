import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { styles } from './Counter.styles';

export default function CosmicCounter() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const scaleAnim = new Animated.Value(1);
  const rotateAnim = new Animated.Value(0);

  // Простая анимация без reanimated
  const animateCounter = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.elastic(1),
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Анимация вращения эмодзи
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const increment = () => {
    setCount(prev => prev + 1);
    animateCounter();
    
    setTimeout(() => setMessage(''), 2000);
  };

  const decrement = () => {
    setCount(prev => prev - 1);
    animateCounter();
   
    setTimeout(() => setMessage(''), 2000);
  };

  const reset = () => {
    setCount(0);
    animateCounter();
    
    setTimeout(() => setMessage(''), 2000);
  };

  // Цвет числа в зависимости от значения
  const getNumberColor = () => {
    if (count > 0) return '#00f3ff'; // неоновый синий
    if (count < 0) return '#ff0080'; // неоновый розовый
    return '#00ffaa'; // неоновый зеленый
  };

  // Звезды в виде простых View
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 30; i++) {
      stars.push(
        <View
          key={i}
          style={[
            styles.star,
            {
              top: Math.random() * Dimensions.get('window').height,
              left: Math.random() * Dimensions.get('window').width,
              opacity: 0.3 + Math.random() * 0.7,
            }
          ]}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      {/* Звездный фон */}
      <View style={styles.starsContainer}>
        {renderStars()}
      </View>

      {/* Заголовок с вращающейся ракетой */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Космотрип</Text>
        <Animated.Text 
          style={[
            styles.emoji, 
            { transform: [{ rotate: rotateInterpolate }] }
          ]}
        >
          🚀
        </Animated.Text>
      </View>

      {/* Планета-дисплей */}
      <Animated.View 
        style={[
          styles.planet,
          { 
            transform: [{ scale: scaleAnim }],
            shadowColor: getNumberColor(),
          }
        ]}
      >
        {/* Кольца планеты */}
        <View style={styles.planetRing} />
        
        {/* Кратеры */}
        <View style={styles.crater1} />
        <View style={styles.crater2} />
        <View style={styles.crater3} />
        
        <Text style={[styles.counterText, { color: getNumberColor() }]}>
          {count}
        </Text>
      </Animated.View>

      {/* Кнопки с градиентным эффектом через View */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.buttonDecrement]} 
          onPress={decrement}
          activeOpacity={0.7}
        >
          <View style={styles.buttonInner}>
            <Text style={styles.buttonText}>-1</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.buttonReset]} 
          onPress={reset}
          activeOpacity={0.7}
        >
          <View style={styles.buttonInner}>
            <Text style={styles.buttonText}>СБРОС</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.buttonIncrement]} 
          onPress={increment}
          activeOpacity={0.7}
        >
          <View style={styles.buttonInner}>
            <Text style={styles.buttonText}>+1</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Сообщение */}
      {message ? (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      ) : null}
    </View>
  );
}