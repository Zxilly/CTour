import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import {makeStyles} from "@material-ui/styles";

interface COnePresentationProps {
  section: string;
  item: [string, string];
}

const useStyle = makeStyles({
  button:{
    margin: "8px"
  }
})

function COnePresentation(props: COnePresentationProps): JSX.Element {
  const history = useHistory();
  const theme = useStyle();

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const section = props.section;
    const presentation = props.item[0];
    history.push(`/${section}/${presentation}`);
  };

  return (
    <Button onClick={handleButtonClick} color="secondary" variant="outlined" className={theme.button}>
      {props.item[1]}
    </Button>
  );
}

export default COnePresentation;
