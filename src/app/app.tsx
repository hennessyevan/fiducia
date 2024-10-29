import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PlusIcon, TrashIcon } from 'lucide-react'
import { Layout } from '../components/Layout'
import { db } from '../db'
import schema from '../db/schema'
import { Button } from '@/components/ui/button'
import { eq } from 'drizzle-orm'
import { Vase } from '@/components/Vase'

export function App() {
  const queryClient = useQueryClient()
  const { data: issues = [] } = useQuery({
    queryKey: ['issues'],
    queryFn: async () => {
      const data = await db.select().from(schema.issues).all()

      return data
    },
  })

  const { mutate: addIssue } = useMutation({
    mutationFn: async (text: string) => {
      await db.insert(schema.issues).values({ id: text, text })
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['issues'] })
    },
  })

  const { mutate: deleteIssue } = useMutation({
    mutationFn: async (id: string) => {
      await db.delete(schema.issues).where(eq(schema.issues.id, id))
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['issues'] })
    },
  })

  return (
    <Layout>
      <div className="container py-12 flex flex-col gap-2 ">
        {/* <ul className="flex flex-col gap-2">
          {issues?.map((issue) => (
            <li
              className="text-primary-dim py-3 px-4 border border-primary-dim rounded flex justify-between items-center"
              key={issue.id}
            >
              {issue.text}
              <Button
                size="icon"
                variant="destructive"
                onClick={() => {
                  deleteIssue(issue.id)
                }}
              >
                <TrashIcon />
              </Button>
            </li>
          ))}
        </ul>
        <Button
          className="ml-auto"
          onClick={() => {
            addIssue(`Issue: ${issues.length + 1}`)
          }}
        >
          <PlusIcon />
          Add Issue
        </Button> */}

        <Vase />
      </div>
    </Layout>
  )
}

export default App
