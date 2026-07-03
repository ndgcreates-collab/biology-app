"use client";

import { useState } from "react";
import { QuizSession } from "./QuizSession";
import { getMixedQuizQuestions } from "@/content/questions";

// Rendered client-only (via next/dynamic ssr:false) so the randomized
// question sample never has to match a server-rendered version.
export default function MixedQuizLoader() {
  const [questions] = useState(() => getMixedQuizQuestions(10));
  return <QuizSession topicId="mixed" questions={questions} />;
}
