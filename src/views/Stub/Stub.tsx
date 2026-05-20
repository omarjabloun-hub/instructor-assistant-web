import { AppShell } from '@/components/templates'
import { Breadcrumbs, Callout } from '@/components/molecules'

export type StubProps = {
  label: string
}

export function Stub({ label }: StubProps) {
  return (
    <AppShell
      topbar={{
        showSearch: false,
        leading: <Breadcrumbs items={[{ label }]} />,
      }}
    >
      <h1 style={{ marginBottom: 12 }}>{label}</h1>
      <Callout intent="info" title="Coming soon">
        This area isn’t built yet. The sidebar links here for navigation parity.
      </Callout>
    </AppShell>
  )
}
