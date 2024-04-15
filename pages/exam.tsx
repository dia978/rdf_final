/* eslint-disable react-hooks/exhaustive-deps */
import RootLayout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const RDFRecruitmentForm: React.FC = () => {
  const [questions, setQuestions] = useState<
    { question: string; options: string[]; correctAnswer: string }[]
  >([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [scores, setScores] = useState<number[]>([]);
  const [passed, setPassed] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [userEmail, setUserEmail] = useState<string>("");
  const [email, setEmail] = useState<string>(userEmail || "");
  const [timer, setTimer] = useState<number>(60); // Timer set to 60 seconds
  const [timerStarted, setTimerStarted] = useState<boolean>(false); // Track if timer has started for the second attempt
  const [answerSelected, setAnswerSelected] = useState<boolean>(false); // Track if any answer has been selected
  const [attempt1Completed, setAttempt1Completed] = useState<boolean>(false); // Track if attempt 1 is completed
  const [showQuestions, setShowQuestions] = useState<boolean>(false); // Track if questions should be displayed
  const [loading, setLoading] = useState<boolean>(false); // State variable to track loading state
  const [loading1, setLoading1] = useState<boolean>(false); // State variable to track loading state
  const [tokenValid, setTokenValid] = useState<boolean>(false);

  console.log(userEmail);
  let countdown: NodeJS.Timeout | undefined;

  const router = useRouter();

  useEffect(() => {
    const { token } = router.query;
    if (token) {
      // Validate the token
      validateToken(token as string);
    }
  }, [router.query]);

  const validateToken = async (token: string) => {
    try {
      const response = await axios.get(`/api/send-exam?token=${token}`);
      if (response.data.valid) {
        setTokenValid(true); // Token is valid, show questions
        setUserEmail(response.data.email); // Update userEmail state
        setEmail(response.data.email);
      } else {
        alert("Invalid or expired token."); // Token is invalid or expired
      }
    } catch (error) {
      console.error("Error validating token:", error);
      alert("Error validating token. Please try again later.");
    }
  };

  useEffect(() => {
    const savedAttempts = attempts; // Remove localStorage.getItem
    if (savedAttempts) {
      setAttempts(savedAttempts);
    }
  }, []);

  useEffect(() => {
    if (attempts < 2) {
      const shuffledQuestions = shuffle([
        {
          question: "What does RDF stand for?",
          options: [
            "Rwanda Defence Force",
            "Republic Development Fund",
            "Red Dragon Fighters",
            "Rebel Defense Front",
          ],
          correctAnswer: "Rwanda Defence Force",
        },
        {
          question: "When was the RDF established?",
          options: ["1990", "1994", "1993", "2000"],
          correctAnswer: "1994",
        },
        {
          question: "What is the role of RDF?",
          options: [
            "National security and defense",
            "Environmental conservation",
            "Tourism promotion",
            "Healthcare provision",
          ],
          correctAnswer: "National security and defense",
        },
        {
          question: "Where has RDF been involved in peacekeeping missions?",
          options: [
            "Europe",
            "Asia",
            "United Nations and African Union",
            "South America",
          ],
          correctAnswer: "United Nations and African Union",
        },
        {
          question: "How many marks are required to pass the RDF exam?",
          options: ["5", "10", "15", "20"],
          correctAnswer: "10",
        },
      ]);
      setQuestions(shuffledQuestions);
      const initialAnswers = shuffledQuestions.reduce(
        (acc, question, index) => {
          acc[`question${index + 1}`] = "";
          return acc;
        },
        {} as { [key: string]: string }
      );
      setAnswers(initialAnswers);
    }
  }, [attempts]);

  useEffect(() => {
    if (timerStarted && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(countdown as NodeJS.Timeout); // Stop timer when it reaches 0
    }
    return () => clearInterval(countdown as NodeJS.Timeout);
  }, [timer, timerStarted]);

  const shuffle = (array: any[]) => {
    if (array.length === 0) return array;
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    question: string,
    option: string
  ) => {
    const newAnswers = { ...answers, [question]: option };
    setAnswers(newAnswers);
    setAnswerSelected(true);
    if (!timerStarted) {
      setTimerStarted(true);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setLoading(true);
      let totalScore = 0;
      for (const question in answers) {
        if (
          answers[question] ===
          questions[parseInt(question.substr(8)) - 1].correctAnswer
        ) {
          totalScore += 4;
        }
      }
      setScores((prevScores) => [...prevScores, totalScore]);
      // Remove localStorage.setItem
      if (totalScore >= 10) {
        setPassed(true);
      }
      // Remove localStorage.setItem
      setAttempts(attempts + 1);
      setAnswers({});
      setTimer(60);
      setTimerStarted(false);
      setAnswerSelected(false);
      setShowQuestions(false);
      setLoading(false);
      if (attempts === 0) {
        setAttempt1Completed(true);
      } else {
        setShowQuestions(false);
      }
    } else {
      alert("Please enter a valid email.");
    }
  };
  const finalHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setLoading1(true);
      const data = {
        email,
        attempts,
        answers,
        scores,
        passed,
      };

      try {
        // Make a POST request to the API endpoint to save the data
        const response = await axios.post("/api/exam", data);
        console.log("Data saved successfully:", response.data);
        setLoading1(false);
      } catch (error) {
        setLoading1(false);
        console.error("Error saving data:", error);
      }
    } else {
      alert("Please enter a valid email.");
    }
  };
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleAttempt2Click = () => {
    setShowQuestions(true);
  };
  return (
    <RootLayout>
      {tokenValid ? (
        <div className="flex justify-center my-12">
          <div className="w-1/2 shadow rounded-xl p-4">
            <h2 className="text-center text-primary">RDF Recruitment Exam</h2>
            {attempt1Completed && attempts === 1 && (
              <div className="grid">
                <h4 className="font-bold">Attempt 1 Score: {scores[0] || 0}</h4>
                {passed ? (
                  <p className="bg-primary">
                    You have passed the exam. Congratulations!
                  </p>
                ) : (
                  <p className="text-[red]">
                    Unfortunately, you have not passed the exam. Please try
                    again.
                  </p>
                )}
              </div>
            )}
            {showQuestions ? (
              <>
                <div className="flex justify-between">
                  <span className="p-2 my-2 bg-[#87CEEB] text-white">
                    Attempt {attempts} of 2
                  </span>
                  {answerSelected && (
                    <p>
                      Time Left:{" "}
                      <span className="text-[red]">{timer} seconds</span>
                    </p>
                  )}
                </div>

                <form onSubmit={handleSubmit}>
                  <label>
                    Email:
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      disabled
                    />
                  </label>
                  {questions.map((q, index) => (
                    <div key={index}>
                      <p className="font-bold mt-4 mb-2">
                        {index + 1}. {q.question}
                      </p>
                      {q.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className=" items-center w-full py-4"
                        >
                          <label
                            htmlFor={`question${index + 1}`}
                            className="mr-2"
                          >
                            {option}
                          </label>
                          <input
                            type="radio"
                            name={`question${index + 1}`}
                            value={option}
                            onChange={(e) =>
                              handleChange(e, `question${index + 1}`, option)
                            }
                            checked={answers[`question${index + 1}`] === option}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="border rounded-lg gap-2 text-white bg-primary hover:border-[yellow] hover:text-white sm:text-xs p-2 md:px-4 md:py-2 flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Answers"}
                  </button>
                </form>
                {/* Display timer only if an answer is selected */}
                {/* Display score after attempt 1 */}
              </>
            ) : (
              <>
                {scores.map((score, attemptIndex) => (
                  <h2 key={attemptIndex}>
                    Attempt {attemptIndex + 1} Score: {score}
                  </h2>
                ))}
                {attempts < 2 && !showQuestions && (
                  <button
                    onClick={handleAttempt2Click}
                    className="border rounded-lg gap-2 text-white bg-primary hover:border-[yellow] hover:text-white sm:text-xs p-2 md:px-4 md:py-2 flex items-center justify-center"
                  >
                    Attempt {attempts + 1}
                  </button>
                )}
                {attempts > 0 && (
                  <button
                    onClick={finalHandleSubmit}
                    className="border rounded-lg gap-2 text-white bg-primary hover:border-[yellow] hover:text-white sm:text-xs p-2 md:px-4 md:py-2 flex items-center justify-center"
                    disabled={loading1}
                  >
                    {loading1 ? "Submitting..." : "Submit All Answers"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <main className="h-[80vh]">
        <section className="grid place-items-center h-full">
          <h2>You are not allowed to do the exam</h2>
        </section>
      </main>
      )}
    </RootLayout>
  );
};

export default RDFRecruitmentForm;
