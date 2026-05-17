/**
 * The 10 named colors in the Spectrum palette.
 * Used by Chip, Avatar, ClassDot, and any other tinted surface.
 */
export type SpectrumColor =
  | 'gray'
  | 'brown'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red'

/**
 * Content-format color mapping used on the Courses page.
 * Format → Spectrum color is a system-wide convention.
 */
export type ContentFormat = 'notes' | 'slides' | 'reading' | 'practice' | 'summary' | 'video'

export const FORMAT_COLOR: Record<ContentFormat, SpectrumColor> = {
  notes: 'brown',
  slides: 'purple',
  reading: 'blue',
  practice: 'green',
  summary: 'teal',
  video: 'pink',
}

/**
 * Question-type color mapping (Exam Builder, AI Grader).
 */
export type QuestionType = 'qa' | 'open' | 'math' | 'code' | 'image' | 'other'

export const QUESTION_COLOR: Record<QuestionType, SpectrumColor> = {
  qa: 'blue',
  open: 'pink',
  math: 'purple',
  code: 'green',
  image: 'orange',
  other: 'gray',
}
