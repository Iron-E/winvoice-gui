# winvoice-gui

See also the [`winvoice-server` docs](https://github.com/Iron-E/winvoice-server/blob/master/README.Docker.md).

## `docker`

A [Dockerfile](./Dockerfile) is provided to run the application in an isolated environment. A database is not included in the image, but is required to start the server.

### Build

Run the following command:

```sh
docker build [--build-arg <arg>=<value> ...] [--tag <tag>] .
```

For example:

```sh
docker build --build-arg RUST_VERSION=1.75.0 --tag winvoice-server:latest .
```

#### Arguments

| Name  | Default | Description                  |
| :--   | :--     | :--                          |
| `GID` | `10001` | The ID of the created group. |
| `UID` | `$GID`  | The ID of the created user.  |

### Usage

After building, run:

```sh
docker run -p <port> <image-name> [<winvoice-server-arg> ...]
```

For example, to print help info, do:

```sh
docker run -p 3000 \
	-t \ # tty
	--rm \ # remove after executing
	<image-name> \
	help # run `winvoice-server help`
```

## `docker compose`

A [compose file](./compose.yaml) is provided to run the application. A postgres image is included in the configuration.

### Build

Run the following command:

```sh
docker compose up
```
