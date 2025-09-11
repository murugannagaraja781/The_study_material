import { useState, useRef } from "react";
import quizzesData from "./data/quizzes.json";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function QAApp() {
  const [mainIndex, setMainIndex] = useState(null);
  const [subIndex, setSubIndex] = useState(null);
  const [showAnswers, setShowAnswers] = useState({}); // {questionId: true/false}

  const withAnsRef = useRef();
  const withoutAnsRef = useRef();

  const toggleAnswer = (id) =>
    setShowAnswers((prev) => ({ ...prev, [id]: !prev[id] }));

  const handlePrint = (ref) => {
    const printContents = ref.current.innerHTML;
    const win = window.open("", "_blank", "width=800,height=600");
    win.document.write(`
      <html>
        <head>
          <title>Print Questions</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h2 { margin-top: 30px; }
            .question { margin: 15px 0; }
            .answer { margin-top: 5px; color: green; }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  // stage 1: select main category
  if (mainIndex === null) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Select Main Category
        </Typography>
        {quizzesData.map((main, idx) => (
          <Button
            key={idx}
            fullWidth
            variant="outlined"
            sx={{ my: 1 }}
            onClick={() => setMainIndex(idx)}
          >
            {main.maincategory}
          </Button>
        ))}
      </Container>
    );
  }

  // stage 2: select sub category
  if (subIndex === null) {
    return (
      <Container sx={{ py: 4 }}>
        <Button onClick={() => setMainIndex(null)} sx={{ mb: 2 }}>
          Back
        </Button>
        <Typography variant="h4" gutterBottom>
          Select Chapter
        </Typography>
        {quizzesData[mainIndex].subcategory.map((sub, idx) => (
          <Button
            key={idx}
            fullWidth
            variant="outlined"
            sx={{ my: 1 }}
            onClick={() => setSubIndex(idx)}
          >
            {sub.chapter}
          </Button>
        ))}
      </Container>
    );
  }

  // stage 3: show all questions
  const chapter = quizzesData[mainIndex].subcategory[subIndex];

  return (
    <Container sx={{ py: 4 }}>
      <Button onClick={() => setSubIndex(null)} sx={{ mb: 2 }}>
        Back
      </Button>
      <Typography variant="h4" gutterBottom>
        {chapter.chapter}
      </Typography>

      {/* Print buttons */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          sx={{ mr: 2 }}
          onClick={() => handlePrint(withAnsRef)}
        >
          Print with Answers
        </Button>
        <Button variant="outlined" onClick={() => handlePrint(withoutAnsRef)}>
          Print without Answers
        </Button>
      </Box>

      {/* On-screen Accordions */}
      {chapter.questions.map((q, idx) => (
        <div key={q.id} sx={{ mb: 2 }}>
          {idx + 1}. {q.question}
          {q.options.map((opt, i) => (
            <ListItemText primary={`${String.fromCharCode(97 + i)}) ${opt}`} />
          ))}
          {!showAnswers[q.id] ? (
            <div
              style={{ color: "blue", cursor: "pointer" }}
              variant="contained"
              size="small"
              onClick={() => toggleAnswer(q.id)}
            >
              Show Answer
            </div>
          ) : (
            <Typography variant="subtitle1" color="green">
              Answer: {q.answer}
            </Typography>
          )}
        </div>
      ))}

      {/* Hidden Print Sections */}
      <div style={{ display: "none" }}>
        {/* With Answers */}
        <div ref={withAnsRef}>
          <h2>{chapter.chapter}</h2>
          {chapter.questions.map((q, idx) => (
            <div key={q.id} className="question">
              {idx + 1}.{q.question}
              {q.options.map((opt, i) => (
                <li key={i}>{`${String.fromCharCode(97 + i)}) ${opt}`}</li>
              ))}
              <p className="answer">Answer: {q.answer}</p>
            </div>
          ))}
        </div>

        {/* Without Answers */}
        <div ref={withoutAnsRef}>
          <h2>{chapter.chapter}</h2>
          {chapter.questions.map((q, idx) => (
            <div key={q.id} className="question">
              <p>
                <b>
                  {idx + 1}. {q.question}
                </b>
              </p>
              <ul>
                {q.options.map((opt, i) => (
                  <li key={i}>{`${String.fromCharCode(97 + i)}) ${opt}`}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
