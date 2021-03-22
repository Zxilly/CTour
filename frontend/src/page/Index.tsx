import {Button, Container, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    indexTitle: {
        marginTop: "200px",
        textAlign: "center",
        fontWeight: "bold",
        backgroundImage: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%, #FF0053 50%)",
        color: "transparent",
        WebkitBackgroundClip: "text"
    },
    content: {
        textAlign: "center",
        marginRight: "auto",
        marginLeft: "auto",
        display: "block"
    }
})

function Index(): JSX.Element {
    const classes = useStyles();



    return (
        <Container>
            <Typography variant="h1" className={classes.indexTitle}>
                C TOUR
            </Typography>
            <Typography variant="h5" className={classes.content} style={{marginTop: "40px"}}>
                学习 C 语言的第一步
            </Typography>
            <p style={{width: "100%"}}>
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    style={{marginTop: "40px"}}
                    className={classes.content}
                    onClick={}
                >
                        访问目录
                </Button>
            </p>


        </Container>
    )
}

export default Index
