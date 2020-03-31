import { IexSettings, _iexEnvs, _iexVersions, IexEnv, IexVersion } from './types'

function validateSettings (settings: IexSettings): void {
  const validateToken = (token: string ) => {
    if (typeof token !== 'string' && !(token as any instanceof String)) throw Error('You must pass a token as string')
    if (!token.startsWith('Tpk_') && !token.startsWith('pk_')) throw Error('Invalid token, did you might pass a secret token?')
  }

  const validateEnv = (env: IexEnv) => {
    if (env && !_iexEnvs.includes(env)) throw Error('Invalid env')
  }

  const validateVersion = (version: IexVersion) => {
    if (version && !_iexVersions.includes(version)) throw Error('Invalid version')
  }

  validateToken(settings.token)
  validateEnv(settings.env as IexEnv)
  validateVersion(settings.version as IexVersion)

  if (settings.token.startsWith('Tpk_') && !settings.env) settings.env = 'sandbox'
  else if (settings.token.startsWith('pk_') && !settings.env) settings.env = 'cloud'

  if (!settings.version) settings.version = 'stable'
}

export { validateSettings }
