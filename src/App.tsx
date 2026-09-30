import { FluentProvider, webLightTheme, Button } from '@fluentui/react-components'

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-800">
          Expense Tracker
        </h1>
        <Button appearance="primary">
          Fluent UI Button
        </Button>
      </div>
    </FluentProvider>
  )
}

export default App
