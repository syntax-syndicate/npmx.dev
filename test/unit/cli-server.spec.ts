import { describe, expect, it } from 'vitest'
import { createConnectorApp } from '../../cli/src/server.ts'

const TEST_TOKEN = 'test-token-123'

describe('connector server', () => {
  describe('GET /user/packages', () => {
    it('returns 401 without auth token', async () => {
      const app = createConnectorApp(TEST_TOKEN)

      const response = await app.fetch(new Request('http://localhost/user/packages'))

      expect(response.status).toBe(401)
    })

    it('returns 401 with invalid auth token', async () => {
      const app = createConnectorApp(TEST_TOKEN)

      const response = await app.fetch(
        new Request('http://localhost/user/packages', {
          headers: { Authorization: 'Bearer wrong-token' },
        }),
      )

      expect(response.status).toBe(401)
    })
  })

  describe('GET /user/orgs', () => {
    it('returns 401 without auth token', async () => {
      const app = createConnectorApp(TEST_TOKEN)

      const response = await app.fetch(new Request('http://localhost/user/orgs'))

      expect(response.status).toBe(401)
    })

    it('returns 401 with invalid auth token', async () => {
      const app = createConnectorApp(TEST_TOKEN)

      const response = await app.fetch(
        new Request('http://localhost/user/orgs', {
          headers: { Authorization: 'Bearer wrong-token' },
        }),
      )

      expect(response.status).toBe(401)
    })
  })
})
