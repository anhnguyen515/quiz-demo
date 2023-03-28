import { Button, CircularProgress, Stack, Typography } from "@mui/joy";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MAX_NUM_QUESTIONS } from "../../utils/constants";
import HouseRoundedIcon from "@mui/icons-material/HouseRounded";

export default function ResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    if (!searchParams.get("score")) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <>
      <Stack alignItems={"center"} direction={"row"} gap={1} mb={3}>
        <Typography fontSize={"1.4rem"}>
          Chúc mừng bạn đã hoàn thành bài test với
        </Typography>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ position: "relative" }}
        >
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <Typography
              color={
                +searchParams.get("score") >= 15
                  ? "success"
                  : +searchParams.get("score") >= 5 &&
                    +searchParams.get("score") < 15
                  ? "primary"
                  : "danger"
              }
              fontSize={"1.4rem"}
              fontWeight={600}
            >
              {+searchParams.get("score")}
            </Typography>
          </Stack>
          <CircularProgress
            color={
              +searchParams.get("score") >= 15
                ? "success"
                : +searchParams.get("score") >= 5 &&
                  +searchParams.get("score") < 15
                ? "primary"
                : "danger"
            }
            determinate
            value={+searchParams.get("score") * (100 / MAX_NUM_QUESTIONS)}
            size={"lg"}
          />
        </Stack>
        <Typography fontSize={"1.4rem"}>
          câu đúng trên tổng {MAX_NUM_QUESTIONS} câu!
        </Typography>
      </Stack>
      <Button
        color="neutral"
        onClick={() => navigate("/", { replace: true })}
        startDecorator={<HouseRoundedIcon />}
        variant="soft"
      >
        Trang chủ
      </Button>
    </>
  );
}
