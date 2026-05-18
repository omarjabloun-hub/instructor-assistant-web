import { Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard } from '@/pages/Dashboard'
import { Courses } from '@/pages/Courses'
import { CreateAssessment } from '@/pages/CreateAssessment'
import { ExamBuilder } from '@/pages/ExamBuilder'
import { AIGrader } from '@/pages/AIGrader'
import { GradingQueue } from '@/pages/GradingQueue'
import { DesignSystem } from '@/pages/DesignSystem'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/create-assessment" element={<CreateAssessment />} />
      <Route path="/exam-builder" element={<ExamBuilder />} />
      <Route path="/grading-queue" element={<GradingQueue />} />
      <Route path="/ai-grader" element={<AIGrader />} />
      <Route path="/design-system/*" element={<DesignSystem />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
