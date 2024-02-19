# winvoice-gui

## Build

Run the following command:

```sh
docker build [--build-arg <arg>=<value> ...] [--tag <tag>] .
```

For example:

```sh
docker build --build-arg PORT=3001 --tag winvoice-gui:latest .
```

#### Arguments

| Name   | Default | Description                        |
| :--    | :--     | :--                                |
| `GID`  | `1001`  | The ID of the created group.       |
| `PORT` | `3001`  | The port the server will listen to |
| `UID`  | `$GID`  | The ID of the created user.        |

#### Environment Variables

## Usage

After building, run:

```sh
docker run <image-name>
```
