import { SQLocalDrizzle } from 'sqlocal/drizzle'
import { drizzle } from 'drizzle-orm/sqlite-proxy'
import schema from './schema'
import { migrate } from './migrations'

const { driver, batchDriver, sql } = new SQLocalDrizzle({
  databasePath: 'fiducia.sqlite3',
  onConnect() {
    migrate(sql as any)
  },
})

export const db = drizzle(driver, batchDriver, { schema })
