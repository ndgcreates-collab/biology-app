import { PageContainer } from "@/components/layout/PageContainer";
import { QuizPicker } from "@/components/quiz/QuizPicker";
import { DbQuizList } from "@/components/quiz/DbQuizList";

export default function QuizIndexPage() {
  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-gray-900">Quizzes</h1>
      <p className="mt-1 text-sm text-gray-600">
        Pick a topic quiz, or take the mixed quiz for a cumulative review.
      </p>
      <div className="mt-6 space-y-6">
        <DbQuizList />
        <QuizPicker />
      </div>
    </PageContainer>
  );
}
