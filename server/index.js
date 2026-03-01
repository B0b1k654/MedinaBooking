import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = Number(process.env.PORT || 3001)
const dataDir = path.resolve(__dirname, '../data')
const dbPath = path.join(dataDir, 'users.json')

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({ users: [], lastId: 0 }, null, 2))
}

function readDb() {
  const raw = fs.readFileSync(dbPath, 'utf-8')
  return JSON.parse(raw)
}

function writeDb(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
  })
  res.end(JSON.stringify(payload))
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

function verifyPassword(password, fullHash) {
  const [salt, storedHash] = fullHash.split(':')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(storedHash, 'hex'))
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        reject(new Error('Некорректный JSON в запросе.'))
      }
    })
    req.on('error', reject)
  })
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 204, {})
  }

  if (req.method === 'GET' && req.url === '/api/health') {
    return sendJson(res, 200, { ok: true })
  }

  if (req.method === 'POST' && req.url === '/api/auth/register') {
    try {
      const body = await parseBody(req)
      const name = String(body.name || '').trim()
      const email = String(body.email || '').trim().toLowerCase()
      const password = String(body.password || '')

      if (!name || !email || !password) {
        return sendJson(res, 400, { message: 'Заполните имя, email и пароль.' })
      }

      if (password.length < 6) {
        return sendJson(res, 400, { message: 'Пароль должен быть не короче 6 символов.' })
      }

      const db = readDb()
      const exists = db.users.find((user) => user.email === email)

      if (exists) {
        return sendJson(res, 409, { message: 'Пользователь с таким email уже существует.' })
      }

      const newUser = {
        id: db.lastId + 1,
        name,
        email,
        passwordHash: hashPassword(password),
        createdAt: new Date().toISOString()
      }

      db.lastId = newUser.id
      db.users.push(newUser)
      writeDb(db)

      return sendJson(res, 201, {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email
        }
      })
    } catch (error) {
      return sendJson(res, 400, {
        message: error instanceof Error ? error.message : 'Ошибка регистрации.'
      })
    }
  }

  if (req.method === 'POST' && req.url === '/api/auth/login') {
    try {
      const body = await parseBody(req)
      const email = String(body.email || '').trim().toLowerCase()
      const password = String(body.password || '')

      if (!email || !password) {
        return sendJson(res, 400, { message: 'Укажите email и пароль.' })
      }

      const db = readDb()
      const user = db.users.find((candidate) => candidate.email === email)

      if (!user || !verifyPassword(password, user.passwordHash)) {
        return sendJson(res, 401, { message: 'Неверный email или пароль.' })
      }

      return sendJson(res, 200, {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      })
    } catch (error) {
      return sendJson(res, 400, {
        message: error instanceof Error ? error.message : 'Ошибка входа.'
      })
    }
  }

  return sendJson(res, 404, { message: 'Маршрут не найден.' })
})

server.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`)
})