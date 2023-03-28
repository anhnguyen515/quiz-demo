import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { Box, Divider, Stack } from "@mui/joy";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import { equalArrays } from "../../utils/utils";

export default function QuizAnswerModal({
  answers,
  questions,
  question,
  quizNumber,
  handleNextQuestion,
  handleIncrementScore,
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Button
        color="success"
        disabled={answers.length === 0}
        startDecorator={<CheckRoundedIcon />}
        onClick={() => {
          setOpen(true);
          if (equalArrays(answers, question.answer)) {
            handleIncrementScore();
          }
        }}
        variant="outlined"
      >
        Xác nhận
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        // onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          sx={{
            maxWidth: 700,
            borderRadius: "md",
            p: 4,
            boxShadow: "lg",
          }}
        >
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            startDecorator={
              equalArrays(answers, question.answer) ? (
                <CheckRoundedIcon className="text-green-500" fontSize="large" />
              ) : (
                <CloseRoundedIcon className="text-red-500" fontSize="large" />
              )
            }
            gutterBottom
          >
            {equalArrays(answers, question.answer)
              ? "Chính xác!"
              : "Chưa chính xác..."}
          </Typography>
          <Box mt={3}>
            <Typography fontSize={"1.15rem"}>
              Câu {quizNumber}. {question.question}
            </Typography>
            <Stack
              alignItems={"center"}
              direction={"row"}
              justifyContent={"space-between"}
              divider={<Divider orientation="vertical" sx={{ mx: 2 }} />}
              gap={1}
              my={2}
            >
              <Stack sx={{ flex: 1 }}>
                <Typography fontWeight={600} gutterBottom textAlign={"center"}>
                  Đáp án của bạn
                </Typography>
                <Stack>
                  {question.options.map((item, index) => (
                    <Typography
                      color={
                        answers.includes(item.charAt(0)) ? "primary" : "neutral"
                      }
                      fontWeight={answers.includes(item.charAt(0)) ? 600 : 400}
                      key={index}
                    >
                      {item}
                    </Typography>
                  ))}
                </Stack>
              </Stack>

              <Stack sx={{ flex: 1 }}>
                <Typography fontWeight={600} gutterBottom textAlign={"center"}>
                  Đáp án đúng
                </Typography>
                <Stack>
                  {question.options.map((item, index) => (
                    <Typography
                      color={
                        question.answer.includes(item.charAt(0))
                          ? "success"
                          : "neutral"
                      }
                      fontWeight={
                        question.answer.includes(item.charAt(0)) ? 600 : 400
                      }
                      key={index}
                    >
                      {item}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Box>
          <Stack mt={3}>
            <Button
              color={quizNumber === questions.length ? "success" : "neutral"}
              endDecorator={
                quizNumber === questions.length ? (
                  <CheckRoundedIcon />
                ) : (
                  <NavigateNextRoundedIcon />
                )
              }
              onClick={() => {
                handleNextQuestion();
                setOpen(false);
              }}
            >
              {quizNumber === questions.length
                ? "Hoàn thành bài làm"
                : "Câu tiếp theo"}
            </Button>
          </Stack>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
