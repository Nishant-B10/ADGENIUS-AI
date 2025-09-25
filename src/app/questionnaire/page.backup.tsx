'use client'

import { useState } from 'react'
import Link from 'next/link'

const questions = [
  {
    id: 1,
    title: "Problem & Solution",
    question: "What specific, measurable problem does your product solve that customers are actively trying to fix, and what proof validates this solution?",
    placeholder: "Describe the problem, your solution, and any evidence (data, testimonials, certifications) that proves it works.",
    followUp: "What alternatives are they currently using?"
  },
  {
    id: 2,
    title: "Customer Stories",
    question: "When your best customers enthusiastically recommend you to friends, what specific story or transformation do they describe?",
    placeholder: "Share the exact words they use, emotions they express, and what surprised them most.",
    followUp: "What emotion do they express when talking about you?"
  },
  {
    id: 3,
    title: "Purchase Involvement",
    question: "Is this primarily a considered purchase requiring research (high-involvement) or an impulse/habit purchase (low-involvement)?",
    placeholder: "Describe the typical consideration period, who influences the decision, and what triggers the buying moment.",
    followUp: "How long is the typical consideration period?"
  },
  {
    id: 4,
    title: "Budget & Goals",
    question: "What percentage of your budget is for long-term brand building versus immediate sales activation, and what single business metric defines success?",
    placeholder: "Include total budget, timeline, and whether success is measured by market share, revenue, customer acquisition, or another metric.",
    followUp: "What's your timeline for seeing results?"
  },
  {
    id: 5,
    title: "Competition",
    question: "Who are your three biggest competitors, what do they claim to own in customers' minds, and what mental territory is still unclaimed?",
    placeholder: "List competitors, their positioning, category conventions, and how you compare on price.",
    followUp: "What distinctive assets (colors, symbols) are already taken?"
  },
  {
    id: 6,
    title: "Customer Context",
    question: "Where are customers physically and mentally when they realize they need your product and when they actually purchase it?",
    placeholder: "Describe the channels they use for research, device preferences (mobile/desktop), and competing priorities in that moment.",
    followUp: "What time of day do they typically purchase?"
  },
  {
    id: 7,
    title: "Emotional Journey",
    question: "What emotional state do customers experience before, during, and after purchase, and what functional and emotional barriers prevent buying?",
    placeholder: "List the top 3 objections, fears that need addressing, and aspirations you can fulfill.",
    followUp: "What's their biggest fear about purchasing?"
  },
  {
    id: 8,
    title: "Brand Assets",
    question: "What distinctive brand assets (visual, verbal, sonic) do you currently own or could own, and what's your brand's personality in human terms?",
    placeholder: "Describe what must always be included, your tone of voice, and what you can never say or show.",
    followUp: "If your brand was a person, how would you describe them?"
  },
  {
    id: 9,
    title: "Past Performance",
    question: "What has worked best and failed worst in your previous marketing, with specific metrics and learnings?",
    placeholder: "Share creative elements that drove highest engagement, messages that resonate, and why failures failed.",
    followUp: "What surprised you most about what worked?"
  },
  {
    id: 10,
    title: "Key Understanding",
    question: "If customers truly understood one single thing about your product that they don't understand today, what would that be and why would it compel purchase?",
    placeholder: "Identify the biggest misconception, what customers discover after buying, and your 'aha' moment.",
    followUp: "What do customers say after they finally 'get it'?"
  }
]

export default function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showFollowUp, setShowFollowUp] = useState(false)

  const current = questions[currentQuestion - 1]

const handleNext = () => {
  if (currentQuestion < 10) {
    setCurrentQuestion(currentQuestion + 1)
    setShowFollowUp(false)
  } else {
    // Save all answers to localStorage before navigating
    localStorage.setItem('questionnaireAnswers', JSON.stringify(answers))
    localStorage.setItem('questionnaireCompleted', 'true')
    window.location.href = '/brief'
  }
}

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1)
      setShowFollowUp(false)
    }
  }

  const handleAnswerChange = (value: string) => {
    setAnswers({...answers, [currentQuestion]: value})
    // Show follow-up after user starts typing
    if (value.length > 50 && !showFollowUp) {
      setShowFollowUp(true)
    }
  }

  return (
    <main className="min-h-screen bg-black pt-24 px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-gray-500 text-sm mb-2">
            <span>Question {currentQuestion} of 10</span>
            <span>{currentQuestion * 10}% Complete</span>
          </div>
          <div className="w-full bg-gray-800 h-1 rounded-full">
            <div 
              className="bg-yellow-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${currentQuestion * 10}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-serif text-white mb-2">
            Question {current.id}: {current.title}
          </h2>
          <p className="text-gray-300 mb-6 text-lg">
            {current.question}
          </p>
          
          <textarea
            className="w-full h-40 bg-black border border-gray-700 text-white p-4 rounded-lg focus:border-yellow-600 focus:outline-none resize-none"
            placeholder={current.placeholder}
            value={answers[currentQuestion] || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
          />

          {/* Follow-up Question (appears after user starts typing) */}
          {showFollowUp && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-yellow-600 text-sm mb-2">Follow-up:</p>
              <p className="text-gray-300">{current.followUp}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              className={`px-6 py-3 border border-gray-700 text-gray-400 rounded ${
                currentQuestion === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:border-white hover:text-white'
              }`}
              disabled={currentQuestion === 1}
            >
              Previous
            </button>
            
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-yellow-600 text-black font-medium rounded hover:bg-yellow-500"
            >
              {currentQuestion === 10 ? 'Complete' : 'Next Question →'}
            </button>
          </div>
        </div>

        {/* Question dots indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {questions.map((q) => (
            <div
              key={q.id}
              className={`w-2 h-2 rounded-full ${
                q.id === currentQuestion ? 'bg-yellow-600' : 'bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  )
}