import { useState, useEffect } from "react";
import quizzesData from "../data/quizzes.json";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// Helper function for dynamic font size
const getFontSize = (text) => (text.length > 40 ? "1rem" : "1.2rem");

export default function QuizApp() {
  const [stage, setStage] = useState("main"); // main | sub | quiz | result
  const [mainCatIndex, setMainCatIndex] = useState(0);
  const [subCatIndex, setSubCatIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60 * 30);
  const [viewMode, setViewMode] = useState("table"); // grid | table
  const [warning, setWarning] = useState(false);

  const mainCategory = quizzesData[mainCatIndex];
  const subCategory = mainCategory?.subcategory[subCatIndex];
  const question = subCategory?.questions[qIndex];

  // Timer
  useEffect(() => {
    if (stage !== "quiz") return;
    if (timeLeft <= 0) return handleSubmit();

    const id = setInterval(() => {
      setTimeLeft((t) => t - 1);
      if (timeLeft <= 300) setWarning(true);
    }, 1000);
    return () => clearInterval(id);
  }, [timeLeft, stage]);

  // Handlers
  const handleSelect = (qId, opt) => setAnswers((a) => ({ ...a, [qId]: opt }));

  const nextQ = () => {
    if (qIndex < subCategory.questions.length - 1) setQIndex(qIndex + 1);
    else handleSubmit();
  };
  const prevQ = () => {
    if (qIndex > 0) setQIndex(qIndex - 1);
  };

  const handleSubmit = () => {
    let obtained = 0,
      total = 0;
    quizzesData.forEach((main) =>
      main.subcategory.forEach((sub) =>
        sub.questions.forEach((q) => {
          const marks = q.marks || 1;
          total += marks;
          if (answers[q.id] === q.answer) obtained += marks;
        })
      )
    );
    setScore(obtained);
    setTotalMarks(total);
    setStage("result");
  };

  // Progress
  const totalQuestions = subCategory?.questions.length || 0;
  const pct = Math.round((Object.keys(answers).length / totalQuestions) * 100);

  // --- UI stages ---
  if (stage === "main") {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Select Main Category
        </Typography>
        <Button
          variant="outlined"
          sx={{ mb: 2 }}
          onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
        >
          Toggle {viewMode === "grid" ? "Table" : "Grid"} View
        </Button>

        {viewMode === "grid" ? (
          <Grid container spacing={3}>
            {quizzesData.map((main, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card
                  sx={{
                    height: 200,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#fdfdf5",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setMainCatIndex(idx);
                    setStage("sub");
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      align="center"
                      sx={{ fontSize: getFontSize(main.maincategory) }}
                    >
                      {main.maincategory}
                    </Typography>
                    <Typography align="center" mt={2}>
                      {main.subcategory.length} Chapters
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Main Category</b>
                  </TableCell>
                  <TableCell>
                    <b>Chapters</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quizzesData.map((main, idx) => (
                  <TableRow
                    key={idx}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setMainCatIndex(idx);
                      setStage("sub");
                    }}
                  >
                    <TableCell>{main.maincategory}</TableCell>
                    <TableCell>{main.subcategory.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    );
  }

  if (stage === "sub") {
    return (
      <Container sx={{ py: 4 }}>
        <Button onClick={() => setStage("main")} sx={{ mb: 2 }}>
          Back
        </Button>
        <Typography variant="h4" gutterBottom>
          Select Chapter
        </Typography>
        <Button
          variant="outlined"
          sx={{ mb: 2, ml: 2 }}
          onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
        >
          Toggle {viewMode === "grid" ? "Table" : "Grid"} View
        </Button>

        {viewMode === "grid" ? (
          <Grid container spacing={3}>
            {mainCategory.subcategory.map((sub, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card
                  sx={{
                    height: 180,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#f9f9f9",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSubCatIndex(idx);
                    setStage("quiz");
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      align="center"
                      sx={{ fontSize: getFontSize(sub.chapter) }}
                    >
                      {sub.chapter}
                    </Typography>
                    <Typography align="center" mt={1}>
                      {sub.questions.length} Questions
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Chapter</TableCell>
                  <TableCell>Questions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mainCategory.subcategory.map((sub, idx) => (
                  <TableRow
                    key={idx}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setSubCatIndex(idx);
                      setStage("quiz");
                    }}
                  >
                    <TableCell>{sub.chapter}</TableCell>
                    <TableCell>{sub.questions.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    );
  }

  if (stage === "quiz") {
    return (
      <Container sx={{ py: 3 }}>
        <Button onClick={() => setStage("sub")} sx={{ mb: 2 }}>
          Back
        </Button>
        <Typography variant="h5" gutterBottom>
          {subCategory.chapter}
        </Typography>
        <Typography sx={{ color: warning ? "red" : "black" }}>
          Time Left: {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </Typography>
        <LinearProgress variant="determinate" value={pct} sx={{ my: 2 }} />

        <Typography variant="subtitle1" mb={1}>
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

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={prevQ} disabled={qIndex === 0}>
            Prev
          </Button>
          <Button
            variant="contained"
            onClick={nextQ}
            disabled={qIndex === totalQuestions - 1}
          >
            Next
          </Button>
          <Button color="error" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        </Box>
      </Container>
    );
  }

  if (stage === "result") {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Quiz Result
        </Typography>
        <Typography variant="h6">Score: {score}</Typography>
        <Typography variant="h6">Total Marks: {totalMarks}</Typography>
        <Typography variant="h6">
          Questions Answered: {Object.keys(answers).length}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => {
            setStage("main");
            setAnswers({});
            setScore(0);
            setTotalMarks(0);
            setQIndex(0);
            setTimeLeft(60 * 30);
          }}
        >
          Retry
        </Button>
      </Container>
    );
  }

  return null;
}
