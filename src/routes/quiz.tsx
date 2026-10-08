import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { QUIZ, type QuizQuestion } from "@/data/quiz";

export const Route = createFileRoute("/quiz")({ component: QuizPage });

const STORAGE_KEY = "hydraulics-quiz";

type Saved = { missed: string[]; count: number };

function loadSaved(): Saved {
  const fallback = { missed: [] as string[], count: 10 };
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const saved = JSON.parse(raw) as Saved;
    const ids = new Set(QUIZ.map((item) => item.id));
    const missed = Array.isArray(saved.missed) ? saved.missed.filter((id) => ids.has(id)) : [];
    const count = Math.min(QUIZ.length, Math.max(5, Number(saved.count) || 10));
    return { missed, count };
  } catch {
    return fallback;
  }
}

function buildRound(count: number, missed: string[]): QuizQuestion[] {
  const byId = new Map(QUIZ.map((item) => [item.id, item]));
  const lead = missed.map((id) => byId.get(id)).filter((item): item is QuizQuestion => Boolean(item));
  const rest = QUIZ.filter((item) => !missed.includes(item.id));
  for (let i = rest.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = rest[i];
    rest[i] = rest[j];
    rest[j] = swap;
  }
  return [...lead, ...rest].slice(0, count);
}

function QuizPage() {
  const [saved, setSaved] = useState<Saved>({ missed: [], count: 10 });
  const [ready, setReady] = useState(false);
  const [round, setRound] = useState<QuizQuestion[]>([]);
  const [leadIds, setLeadIds] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setSaved(loadSaved());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }, [saved, ready]);

  const start = () => {
    const next = buildRound(saved.count, saved.missed);
    setRound(next);
    setLeadIds(saved.missed);
    setIndex(0);
    setPicked(null);
    setCorrectCount(0);
    setDone(false);
  };

  const question = round[index];
  const atEnd = done || (round.length > 0 && index >= round.length);

  const choose = (choice: number) => {
    if (!question || picked !== null) return;
    const right = choice === question.answer;
    setPicked(choice);
    if (right) setCorrectCount((value) => value + 1);
    setSaved((prev) => {
      const missed = prev.missed.filter((id) => id !== question.id);
      if (!right) missed.unshift(question.id);
      return { ...prev, missed };
    });
  };

  const next = () => {
    if (index + 1 >= round.length) {
      setDone(true);
      return;
    }
    setIndex((value) => value + 1);
    setPicked(null);
  };

  return (
    <main className="px-4 py-5 lg:px-8">
      <div className="mx-auto max-w-xl">
        <h1 className="font-display text-2xl tracking-wide text-fg">Quiz</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Miss one and it leads the next round. Get it right and it leaves the front of the line.
        </p>

        {round.length === 0 && (
          <div className="mt-5 border border-line bg-surface px-4 py-4">
            <label className="block text-sm font-medium text-fg" htmlFor="quiz-count">
              Number of questions
              <span className="ml-2 font-display text-xl text-amber">{saved.count}</span>
            </label>
            <input
              id="quiz-count"
              type="range"
              min={5}
              max={QUIZ.length}
              step={1}
              value={saved.count}
              onChange={(event) => setSaved((prev) => ({ ...prev, count: Number(event.target.value) }))}
              className="mt-3 w-full accent-amber"
            />
            <p className="mt-2 text-xs text-muted">
              {saved.missed.length === 0
                ? "No misses stored."
                : `${saved.missed.length} missed will sit at the front, up to the length you set.`}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={start}
                className="min-h-11 border border-amber bg-amber px-4 text-sm font-medium text-amber-ink"
              >
                Start
              </button>
              {saved.missed.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSaved((prev) => ({ ...prev, missed: [] }))}
                  className="min-h-11 border border-line px-4 text-sm text-fg"
                >
                  Clear missed
                </button>
              )}
            </div>
          </div>
        )}

        {question && !atEnd && (
          <div className="mt-5 border border-line bg-surface px-4 py-4">
            <p className="text-xs tracking-wide text-muted uppercase">
              {index + 1} of {round.length}
              {leadIds.includes(question.id) && <span className="text-oxide"> · missed before</span>}
            </p>
            <h2 className="mt-2 text-lg font-semibold leading-snug text-fg">{question.prompt}</h2>
            <div className="mt-4 flex flex-col gap-2">
              {question.choices.map((choice, choiceIndex) => {
                const show = picked !== null;
                const isAnswer = choiceIndex === question.answer;
                const isPick = choiceIndex === picked;
                let tone = "border-line text-fg";
                if (show && isAnswer) tone = "border-amber bg-amber text-amber-ink";
                else if (show && isPick) tone = "border-oxide text-oxide";
                return (
                  <button
                    key={choice}
                    type="button"
                    disabled={picked !== null}
                    onClick={() => choose(choiceIndex)}
                    className={`min-h-11 border px-3 text-left text-sm ${tone}`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <div className="mt-4">
                <p className="text-sm leading-relaxed text-muted">{question.why}</p>
                <button
                  type="button"
                  onClick={next}
                  className="mt-3 min-h-11 border border-amber bg-amber px-4 text-sm font-medium text-amber-ink"
                >
                  {index + 1 === round.length ? "Score" : "Next"}
                </button>
              </div>
            )}
          </div>
        )}

        {atEnd && (
          <div className="mt-5 border border-line bg-surface px-4 py-4">
            <p className="font-display text-3xl text-amber">
              {correctCount}
              <span className="text-muted">/{round.length}</span>
            </p>
            <p className="mt-2 text-sm text-muted">
              {saved.missed.length === 0
                ? "Nothing missed. The next round is a fresh draw."
                : `${saved.missed.length} still missed. They lead the next quiz.`}
            </p>
            <label className="mt-4 block text-sm text-fg" htmlFor="quiz-count-again">
              Number of questions
              <span className="ml-2 font-display text-xl text-amber">{saved.count}</span>
            </label>
            <input
              id="quiz-count-again"
              type="range"
              min={5}
              max={QUIZ.length}
              step={1}
              value={saved.count}
              onChange={(event) => setSaved((prev) => ({ ...prev, count: Number(event.target.value) }))}
              className="mt-2 w-full accent-amber"
            />
            <button
              type="button"
              onClick={start}
              className="mt-4 min-h-11 border border-amber bg-amber px-4 text-sm font-medium text-amber-ink"
            >
              Next quiz
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
