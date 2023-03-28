import {
  Button,
  Divider,
  Grid,
  LinearProgress,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import React from "react";
import { useNavigate } from "react-router-dom";
import QuizAnswerModal from "../../components/Quiz/QuizAnswerModal";
import QuizOption from "../../components/Quiz/QuizOption";
import questions from "../../mock_data.json";
import { getRandomQuestions } from "../../utils/utils";

const shuffledQuestions = getRandomQuestions(questions);

export default function QuizPage() {
  const navigate = useNavigate();
  const [quizNumber, setQuizNumber] = React.useState(1);
  const [answers, setAnswers] = React.useState([]);
  const [score, setScore] = React.useState(0);

  function handleChooseAnswer(value) {
    if (answers.includes(value)) {
      setAnswers((prev) => prev.filter((item) => item !== value));
    } else {
      setAnswers((prev) => [...prev, value]);
    }
  }

  function handleNextQuestion() {
    if (quizNumber === shuffledQuestions.length) {
      navigate(
        {
          pathname: "/result",
          search: `score=${score}`,
        },
        { replace: true }
      );
    } else {
      setAnswers([]);
      setQuizNumber((prev) => prev + 1);
    }
  }

  function handleIncrementScore() {
    setScore((prev) => prev + 1);
  }

  return (
    <Sheet variant="outlined" sx={{ borderRadius: "md" }}>
      <Stack sx={{ position: "fixed", top: 0, left: 0, right: 0 }}>
        <LinearProgress
          determinate
          thickness={6}
          value={quizNumber * (100 / shuffledQuestions.length)}
        />
        <Typography variant="caption" ml={1}>
          {quizNumber} / {shuffledQuestions.length}
        </Typography>
      </Stack>
      <Stack sx={{ p: 4 }}>
        <Typography
          variant="h1"
          fontSize={"1.3rem"}
          fontWeight={"bold"}
          gutterBottom
        >
          Câu {quizNumber}. {shuffledQuestions[quizNumber - 1].question}
        </Typography>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          {shuffledQuestions[quizNumber - 1].options.map((item, index) => (
            <Grid key={index} item xs={12} sm={6}>
              <QuizOption
                item={item}
                answers={answers}
                handleChooseAnswer={handleChooseAnswer}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Divider />
      <Stack
        alignItems={"center"}
        direction={"row"}
        gap={1}
        sx={{ p: 4, py: 2 }}
      >
        <Typography mr={"auto"}>
          Số câu đúng: {score} / {shuffledQuestions.length}
        </Typography>
        {answers.length > 0 && (
          <Button
            color="danger"
            onClick={() => setAnswers([])}
            variant="outlined"
          >
            Bỏ chọn tất cả
          </Button>
        )}
        <QuizAnswerModal
          questions={shuffledQuestions}
          question={shuffledQuestions[quizNumber - 1]}
          answers={answers}
          quizNumber={quizNumber}
          handleNextQuestion={handleNextQuestion}
          handleIncrementScore={handleIncrementScore}
        />
      </Stack>
    </Sheet>
  );
}
