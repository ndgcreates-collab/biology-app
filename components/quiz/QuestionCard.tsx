import { QuizQuestion } from "@/content/schema";

const difficultyColor: Record<QuizQuestion["difficulty"], string> = {
  easy: "bg-emerald-100 text-emerald-800",
  medium: "bg-amber-100 text-amber-800",
  hard: "bg-rose-100 text-rose-800",
};

export function QuestionCard({
  question,
  selectedIndex,
  submitted,
  onSelect,
}: {
  question: QuizQuestion;
  selectedIndex: number | null;
  submitted: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${difficultyColor[question.difficulty]}`}>
          {question.difficulty}
        </span>
        <span className="text-xs text-gray-500">{question.points} pts</span>
      </div>
      <p className="mt-3 text-lg font-medium text-gray-900">{question.prompt}</p>

      <div className="mt-4 space-y-2">
        {question.choices.map((choice, index) => {
          const isSelected = selectedIndex === index;
          const isCorrectChoice = index === question.correctIndex;

          let stateClasses = "border-gray-200 hover:border-emerald-300";
          if (submitted) {
            if (isCorrectChoice) {
              stateClasses = "border-emerald-500 bg-emerald-50";
            } else if (isSelected) {
              stateClasses = "border-rose-500 bg-rose-50";
            }
          } else if (isSelected) {
            stateClasses = "border-emerald-500 bg-emerald-50";
          }

          return (
            <button
              key={index}
              type="button"
              disabled={submitted}
              onClick={() => onSelect(index)}
              className={`w-full rounded-lg border px-4 py-2.5 text-left text-sm font-medium text-gray-800 transition disabled:cursor-default ${stateClasses}`}
            >
              {choice}
            </button>
          );
        })}
      </div>
    </div>
  );
}
