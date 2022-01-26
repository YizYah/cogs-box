import test from 'ava'
import {getConfig, isValidConfig} from '../../src'

const faultyTemplate = __dirname + '/faultyTemplate'

const validTemplate = __dirname + '/template'

test('isValidConfig', async t => {
    const validConfig = await getConfig(validTemplate)

    const result = isValidConfig(validConfig)
    t.is(result, true);
})

test('isValidConfig throws error', async t => {
    const faultyConfig = await getConfig(faultyTemplate)

    const error = t.throws(() => {
        isValidConfig(faultyConfig)
    })
    
    t.regex(error.message, /Missing name/);
})