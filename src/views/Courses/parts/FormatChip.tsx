import { Chip, type ChipProps } from '@/components/atoms'
import { FORMAT_COLOR, type ContentFormat } from '@/lib/types'

export type FormatChipProps = Omit<ChipProps, 'color'> & {
  format: ContentFormat
  label?: string
}

const LABEL: Record<ContentFormat, string> = {
  notes: 'Lecture notes',
  slides: 'Slide deck',
  reading: 'Reading list',
  practice: 'Practice',
  summary: 'Student-facing summary',
  video: 'Video',
}

export function FormatChip({ format, label, ...rest }: FormatChipProps) {
  return (
    <Chip color={FORMAT_COLOR[format]} leadingDot {...rest}>
      {label ?? LABEL[format]}
    </Chip>
  )
}
