import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import manifest from '../../manifest'
import { Layout } from '../components/Layout'
import { db } from '../db'
import schema from '../db/schema'

export function App() {
  const queryClient = useQueryClient()
  const { data: issues = [] } = useQuery({
    queryKey: ['issues'],
    queryFn: async () => {
      const data = await db.select().from(schema.issues).all()

      return data
    },
  })

  db.select().from(schema.issues).all().then(console.log)

  const { mutate: addIssue } = useMutation({
    mutationFn: async (text: string) => {
      await db.insert(schema.issues).values({ id: text, text })
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['issues'] })
    },
  })

  return (
    <Layout>
      <span className="container">Hello {manifest.name}</span>
      <ul>{issues?.map((issue) => <li key={issue.id}>{issue.text}</li>)}</ul>
      <button
        onClick={() => {
          addIssue(`Issue: ${issues.length + 1}`)
        }}
      >
        Add Issue
      </button>
    </Layout>
  )
}

export default App
