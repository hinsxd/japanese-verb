import { NextPage } from 'next';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { actions as gameActions, Status } from 'src/store/reducers/game';
const useStyles = makeStyles((theme) => ({
  currentVerb: {
    color: theme.palette.primary.contrastText,
  },
  score: {
    color: theme.palette.primary.contrastText,
  },
  buttons: {
    '& > *': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
}));

const { answerType, next, restartgame, startGame } = gameActions;

const Play: NextPage = ({}) => {
  const classes = useStyles();
  const gameState = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const { currentIndex, verbs, score, status } = gameState;
  const currentVerb = verbs[currentIndex];
  const typeStr = currentVerb.type === 'intrans' ? '自動詞' : '他動詞';
  return (
    <Container maxWidth="md">
      {status === Status.READY ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            size="large"
            onClick={() => dispatch(startGame())}
          >
            開始遊戲
          </Button>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h1" className={classes.currentVerb}>
            {currentVerb.name}
          </Typography>
          <Typography variant="h3" className={classes.score}>
            {score}
          </Typography>
          <Box display="flex" className={classes.buttons}>
            {status === Status.GUESS ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => dispatch(answerType('intrans'))}
                >
                  自動詞
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => dispatch(answerType('trans'))}
                >
                  他動詞
                </Button>
              </>
            ) : status === Status.CORRECT ? (
              <Typography variant="h3">答對了！ 是{typeStr}</Typography>
            ) : (
              status === Status.WRONG && (
                <Typography variant="h3">答錯了！ 是{typeStr}</Typography>
              )
            )}
          </Box>
          <Box display="flex" className={classes.buttons}>
            <Button
              variant="contained"
              size="large"
              onClick={() => dispatch(next())}
            >
              {status === Status.GUESS ? '跳過' : '下一題'}
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Play;
