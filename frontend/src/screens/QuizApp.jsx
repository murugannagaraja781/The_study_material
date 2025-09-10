import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Button,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  LinearProgress,
} from "@mui/material";

export default function QuizApp() {
  const [quizzes, setQuizzes] = useState([]);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { "C1Q1": "Option text" }
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60 * 30); // 30 minutes

  // load quiz data
  useEffect(() => {
    fetch("/quizzes.json")
      .then((res) => res.json())
      .then(setQuizzes)
      .catch((e) => console.error("Error loading quizzes:", e));
  }, []);

  // countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const id = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  if (!quizzes || quizzes.length === 0) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  const chapter = quizzes[chapterIndex];
  const question = chapter?.questions?.[qIndex];

  if (!chapter || !question) {
    return (
      <Container>
        <Typography>Loading question…</Typography>
      </Container>
    );
  }

  const handleSelect = (qId, opt) => {
    setAnswers((a) => ({ ...a, [qId]: opt }));
  };

  const nextQ = () => {
    if (qIndex < chapter.questions.length - 1) {
      setQIndex(qIndex + 1);
    } else if (chapterIndex < quizzes.length - 1) {
      setChapterIndex(chapterIndex + 1);
      setQIndex(0);
    } else {
      handleSubmit();
    }
  };

  const prevQ = () => {
    if (qIndex > 0) {
      setQIndex(qIndex - 1);
    } else if (chapterIndex > 0) {
      setChapterIndex(chapterIndex - 1);
      setQIndex(quizzes[chapterIndex - 1].questions.length - 1);
    }
  };

  const handleSubmit = () => {
    let obtained = 0;
    quizzes.forEach((ch) =>
      ch.questions.forEach((q) => {
        const marks = q.marks || 1;
        if (answers[q.id] && answers[q.id] === q.answer) {
          obtained += marks;
        }
      })
    );
    setScore(obtained);
    setShowResult(true);
  };

  const totalQuestions = quizzes.reduce((s, c) => s + c.questions.length, 0);
  const pct = Math.round((Object.keys(answers).length / totalQuestions) * 100);

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {!showResult ? (
        <Paper sx={{ p: 3 }} elevation={3}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">{chapter.chapter}</Typography>
            <Typography>
              Time left: {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={pct}
            sx={{ mt: 2, mb: 2 }}
          />

          <Typography variant="subtitle1">
            Q{qIndex + 1}. {question.question}
          </Typography>

          <RadioGroup
            value={answers[question.id] || ""}
            onChange={(e) => handleSelect(question.id, e.target.value)}
          >
            {question.options.map((opt, idx) => (
              <FormControlLabel
                key={idx}
                value={opt}
                control={<Radio />}
                label={opt}
              />
            ))}
          </RadioGroup>

          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={prevQ}>
              Prev
            </Button>
            <Box>
              <Button variant="contained" onClick={nextQ} sx={{ mr: 1 }}>
                Next
              </Button>
              <Button color="error" onClick={handleSubmit}>
                Submit Quiz
              </Button>
            </Box>
          </Box>
        </Paper>
      ) : (
        <Paper sx={{ p: 3 }} elevation={3}>
          <Typography variant="h5">Result</Typography>
          <Typography variant="subtitle1">Score: {score}</Typography>
          <Typography>Total Questions: {totalQuestions}</Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => {
              setShowResult(false);
              setAnswers({});
              setScore(0);
              setChapterIndex(0);
              setQIndex(0);
              setTimeLeft(60 * 30);
            }}
          >
            Retry
          </Button>
        </Paper>
      )}
    </Container>
  );
}
