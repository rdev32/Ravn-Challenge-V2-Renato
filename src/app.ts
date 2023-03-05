import express, { type Application } from 'express'
import { serve, setup } from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'

import authRouter from './routes/auth.routes'
import clientRouter from './routes/client.routes'
import managerRouter from './routes/manager.routes'
import options from './config/swagger'

const app: Application = express()
app.set('port', process.env.PORT || 5000)

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/docs', serve, setup(swaggerJsdoc(options)))

app.use('/api', authRouter)
app.use('/api', clientRouter)
app.use('/api', managerRouter)

export default app