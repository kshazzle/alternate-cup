export const randomScenarios = [
  "What if India qualified for FIFA World Cup 2026?",
  "What if Messi chose Spain instead of Argentina?",
  "What if Neymar never got injured in 2014?",
  "What if Ronaldo won the 2022 World Cup?",
  "What if Brazil won every World Cup since 2002?",
  "What if Ghana reached the 2010 World Cup final?",
  "What if Maradona coached Argentina to glory in 2010?",
  "What if Japan won the 2022 World Cup on penalties?",
  "What if Haaland played for England in 2026?",
  "What if the USA won the 1994 World Cup at home?",
];

export function getRandomScenario() {
  return randomScenarios[Math.floor(Math.random() * randomScenarios.length)];
}
