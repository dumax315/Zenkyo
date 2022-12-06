# Vite Plugin Favicon

All notable changes to this project will be documented in this file.

## 1.1.4 - 2021.11.13
### Fixed
* Fixed `outputPath` if the Vite `base` config is set

## 1.1.3 - 2021.11.13
### Changed
* The `outputPath` config setting is now relative to the Vite assets directory, fixing the paths in the generated `webapp.html`

## 1.1.2 - 2021.11.12
### Changed
* Un-deprecated the `outputPath` config setting, to allow you to specify where the output assets are saved, relative to the Vite output directory

## 1.1.1 - 2021.11.11
### Fixed
* Output the generated images without a hash in the names

## 1.1.0 - 2021.11.06
### Added
* Added the ability to set `inject: false` in the passed in plugin config, to generate the `webapp.html` file ([#2](https://github.com/josh-hemphill/vite-plugin-favicon/pull/2))

### Fixed
* Fixed an issue where it doesn't work in dev mode ([#1](https://github.com/josh-hemphill/vite-plugin-favicon/issues/1))

## [1.0.8](https://github.com/josh-hemphill/vite-plugin-favicon/compare/v1.0.7...v1.0.8) (2021-05-13)

### Bug Fixes

* :bug: don't fail on missing options ([e19a01e](https://github.com/josh-hemphill/vite-plugin-favicon/commit/e19a01ed7fe84bba040f88cc260b479e4d276c94))

## [1.0.7](https://github.com/josh-hemphill/vite-plugin-favicon/compare/v1.0.6...v1.0.7) (2021-05-06)


### Bug Fixes

* :bug: files html refs were not being updated ([7c9c534](https://github.com/josh-hemphill/vite-plugin-favicon/commit/7c9c5348aa2cdd873ac622daee6fc95f0c868645))

## [1.0.6](https://github.com/josh-hemphill/vite-plugin-favicon/compare/v1.0.5...v1.0.6) (2021-05-05)


### Bug Fixes

* :bug: favicons-webpack-plugin config compat ([f148f16](https://github.com/josh-hemphill/vite-plugin-favicon/commit/f148f16ba8e70938ce225053784e54afd0745024))

## [1.0.5](https://github.com/josh-hemphill/vite-plugin-favicon/compare/v1.0.4...v1.0.5) (2021-05-05)

### Bug Fixes

  * :bug: fix spelling of config ([81339dc](https://github.com/josh-hemphill/vite-plugin-favicon/commit/81339dc29838b90b7b2e280c40420daba9ec233d))

## [1.0.4](https://github.com/josh-hemphill/vite-plugin-favicon/compare/v1.0.3...v1.0.4) (2021-05-05)

### Bug Fixes

  * :bug: Fix types inclusion ([643eedc](https://github.com/josh-hemphill/vite-plugin-favicon/commit/643eedc1944abc73c05d371869eb60c493142fdb))

## [1.0.3](https://github.com/josh-hemphill/vite-plugin-favicon/compare/v1.0.2...v1.0.3) (2021-05-05)

### Bug Fixes

  * :bug: fix external type inclusion ([c75c979](https://github.com/josh-hemphill/vite-plugin-favicon/commit/c75c979c192126fffd3a46dc98a60e265eb3972b))

## [1.0.2](https://github.com/josh-hemphill/vite-plugin-favicon/compare/v1.0.1...v1.0.2) (2021-05-05)

### Bug Fixes

  * :bug: fix publish ci and description ([d425edd](https://github.com/josh-hemphill/vite-plugin-favicon/commit/d425edd85ceab784da6d3bc5967c0cc9e1a30af5))

## [1.0.1](https://github.com/josh-hemphill/vite-plugin-favicon/compare/v1.0.0...v1.0.1) (2021-05-05)

### Bug Fixes

  * fix ci script ([0a83111](https://github.com/josh-hemphill/vite-plugin-favicon/commit/0a831116640aa2ce15ce78de7151873c24b87870))

# 1.0.0 (2021-05-04)

### Features

  * :sparkles: Intial commit ([ff5b5a0](https://github.com/josh-hemphill/vite-plugin-favicon/commit/ff5b5a0d64b073f36c5a1e767de25e58b373453c))
