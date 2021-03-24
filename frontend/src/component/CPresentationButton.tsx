import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

interface CPresentationButtonProps {
  section: string;
  item: [string, { hasCode: boolean; title: string }];
}

const useStyle = makeStyles({
  button: {
    margin: "8px",
  },
});

function CPresentationButton(props: CPresentationButtonProps): JSX.Element {
  const history = useHistory();
  const theme = useStyle();

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const section = props.section;
    const presentation = props.item[0];

    history.push(`/playground/${section}/${presentation}`);
  };

  return (
    <Button
      onClick={handleButtonClick}
      color="secondary"
      variant="outlined"
      className={theme.button}
    >
      {props.item[1].title}
    </Button>
  );
}

export default CPresentationButton;
