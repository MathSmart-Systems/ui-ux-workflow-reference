import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowLeft,
  Send,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Question } from '../../types/mathsmart';
import { aiService } from '../../services/aiService';

export const InteractiveActivityView: React.FC = () => {
  const {
    activeActivityId,
    activities,
    currentUser,
    setStudentScreen,
    setLastActivityResult,
    updateStudentMasteryAfterActivity,
  } = useApp();

  const activity =
    activities.find((a) => a.id === activeActivityId) || activities[0];

  const questions: Question[] = activity.questions;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [numberInputValue, setNumberInputValue] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    text: string;
    aiExploration?: string;
  } | null>(null);

  // State to track session performance
  const [questionAttempts, setQuestionAttempts] = useState<Record<number, number>>({
    0: 0,
  });
  const [earnedPoints, setEarnedPoints] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const attempts = questionAttempts[currentIndex] || 0;

  const handleSelectOption = (choice: string) => {
    if (isAnswerSubmitted && feedback?.isCorrect) return; // Locked if already correct
    setSelectedAnswer(choice);
    setIsAnswerSubmitted(false);
    setFeedback(null);
  };

  const handleCheckAnswer = async () => {
    const answerToValidate =
      currentQ.type === 'number_input' ? numberInputValue.trim() : selectedAnswer;

    if (!answerToValidate) return;

    const newAttempts = attempts + 1;
    setQuestionAttempts((prev) => ({
      ...prev,
      [currentIndex]: newAttempts,
    }));

    // Deterministic arithmetic grading
    const isCorrect =
      String(answerToValidate).trim().toLowerCase() ===
      String(currentQ.correctAnswer).trim().toLowerCase();

    setIsAnswerSubmitted(true);

    if (isCorrect) {
      if (newAttempts === 1) {
        setCorrectCount((prev) => prev + 1);
        setEarnedPoints((prev) => prev + 10);
      } else {
        setEarnedPoints((prev) => prev + 5);
      }

      setFeedback({
        isCorrect: true,
        text: currentQ.explanation || 'Correct! Two negative numbers multiplied together produce a positive result.',
      });
    } else {
      // Deterministic immediate educational feedback
      let hintExplanation =
        currentQ.explanation ||
        'Not quite. Remember what happens when two negative numbers are multiplied.';

      // Optional provider-agnostic Groq misconception explanation
      let aiExploration: string | undefined;
      try {
        aiExploration = await aiService.explainIncorrectAnswer(
          currentQ.text,
          answerToValidate,
          String(currentQ.correctAnswer)
        );
      } catch (err) {
        // graceful fallback
      }

      setFeedback({
        isCorrect: false,
        text: hintExplanation,
        aiExploration,
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer('');
      setNumberInputValue('');
      setShowHint(false);
      setIsAnswerSubmitted(false);
      setFeedback(null);
    } else {
      // Finish Activity
      const finalAccuracy = Math.round(
        (Math.max(1, correctCount) / totalQuestions) * 100
      );
      const calculatedNewMastery = Math.min(
        100,
        Math.max(60, Math.round(35 + finalAccuracy * 0.45))
      );

      setLastActivityResult({
        score: correctCount,
        maxScore: totalQuestions,
        accuracy: finalAccuracy,
        prevScore: 35,
        newScore: calculatedNewMastery || 78,
        competencyName: activity.competencyName,
      });

      // Update student record in context
      updateStudentMasteryAfterActivity(
        currentUser.id,
        activity.competencyId,
        calculatedNewMastery
      );

      setStudentScreen('activity_completion');
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswer('');
    setNumberInputValue('');
    setIsAnswerSubmitted(false);
    setFeedback(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          id="activity-back-btn"
          onClick={() => setStudentScreen('learning_module')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Lesson</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
            Points: {earnedPoints}
          </span>
          <span className="text-xs font-medium text-slate-500">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-slate-200/70 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Activity Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        {/* Competency & Attempts Counter */}
        <div className="flex items-center justify-between text-xs pb-4 border-b border-slate-100">
          <span className="font-semibold text-slate-500">
            Practice: <strong className="text-slate-900">{activity.title}</strong>
          </span>

          <div className="flex items-center gap-3">
            <span className="text-slate-500">
              Attempts: <strong className="text-slate-900">{attempts}</strong>
            </span>
            {currentQ.hint && (
              <button
                id="toggle-hint-btn"
                onClick={() => setShowHint(!showHint)}
                className="inline-flex items-center gap-1 text-amber-700 hover:text-amber-800 font-semibold cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Optional Hint Banner */}
        {showHint && currentQ.hint && (
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5 animate-in fade-in">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Helpful Hint: </span>
              <span>{currentQ.hint}</span>
            </div>
          </div>
        )}

        {/* Question Text */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
            {currentQ.type === 'multiple_choice' && 'Multiple Choice'}
            {currentQ.type === 'number_input' && 'Number Input'}
            {currentQ.type === 'fill_blank' && 'Fill in the Blank'}
            {currentQ.type === 'true_false' && 'True or False'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            {currentQ.text}
          </h2>
        </div>

        {/* Dynamic Interaction Type Formats */}
        {/* 1. Multiple Choice / Fill Blank / True False */}
        {currentQ.choices && currentQ.choices.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {currentQ.choices.map((choice, idx) => {
              const isSelected = selectedAnswer === choice;
              const isAnswerChecked = isAnswerSubmitted;
              const isChoiceCorrect = choice === currentQ.correctAnswer;

              let style =
                'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/70 text-slate-800';

              if (isSelected) {
                style = 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold';
              }

              if (isAnswerChecked) {
                if (isSelected && feedback?.isCorrect) {
                  style = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-500';
                } else if (isSelected && !feedback?.isCorrect) {
                  style = 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
                }
              }

              return (
                <button
                  key={idx}
                  id={`activity-choice-${idx}`}
                  onClick={() => handleSelectOption(choice)}
                  className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${style}`}
                >
                  <span className="font-mono-math text-base">{choice}</span>
                  {isAnswerChecked && isSelected && (
                    <span>
                      {feedback?.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-500" />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* 2. Number Input format */}
        {currentQ.type === 'number_input' && (
          <div className="pt-2 max-w-sm">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Enter your calculated numeric answer:
            </label>
            <div className="flex gap-2">
              <input
                id="number-input-answer-field"
                type="text"
                placeholder="e.g. 4 or -4"
                value={numberInputValue}
                onChange={(e) => {
                  setNumberInputValue(e.target.value);
                  setIsAnswerSubmitted(false);
                  setFeedback(null);
                }}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 outline-hidden font-mono-math text-lg text-slate-900"
              />
            </div>
          </div>
        )}

        {/* Immediate Feedback Box */}
        {feedback && (
          <div
            id="activity-feedback-container"
            className={`p-5 rounded-xl border text-xs animate-in fade-in duration-150 ${
              feedback.isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-start gap-3">
              {feedback.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1.5">
                <p className="font-bold text-sm">
                  {feedback.isCorrect ? 'Correct!' : 'Not quite.'}
                </p>
                <p className="leading-relaxed">{feedback.text}</p>

                {/* Optional Groq AI misconception explanation */}
                {feedback.aiExploration && !feedback.isCorrect && (
                  <div className="mt-2 pt-2 border-t border-rose-200/80 text-[11px] text-rose-800 flex items-start gap-2">
                    <Zap className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>AI Pedagogical Explanation: </strong>
                      {feedback.aiExploration}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
          <div>
            {!feedback?.isCorrect && isAnswerSubmitted && (
              <button
                id="activity-try-again-btn"
                onClick={handleTryAgain}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Another Answer</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!feedback?.isCorrect ? (
              <button
                id="activity-check-answer-btn"
                onClick={handleCheckAnswer}
                disabled={
                  currentQ.type === 'number_input'
                    ? !numberInputValue.trim()
                    : !selectedAnswer
                }
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:pointer-events-none text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Check Answer</span>
              </button>
            ) : (
              <button
                id="activity-next-question-btn"
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
              >
                <span>{currentIndex < totalQuestions - 1 ? 'Next Question' : 'Complete Activity'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
