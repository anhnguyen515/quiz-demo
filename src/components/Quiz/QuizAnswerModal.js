import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { Box, Grid, Stack } from "@mui/joy";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import { equalArrays } from "../../utils/utils";

export default function QuizAnswerModal({
  answers,
  question,
  quizNumber,
  handleNextQuestion,
  handleIncrementScore,
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Button
        color="neutral"
        disabled={answers.length === 0}
        endDecorator={<NavigateNextRoundedIcon />}
        onClick={() => {
          setOpen(true);
          if (equalArrays(answers, question.answer)) {
            handleIncrementScore();
          }
        }}
      >
        Câu tiếp theo
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
            maxWidth: 600,
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
            <Typography>
              Câu {quizNumber}. {question.question}
            </Typography>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12} sm={6}>
                <Typography fontWeight={600} gutterBottom>
                  Bạn chọn
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography fontWeight={600} gutterBottom>
                  Đáp án
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
              </Grid>
            </Grid>
          </Box>
          <Stack mt={3}>
            <Button
              endDecorator={<NavigateNextRoundedIcon />}
              onClick={() => {
                handleNextQuestion();
                setOpen(false);
              }}
            >
              Câu tiếp theo
            </Button>
          </Stack>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
