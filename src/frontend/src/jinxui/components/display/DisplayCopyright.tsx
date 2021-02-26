import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";


function CopyrightText({ text }: { text: string }) {
  return (
    <Typography variant="h6" align="center">
      {"Copyright © "}
      {text} {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function DisplayCopyright({ text }: { text: string }) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      container: {
        paddingTop: "2em",
        paddingBottom: "1em",
      },
    })
  );

  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.container}>
      <CopyrightText text={text} />
    </Container>
  );
}

export default DisplayCopyright