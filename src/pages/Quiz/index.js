import { Button, Grid, LinearProgress, Stack, Typography } from "@mui/joy";
import React from "react";
import { useNavigate } from "react-router-dom";
import QuizAnswerModal from "../../components/Quiz/QuizAnswerModal";
import QuizOption from "../../components/Quiz/QuizOption";
import questions from "../../mock_data.json";

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
    if (quizNumber === questions.length) {
      navigate("/result", { replace: true });
    } else {
      setAnswers([]);
      setQuizNumber((prev) => prev + 1);
    }
  }

  function handleIncrementScore() {
    setScore((prev) => prev + 1);
  }

  return (
    <div>
      <Stack sx={{ position: "fixed", top: 0, left: 0, right: 0 }}>
        <LinearProgress
          determinate
          thickness={6}
          value={quizNumber * (100 / questions.length)}
        />
        <Typography variant="caption" ml={1}>
          {quizNumber} / {questions.length}
        </Typography>
      </Stack>
      <Typography
        variant="h1"
        fontSize={"1.3rem"}
        fontWeight={"bold"}
        gutterBottom
      >
        Câu {quizNumber}. {questions[quizNumber - 1].question}
      </Typography>
      <Grid container spacing={1} sx={{ mt: 1, mb: 2 }}>
        {questions[quizNumber - 1].options.map((item, index) => (
          <Grid key={index} item xs={12} sm={6}>
            <QuizOption
              item={item}
              answers={answers}
              handleChooseAnswer={handleChooseAnswer}
            />
          </Grid>
        ))}
      </Grid>
      <Stack alignItems={"center"} direction={"row"} gap={1}>
        <Typography mr={"auto"}>
          Số câu đúng: {score} / {questions.length}
        </Typography>
        {answers.length > 0 && (
          <Button color="danger" onClick={() => setAnswers([])}>
            Bỏ chọn tất cả
          </Button>
        )}
        <QuizAnswerModal
          answers={answers}
          question={questions[quizNumber - 1]}
          quizNumber={quizNumber}
          handleNextQuestion={handleNextQuestion}
          handleIncrementScore={handleIncrementScore}
        />
      </Stack>
    </div>
  );
}
