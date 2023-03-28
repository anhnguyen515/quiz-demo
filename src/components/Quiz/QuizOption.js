import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import { Button } from "@mui/joy";
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
        sx={{ justifyContent: "flex-start" }}
        variant={checked ? "soft" : "plain"}
      >
        {item}
      </Button>
    </>
  );
}
