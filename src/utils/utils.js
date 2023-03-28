import { MAX_NUM_QUESTIONS } from "./constants";

export function equalArrays(a, b) {
  return a.sort().join().toUpperCase() === b.sort().join().toUpperCase();
}

export function getRandomQuestions(questions) {
  const shuffledQuestions = [...questions].sort(() => 0.5 - Math.random());

  return shuffledQuestions.slice(0, MAX_NUM_QUESTIONS);
}
