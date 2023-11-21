import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Confetti from "react-confetti";
import { Box, Spinner ,Text} from "@chakra-ui/react";

interface QuizProps {
  numberOfQuestions: number; // Number of questions to generate
}

const Quiz: React.FC<QuizProps> = ({ numberOfQuestions }) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [options, setOptions] = useState<string[][]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("9"); // Default category: General Knowledge

  const optionColors = ["#007bff", "#e74c3c", "#3498db", "#f1c40f"];

  const categories = [
    { id: "9", name: "General Knowledge" },
    { id: "11", name: "Movies" },
    { id: "17", name: "Science & Nature" },
    { id: "18", name: "Computers" },
    { id: "19", name: "Mathematics" },
    { id: "21", name: "Sports" },
    { id: "22", name: "Geography" },
    { id: "23", name: "History" },
    { id: "27", name: "Animals" },
    { id: "31", name: "Anime & Manga" }
  ];

  useEffect(() => {
    async function generateQuizQuestions() {
      const apiUrl = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${selectedCategory}&difficulty=easy&type=multiple`;

      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.results) {
          const generatedQuestions = data.results.map((result: any) => result.question);
          const generatedOptions = data.results.map((result: any) => {
            const options = [...result.incorrect_answers];
            options.splice(
              Math.floor(Math.random() * (options.length + 1)),
              0,
              result.correct_answer
            );
            return options;
          });
          const correctAnswers = data.results.map((result: any) => result.correct_answer);

          setQuestions(generatedQuestions);
          setOptions(generatedOptions);
          setCorrectAnswers(correctAnswers);
        } else {
          console.error("Error fetching quiz questions:", data);
        }
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }

      setIsLoading(false);
    }

    generateQuizQuestions();
  }, [numberOfQuestions, selectedCategory]);

  const currentQuestion = questions[currentQuestionIndex];
  const currentOptions = options[currentQuestionIndex];
  const correctAnswer = correctAnswers[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
  };

  const alert = () => {
    Swal.fire({
      title: `Congratulations 🎉👏🎊`,
      text: `Quiz finished! Your score: ${score} / ${questions.length}`,
      imageUrl:
        "https://1.bp.blogspot.com/-HjVB3SbsLXk/VlowxvdkctI/AAAAAAAARqA/Fh7P3WbWcHM/s1600/congratulations.png",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      confirmButtonText: "Quiz Done!",
      confirmButtonColor: "Green",
    });
  };

  const handleNextQuestion = () => {
    if (selectedOption === correctAnswer) {
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
    }

    if (currentQuestionIndex + 1 < numberOfQuestions) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      alert();
      setScore(0);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
    }
  };

  if (isLoading) {
    return <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height="150vh"
  >
    <Spinner
      thickness="8px"
      speed="1.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="2xl"
      marginRight="2"
    />
    <Text fontSize="lg" color="blue.500">Ai Generated Questions Loading...</Text>
  </Box>;
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        maxHeight: "1200px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#f8f8f8",
        borderRadius: "8px",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
      }}
    >
      <h1 style={{ fontSize: "45px", marginBottom: "20px", color: "#ED0800" }}>Quiz</h1>
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* selection */}

       <label
  htmlFor="categorySelect"
  style={{
    fontSize: "24px", // Larger font size
    marginRight: "10px",
    color: "#BF10D2", // Red color
    fontFamily: "Arial, sans-serif", // Change the font family
  }}
>
  Select Category:
</label>
<select
  id="categorySelect"
  onChange={handleCategoryChange}
  value={selectedCategory}
  style={{
    fontSize: "18px", // Larger font size
    padding: "10px 20px", // Increase padding for larger size
    borderRadius: "8px", // Rounded corners
    border: "2px solid #E74C3C", // Red border
    backgroundColor: "#3498DB", // Blue background
    color: "#FFF", // White text
    fontFamily: "Arial, sans-serif", // Change the font family
  }}
>
  {categories.map((category) => (
    <option
      key={category.id}
      value={category.id}
      style={{
        backgroundColor: "#3498DB", // Blue background
        color: "#FFF", // White text
      }}
    >
      {category.name}
    </option>
  ))}
</select>



{/* end */}
<br/>
<br/>
        <p style={{ fontSize: "20px", marginBottom: "20px", color: "#000000" }}>
          {currentQuestion}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {currentOptions.map((option, index) => (
            <button
              key={index}
              style={{
                margin: "5px",
                padding: "10px 20px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
                backgroundColor:
                  selectedOption === option
                    ? optionColors[index % optionColors.length]
                    : "#fff",
                color: selectedOption === option ? "#fff" : "#000",
              }}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "20px",
          backgroundColor: "Green",
          color: "#fff",
          border: "2px yellow",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={handleNextQuestion}
        disabled={selectedOption === null}
      >
        Next Question
      </button>
      <div style={{ fontSize: "18px", marginBottom: "20px", color: "#ED0800" }}>
        Current Score: {score} / {numberOfQuestions} 
        <br />{correctAnswer}
      </div>
      {showConfetti && (
        <Confetti
          numberOfPieces={200}
          width={800}
          height={600}
          recycle={false}
          colors={optionColors}
        />
      )}
    </div>
  );
};

export default Quiz;
