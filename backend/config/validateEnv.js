const logger = require('./logger')

const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'PORT'
]

const optionalEnvVars = [
  'AZURE_STORAGE_CONNECTION_STRING',
  'AZURE_CONTAINER_NAME',
  'NODE_ENV'
]

const validateEnv = () => {
  const missing = []
  const warnings = []

  // Check required variables
  requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName)
    }
  })

  // Check optional but recommended variables
  optionalEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      warnings.push(varName)
    }
  })

  // Log results
  if (missing.length > 0) {
    logger.error('Missing required environment variables:', missing)
    console.error('\n❌ Missing required environment variables:')
    missing.forEach(v => console.error(`   - ${v}`))
    console.error('\nPlease check your .env file\n')
    process.exit(1)
  }

  if (warnings.length > 0) {
    logger.warn('Missing optional environment variables:', warnings)
    console.warn('\n⚠️  Missing optional environment variables:')
    warnings.forEach(v => console.warn(`   - ${v}`))
    console.warn('Some features may not work properly\n')
  }

  logger.info('Environment validation passed')
  console.log('✅ Environment variables validated\n')
}

module.exports = validateEnv
