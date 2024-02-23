# winvoice-gui

## `docker`

A [Dockerfile](./Dockerfile) is provided to run the application in an isolated environment. A database is not included in the image, but is required to start the server.

### Build

Run the following command:

```sh
docker build [--build-arg <arg>=<value> ...] [--tag <tag>] .
```

For example:

```sh
docker build --build-arg GID=100 --tag winvoice-gui:latest .
```

#### Arguments

| Name  | Default | Description                  |
| :--   | :--     | :--                          |
| `GID` | `10001` | The ID of the created group. |
| `UID` | `$GID`  | The ID of the created user.  |

### Usage

> [!WARN]
>
> `winvoice-gui` is built with Next.js, which uses HTTP. It is recommended to:
>
> 1. never use `docker run --publish` with `winvoice-gui` images, and
> 2. use a reverse proxy to enable HTTPS.
>
> The `docker compose` integration provides an example of such an HTTPS proxy.
>
> See also: https://github.com/vercel/next.js/discussions/10935

After building, run:

```sh
docker run --expose 3000 --rm <image-name>
```

## `docker compose`

A [compose file](./compose.yaml) is provided to run the application. A `postgres` image is included in the configuration.

> [!NOTE]
>
> See also the docs for:
>
> * [`nginx-proxy`]
> * [`winvoice-server`]

> [!IMPORTANT]
>
> The compose file requires `COMPOSE_EXPERIMENTAL_GIT_REMOTE=1` in the environment. It is possible to remove this requirement by manually merging `winvoice-server`'s compose file.

### Build

Run the following command:

```sh
docker compose up
```

[`winvoice-server`]: https://github.com/The-E/winvoice-server/blob/master/README.Docker.md
[`nginx-proxy`]: https://github.com/nginx-proxy/nginx-proxy/blob/main/docs/README.md
