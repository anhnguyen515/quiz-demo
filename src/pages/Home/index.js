import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Button, Stack, Typography } from "@mui/joy";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <Stack
        alignItems={"flex-end"}
        direction={"row"}
        flexWrap={"wrap"}
        gap={2}
        justifyContent={"space-between"}
        sx={{ width: "100%" }}
      >
        <Stack
          // alignItems={"flex-end"}
          justifyContent={"center"}
        >
          <Typography variant="h1" fontSize={"3rem"}>
            Quiz Demo
          </Typography>
          <Typography>
            20 câu hỏi ngẫu nhiên sẽ được chọn từ ngân hàng câu hỏi.
          </Typography>
          <Typography>Mỗi câu hỏi có thể có nhiều đáp án.</Typography>
          <Typography>Không giới hạn thời gian làm bài.</Typography>
          <Typography>
            Bạn sẽ nhận được đáp án của câu hỏi trước sau khi chuyển sang câu
            tiếp theo.
          </Typography>
        </Stack>
        <Button
          component={Link}
          to={"quiz"}
          size="lg"
          startDecorator={<PlayArrowRoundedIcon />}
          variant="soft"
        >
          Bắt đầu làm bài
        </Button>
      </Stack>
    </>
  );
}

export default App;
