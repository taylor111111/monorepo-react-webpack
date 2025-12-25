# A Monorepo Modular React App powered by Webpack code splitting and Yarn Workspaces

> This project gives you an option of how to configure a monorepo for a modular React App and use webpack to generate a single chunk for each package.

Feel free to ask and make PR's 👍

## Tech Stack
* React 18.2.0
* Webpack 5.78.0
* Yarn (and yarn workspaces)

## Requirements
* Node v16.20.1
* Yarn v1.22.19

## Packages
* `app-d`, and `app-e`: These two packages are like business modules. You can dev and run them standalone but in the production they are instantiated by the `root-app`;
* `base-config`: A shared module that provides tooling and general config.


## Setup
```
$ yarn install
```

## Building

```
$ sh scripts/build.sh
```


## Running `App-D` and `App-E` standalone
You can run the business modules standalone in dev mode.
```
$ cd packages/app-d
$ yarn start
```
> Live reloading is enabled

## Keep in mind
  * `Yarn Workspaces` is the key that makes the development experience better:
    * You can keep the root `package.json` free of dependencies. Eventually, you can put some global tools there like Lerna but those shared dev dependencies like webpack go inside the `base-config` package.
    * Yarn workspaces will take care about making the `base-config` binaries accessible inside the packages that depend on it;
    * Almost all dependencies will be hosted inside the root _node_modules_ saving a lot of disk space and internet connection.
  * `Webpack` enables you to do whatever you want with your bundling as we've done here:
    * Generating 1 chunk file per package.
    * The chunks filename remains the same unless its source code changes. So we're taking advantage of the browser's cache. Courtesy of webpack's `contenthash` feature;
    * You can share common dependencies like `react` in a vendor bundle keeping your components chunks small and avoiding duplicated code;
    * The vendor package is not splitted because it's just a demo. A good way of split it is making dozens of small chunks in case your http-server is powered by HTTP/2.


## Monorepo Structure

- apps/      # 可运行、可部署的应用（不放可复用业务）
- packages/  # 可复用能力（domain / ui / infra / utils）
- tooling/   # 构建系统 & 工程工具（webpack / CRA / lint）
