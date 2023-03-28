import { Container, Stack } from "@mui/joy";
import React from "react";

export default function MainLayout({ children }) {
  return (
    <Container>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ height: "100vh", width: "100%" }}
      >
        {children}
      </Stack>
    </Container>
  );
}
