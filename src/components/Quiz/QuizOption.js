import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import { Button, Typography } from "@mui/joy";
import React from "react";

export default function QuizOption({ item, answers, handleChooseAnswer }) {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    if (answers.length === 0) {
      setChecked(false);
    }
  }, [answers]);

  return (
    <>
      <Button
        color={checked ? "primary" : "text"}
        fullWidth
        onClick={() => {
          setChecked((prev) => !prev);
          handleChooseAnswer(item.charAt(0));
        }}
        size="lg"
        startDecorator={
          checked ? (
            <CheckBoxRoundedIcon />
          ) : (
            <CheckBoxOutlineBlankRoundedIcon />
          )
        }
        sx={{
          // alignItems: "flex-start",
          justifyContent: "flex-start",
          height: "100%",
        }}
        variant="plain"
      >
        <Typography color="inherit" textAlign={"start"}>
          {item}
        </Typography>
      </Button>
    </>
  );
}
