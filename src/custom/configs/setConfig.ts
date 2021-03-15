import {Configuration} from '../configuration'
import {CONFIG_FILE} from '../CONFIG_FILE'

const fs = require('fs-extra')
const yaml = require('js-yaml')

export async function setConfig(templateDir: string, config: Configuration) {
  const configFile = templateDir + '/' + CONFIG_FILE
  try {
    if (!await fs.pathExists(templateDir)) throw new Error(`no directory ${templateDir}.  Confirm your template path.`)

    await fs.outputFile(configFile, yaml.dump(config))
  } catch (error) {
    throw new Error(`cannot save the config file ${configFile}:
${error}`)
  }
}
