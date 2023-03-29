import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { Box, Divider, Stack } from "@mui/joy";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { useMediaQuery, useTheme } from "@mui/material";
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
        variant="soft"
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
            m: 2,
            boxShadow: "lg",
            overflow: "auto",
            maxHeight: "100vh",
            "::-webkit-scrollbar": {
              width: "0.35rem",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.primary.light,
              borderRadius: "sm",
            },
          }}
        >
          <Typography
            component="h2"
            id="modal-title"
            textColor="inherit"
            fontSize={"1.5rem"}
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
              direction={isSmallScreen ? "column" : "row"}
              justifyContent={"space-between"}
              gap={3}
              my={2}
            >
              <Stack sx={{ flex: 1 }}>
                <Typography fontWeight={600} gutterBottom textAlign={"center"}>
                  Đáp án của bạn
                </Typography>
                <Stack gap={1}>
                  {question.options.map((item, index) => (
                    <Typography
                      key={index}
                      color={
                        answers.includes(item.charAt(0)) ? "primary" : "neutral"
                      }
                      fontSize={"0.9rem"}
                      fontWeight={answers.includes(item.charAt(0)) ? 600 : 400}
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
                <Stack gap={1}>
                  {question.options.map((item, index) => (
                    <Typography
                      key={index}
                      color={
                        question.answer.includes(item.charAt(0))
                          ? "success"
                          : "neutral"
                      }
                      fontSize={"0.9rem"}
                      fontWeight={
                        question.answer.includes(item.charAt(0)) ? 600 : 400
                      }
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
