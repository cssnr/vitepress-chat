# Chat Server

<div class="badges">

[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/chat-server?logo=github)](https://github.com/cssnr/chat-server/releases/latest)
[![GHCR Latest](https://badges.cssnr.com/ghcr/tags/cssnr/chat-server/latest?label=ghcr)](https://github.com/cssnr/chat-server/pkgs/container/chat-server)
[![Docker Hub Latest](https://img.shields.io/docker/v/cssnr/chat-server?sort=semver&logo=docker&logoColor=white&label=hub)](https://hub.docker.com/r/cssnr/chat-server)
[![GHCR Size](https://badges.cssnr.com/ghcr/size/cssnr/chat-server?label=ghcr)](https://github.com/cssnr/chat-server/pkgs/container/chat-server)
[![Docker Hub Size](https://img.shields.io/docker/image-size/cssnr/chat-server?logo=docker&logoColor=white&label=hub)](https://hub.docker.com/r/cssnr/chat-server)
[![Deployment Docker](https://img.shields.io/github/deployments/cssnr/chat-server/docker?logo=docker&logoColor=white&label=docker)](https://github.com/cssnr/chat-server/deployments/docker)
[![Workflow Release](https://img.shields.io/github/actions/workflow/status/cssnr/chat-server/release.yaml?logo=norton&logoColor=white&label=release)](https://github.com/cssnr/chat-server/actions/workflows/release.yaml)
[![Workflow Lint](https://img.shields.io/github/actions/workflow/status/cssnr/chat-server/lint.yaml?logo=norton&logoColor=white&label=lint)](https://github.com/cssnr/chat-server/actions/workflows/lint.yaml)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/cssnr/chat-server?logo=listenhub&label=updated)](https://github.com/cssnr/chat-server/pulse)
[![GitHub Repo Size](https://img.shields.io/github/repo-size/cssnr/chat-server?logo=buffer&label=repo%20size)](https://github.com/cssnr/chat-server?tab=readme-ov-file#readme)
[![GitHub Top Language](https://img.shields.io/github/languages/top/cssnr/chat-server?logo=devbox)](https://github.com/cssnr/chat-server?tab=readme-ov-file#readme)
[![GitHub Contributors](https://img.shields.io/github/contributors-anon/cssnr/chat-server?logo=southwestairlines)](https://github.com/cssnr/chat-server/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues/cssnr/chat-server?logo=codeforces&logoColor=white)](https://github.com/cssnr/chat-server/issues)
[![GitHub Discussions](https://img.shields.io/github/discussions/cssnr/chat-server?logo=theconversation)](https://github.com/cssnr/chat-server/discussions)
[![GitHub Forks](https://img.shields.io/github/forks/cssnr/chat-server?style=flat&logo=forgejo&logoColor=white)](https://github.com/cssnr/chat-server/forks)
[![GitHub Repo Stars](https://img.shields.io/github/stars/cssnr/chat-server?style=flat&logo=gleam&logoColor=white)](https://github.com/cssnr/chat-server/stargazers)

</div>

<a title="Chat Server" href="https://github.com/cssnr/chat-server?tab=readme-ov-file#readme" target="_blank">
<img alt="Chat Server" align="right" width="128" height="auto" src="/images/server.svg"></a>

Proxy Chat Server designed to work with the VitePress Chat plugin.  
Secure your API key while live-streaming responses to the client.

Works out of the box with zero configuration using Docker or Node.

💯 100% Free to use with Zen OpenCode or Gemini Free Tier!

Works with Claude, Gemini, OpenAI, or any [OpenAI Compatible Provider](https://ai-sdk.dev/providers/openai-compatible-providers).

To get started [Setup](#setup) and [Configure](#configure) the server.

⚡ Ask AI with the Chat button in the bottom right...

[[toc]]

### Features

- Works with Claude, OpenAI, Gemini and OpenAI Compatible Providers
- Live Stream Results to Client
- Automatic Input Token Caching
- Automatic Retry on API Failures
- Deploy with Docker or Node
- Supports Multiple Clients Simultaneously
- Plus all the [Client Features](client.md#features)

Built with the [AI SDK](https://ai-sdk.dev/).

## Setup

💡 The server works out-of-the box with NO environment variables.

[![Deploy to Render](https://img.shields.io/badge/Deploy_to_Render-4351E8?style=for-the-badge&logo=render)](https://render.com/deploy?repo=https://github.com/cssnr/chat-server)

With Docker.

```shell
docker run --rm cssnr/chat-server:latest
```

With Docker Compose.

```yaml
services:
  chat:
    image: cssnr/chat-server:latest
    environment:
      MODEL: 'gemini-2.5-flash'
      GOOGLE_GENERATIVE_AI_API_KEY: 'xxx'
```

With Node.

```shell
npm i
npm start
```

_Note: you will need to export your environment variables or set them in the `settings.env` file._

For a Docker Swarm + Traefik + Basic Auth example see the [docker-compose-swarm.yaml](https://github.com/cssnr/chat-server/blob/master/docker-compose-swarm.yaml).

For a Portainer Deploy workflow see the [.github/workflows/deploy.yaml](https://github.com/cssnr/chat-server/blob/master/.github/workflows/deploy.yaml).

### Configure

💡 All variables are optional. The default `big-pickle` model works with NO API Key.

Environment Variables.

| Variable                              | Default                      | Description                         |
| :------------------------------------ | :--------------------------- | :---------------------------------- |
| `MODEL`                               | `big-pickle`                 | Model to Use                        |
| `BASE_URL`                            | `https://opencode.ai/zen/v1` | OpenAI Compatible Provider Base URL |
| [PROVIDER_OPTIONS](#provider-options) | -                            | Provider Options JSON String        |
| `MAX_TOKENS`                          | -                            | Max Output Tokens                   |
| `INSTRUCTIONS`                        | -                            | Fallback System Instructions        |
| `AI_SDK_LOG_WARNINGS`                 | -                            | Disable SDK Warnings                |
| `CORS_ORIGINS`                        | -                            | Allowed CORS Origins (supports \*)  |
| `PORT`                                | `3000`                       | Server Port                         |

You must also set the API key for the `MODEL` you select.

| Variable                       | Description                |
| :----------------------------- | :------------------------- |
| `ANTHROPIC_API_KEY`            | Claude Models              |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini Models              |
| `OPENAI_API_KEY`               | OpenAI Models              |
| `PROVIDER_API_KEY`             | OpenAI Compatible Provider |

The `PROVIDER_API_KEY` is optional for free-tier models like `big-pickle`.

#### PROVIDER_OPTIONS

Provider Options: <https://vercel.com/docs/ai-gateway/models-and-providers/provider-options>

For example, to disable "Reasoning" on `big-pickle` model.

```json
{ "zen": { "thinking": { "type": "disabled" } } }
```

You may need to wrap the variable in single quotes.

```text
PROVIDER_OPTIONS='{"openai":{"serviceTier":"flex","reasoningEffort":"low"}}'
```

You are responsible for providing valid options for the chosen model.
The SDK supports providing provider options for multiple provider simultaneously.
The value is only checked for valid JSON at startup and will fail at runtime if it contains invalid options.

## Client

To send System Instructions from the client, add them to the body.

```typescript
const chat = new Chat({
  transport: new DefaultChatTransport({
    api: 'https://chat-server.cssnr.com/',
    headers: { Authorization: 'Basic Abc123=' },
    body: { system: 'You are a helpful assistant.' },
  }),
})
```

## Development

This works with no configuration using the `big-pickle` model.  
You can set your environment variables in the `settings.env` file.  
If using `big-pickle` for testing it is much faster to disable reasoning.

```text
PROVIDER_OPTIONS='{"zen":{"thinking":{"type":"disabled"}}}'
```

In all cases you can set the `PORT` environment variable.

With Node run.

```shell
npm run dev
```

Point your client to: http://localhost:3000/

With Docker compose _(you may need to `touch settings.env`)_.

```shell
docker compose -f docker-compose-dev.yaml up --watch --build --remove-orphans
```

Point your client to: http://localhost/

### Building

To build and test the docker image run.

```shell
bash build.sh
docker compose up
```

&nbsp;

Source Code: <https://github.com/cssnr/chat-server>
