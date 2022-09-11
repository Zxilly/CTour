import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface CPresentationButtonProps {
  section: string;
  item: [string, { hasCode: boolean; title: string }];
}

function CPresentationButton(props: CPresentationButtonProps): JSX.Element {
  const navigate = useNavigate();

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const section = props.section;
    const presentation = props.item[0];

    navigate(`/playground/${section}/${presentation}`);
  };

  return (
    <Button
      onClick={handleButtonClick}
      color="secondary"
      variant="outlined"
      style={{ margin: "8px" }}
    >
      {props.item[1].title}
    </Button>
  );
}

export default CPresentationButton;
