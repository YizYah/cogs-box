
[//]: # ( ns__file unit: standard, comp: README.md )

[//]: # ( ns__custom_start beginning )

[//]: # ( ns__custom_end beginning )

[//]: # ( ns__start_section intro )

[//]: # ( ns__custom_start description )
interface to config files for geenee projects.

![](src/custom/images/cogs-box.gif)

[//]: # ( ns__custom_end description )

[//]: # ( ns__custom_start afterDescription )

[//]: # ( ns__custom_end afterDescription )

[//]: # ( ns__custom_start badges )

[//]: # ( ns__start_section usageSection )
[![codecov](https://codecov.io/gh/YizYah/gear-box/branch/main/graph/badge.svg?token=DKKAX1C9SG)](https://codecov.io/gh/YizYah/gear-box)

[![Version](https://img.shields.io/npm/v/gear-box.svg)](https://npmjs.org/package/gear-box)
[![Downloads/week](https://img.shields.io/npm/dw/gear-box.svg)](https://npmjs.org/package/gear-box)
[![License](https://img.shields.io/npm/l/gear-box.svg)](https://github.com/YizYah/gear-box/blob/master/package.json)

[![Geenee](https://img.shields.io/badge/maintained%20by-geenee-brightgreen)](https://npmjs.org/package/geenee)
[![Template](https://img.shields.io/badge/template-ts--packrat-blue)](https://npmjs.org/package/ts-packrat)

[//]: # ( ns__custom_end badges )

[//]: # ( ns__end_section intro )


[//]: # ( ns__start_section api )


[//]: # ( ns__custom_start APIIntro )

[//]: # ( ns__custom_start toc )
<!-- toc -->
* [:clipboard: Why](#clipboard-why)
* [:bulb: What](#bulb-what)
* [:wrench: Usage](#wrench-usage)
* [:heavy_exclamation_mark: About Configurations](#heavy_exclamation_mark-about-configurations)
* [:paperclip: Creating Your Config File](#paperclip-Creating-Your-Config-File)
* [:memo: Dirs List](#memo-Dirs-List)
* [:mag: Custom File Filter](#mag-Custom-File-Filter)
* [:pushpin: Other Settings](#pushpin-Other-Settings)
* [:star2: Values in the Config File](#star2-Values-in-the-Config-File)
* [:cyclone: API](#cyclone-api)
<!-- tocstop -->

[//]: # ( ns__custom_end toc )

# <a name="clipboard-why"></a>:clipboard: Why
It's a pain to maintain a [geenee](https://www.npmjs.com/package/geenee) template.

# <a name="bulb-what"></a>:bulb: What
A `Configuration` type, as well as simple `getConfig` and `setConfig` functions to keep them stored in a file.

# <a name="wrench-usage"></a>:wrench: Usage
Add the package:
```
npm i gear-box
```
A config file in [geenee](https://www.npmjs.com/package/geenee) is called `config.yml` and is stored in the root directory of a template.

You can read and write to the file easily:
```
  const templateDir = __dirname + '/template'

  const config = await getConfig(templateDir)

  // read and modify config...

  await setConfig(templateDir, config) // saves the new version
```
# <a name="heavy_exclamation_mark-about-configurations"></a>:heavy_exclamation_mark: About Configurations
![config](src/custom/images/config.gif)

Every template needs a config [YAML](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html) file, which is `$TEMPLATE/config.yml`.

Check out the [one for this package](meta/template/config.yml) for an example.

# <a name="paperclip-Creating-Your-Config-File"></a>:paperclip: Creating Your Config File
Add the following, substituting as appropriate between the less than and greater than signs:

 ```
name: <Template Name>
version: 1.0
category: <Description>
```
For `category`, currently you can put whatever you'd like to describe it.  You could probably put the name of a common Framework if it's relevant.

The category may be used soon for classification in a registry of shared templates.  In theory, is should be possible to switch between templates of a shared type that meet criteria. You may also create switchable templates yourself, which will allow you to switch between various looks or other options.

# <a name="memo-Dirs-List"></a>:memo: Dirs List
You also need to add a list of dirs.  Use this as an example (you only need `custom` unless you also want dynamic components that connect to a server):
```
dirs:
    custom: src/custom
    components: src/components
    queries: src/components/source-props
```
The dirs are all relative to the code base generated by users of your app.
* `components` is where any dynamically generated components will be.
* `static` is a place where static files are generated.
* `custom` is a place where they can put additional custom code.
* `queries` is optional if you will be requiring queries to a backend.

# <a name="mag-Custom-File-Filter"></a>:mag: Custom File Filter
You need to tell `geenee` what files to search for in a code base when testing or generating code. `format.customFileFilter` is a glob pattern.

This example (which is for a TypeScript code base), uses one pattern that captures `ts` and `md` files:
```
format:
  customFileFilter: '*.{ts,tsx,md}'
```
The suffixes shown can be replaced as needed.  So for a Javascript code base, you could put `'.{js}'`.  If you are using `jsx`, you could put `'.{js, jsx}'`.

As with all glob patterns, you can also list multiple patterns:
```
format:
  customFileFilter: '+(*.{ts,tsx,md)|.eslintignore}'
```


You can add other settings as specified below, but if you are following the sequence of steps to create a template you can [return now](Creating-Templates#edit-config-file).


# <a name="pushpin-Other-Settings"></a>:pushpin: Other Settings
To get started, you can copy something like this sample into config.yml and modify as needed:
```
format:
  customFileFilter: '.{js,jsx,md}'

componentTypes:
  creation:
    suffix: CreationForm
    singular: true
  list:
    singular: false
  single:
    singular: true

dataFunctionTypes:
  selectable:
    components:
      - list
      - single
    requiresSource: true
    nodeType: selectable
  constrain:
    components: null
  create:
    components:
      - list
      - single
      - creation
  use:
    components:
      - list
      - single
    requiresSource: true
  property:
    components:
      - list
      - single
```

# <a name="star2-Values-in-the-Config-File"></a>:star2: Values in the Config File

* `componentTypes`
  [More documentation is planned shortly for component types.]

* `dataFunctionTypes`
  [More documentation is planned shortly for data function types types.]
  
# <a name="cyclone-api"></a>:cyclone: API

## Functions
```
getConfig(templateDir: string)
```
Returns a Configuration.  Will return an error if the directory given does not exist, has no `config.yml` file, or has a defective one.

```
setConfig(templateDir: string, config: Configuration)
```
Writes a config file `config.yml` based on `config` to the directory `templateDir`.  

**_WARNING_**: Will simply overwrite an existing `config.yml` file.

Will return an error if the directory does not exist.

## Configuration Interface
You can see the [configuration interface code](src/custom/configuration.ts) for precise information about the exported types.


[//]: # ( ns__custom_end APIIntro )


[//]: # ( ns__custom_start constantsIntro )
[//]: # ( ns__custom_end constantsIntro )



[//]: # ( ns__start_section types )


[//]: # ( ns__end_section types )


[//]: # ( ns__end_section api )

