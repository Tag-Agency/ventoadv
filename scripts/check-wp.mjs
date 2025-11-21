import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const projectRoot = path.resolve(path.dirname(__filename), '..')

function loadEnvValue(key) {
  const candidates = ['.env.local', '.env']
  for (const file of candidates) {
    const fullPath = path.join(projectRoot, file)
    if (!existsSync(fullPath)) continue
    const content = readFileSync(fullPath, 'utf8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const [k, ...rest] = trimmed.split('=')
      if (!k || rest.length === 0) continue
      if (k.trim() === key) {
        return rest.join('=').trim()
      }
    }
  }
  return undefined
}

const fallbackBase = 'https://wp.ventoadv.it/wp-json/wp/v2'
const envBase = process.env.NEXT_PUBLIC_WP_API_URL || loadEnvValue('NEXT_PUBLIC_WP_API_URL')
const apiBase = (envBase || fallbackBase).replace(/\/+$/, '') + '/'
const targetUrl = new URL('posts?per_page=1', apiBase).toString()

async function main() {
  process.stdout.write(`Verifico la connessione verso ${targetUrl} ...\n`)
  try {
    const res = await fetch(targetUrl, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) {
      console.error(`✖ Richiesta fallita (${res.status} ${res.statusText})`)
      process.exit(1)
    }
    const body = await res.json()
    const count = Array.isArray(body) ? body.length : body ? 1 : 0
    console.log(`✔ Collegato a ${apiBase} — elementi ricevuti: ${count}`)
    if (Array.isArray(body) && body[0]) {
      console.log(`  Post di esempio: #${body[0].id} (${body[0].slug})`)
    }
  } catch (error) {
    console.error(`✖ Errore di connessione: ${error.message}`)
    process.exit(1)
  }
}

main()
