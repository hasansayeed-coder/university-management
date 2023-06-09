import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

console.log(config.database_url)
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('database connected for university management')

    app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    console.log('FAiled ', err)
  }
}

bootstrap()
