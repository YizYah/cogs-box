import {Configuration} from '../configuration'
import {CONFIG_FILE} from '../CONFIG_FILE'

const fs = require('fs-extra')
const yaml = require('js-yaml')

export async function setConfig(templateDir: string, config: Configuration) {
  const configFile = templateDir + '/' + CONFIG_FILE
  try {
    if (config) await fs.outputFile(configFile, yaml.dump(config))
  } catch (error) {
    throw new Error(`error finding the config file ${configFile}.
It may be that the template location is faulty, or that the file does not exist
or is not properly set up:
${error}`)
  }
}
