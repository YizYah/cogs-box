import test from 'ava'

import {getConfig} from '../../src'
import {setConfig} from '../../src'
const mockFs = require('mock-fs')

test('check Config', async t => {
  const templateDir = __dirname + '/template'
  const config = await getConfig(templateDir)
  t.is(config.name, 'testConfig')

  let error = await t.throwsAsync(async () => {
    await getConfig(__dirname + 'faultyTemplate')
  })
  t.regex(error.message, /no such file/)



  const mockTemplateDir = '/tmp'
  const nonexistentDir = '/nonexistent'

  mockFs({
    [mockTemplateDir]: mockFs.directory()
  })

  await setConfig(mockTemplateDir, config)
  const config2 = await getConfig(mockTemplateDir)
  t.is(config2.name, 'testConfig')

  error = await t.throwsAsync(async () => {
    const config3 = await getConfig(nonexistentDir)
    })
  t.regex(error.message, /no such file/)

  error = await t.throwsAsync(async () => {
    await setConfig(nonexistentDir, config)
  })
  t.regex(error.message, /no directory/)

  mockFs.restore()
});
