const positiveScenarios = [
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

const negativeScenarios = [
  "What if Brazil was knocked out in the group stage of every World Cup after 2002?",
  "What if Messi retired at 27 with no major trophies?",
  "What if France collapsed in the 2018 final and lost to Croatia?",
  "What if England bottled the 1990 semi-final and never came close again?",
  "What if the 2014 World Cup final ended in a corruption scandal?",
  "What if Argentina's golden generation of Messi, Aguero and Di Maria all flopped together in 2010?",
  "What if Germany was relegated from top-tier football after a decade of decline post-2014?",
  "What if the 2022 World Cup ended with no clear winner due to a catastrophic pitch invasion in the final?",
  "What if Spain's tiki-taka era ended in humiliation at the 2010 group stage?",
  "What if Ronaldo's Portugal became the biggest underachievers in World Cup history?",
];

// Surface a mix of positive and dark scenarios so users see both are valid.
export const randomScenarios = [...positiveScenarios, ...negativeScenarios].sort(
  () => Math.random() - 0.5,
);

export function getRandomScenario() {
  return randomScenarios[Math.floor(Math.random() * randomScenarios.length)];
}
