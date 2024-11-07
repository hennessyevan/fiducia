import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PlusIcon, TrashIcon } from 'lucide-react'
import { Layout } from '../components/Layout'
import { db } from '../db'
import schema from '../db/schema'
import { Button } from '@/components/ui/button'
import { eq } from 'drizzle-orm'
import { Vase } from '@/components/Vase'
import { SWToolbar } from '@/components/SWToolbar'

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
      <Vase />
      <SWToolbar />
    </Layout>
  )
}

export default App
