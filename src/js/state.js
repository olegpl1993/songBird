const state = { //параметры текущей игры
  level: 0,  //уровень игры
  numQuest: Math.floor(Math.random() * 6), //номер вопроса (правильного ответа) случайное значение 0 - 5
  score: 0, //общее количество очков
  questScore: 5, // количество очков за текущий вопрос (уменьшается при неправильном ответе)
}

export default state