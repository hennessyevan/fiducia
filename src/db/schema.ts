import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const issues = sqliteTable('issues', {
  text: text('text').default(''),
  id: text('id').primaryKey(),
})

export default {
  issues,
}
