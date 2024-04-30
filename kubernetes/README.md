# winvoice-gui

An example kubernetes configuration is provided to run the application. A postgres image is included in the configuration.

## Requirements

* `cloudnative-pg`
* `kubectl`

> [!TIP]
>
> There is a nix [flake] which can install the above for you. Simply run `nix develop` inside this repository.

Follow [this guide](https://github.com/Iron-E/winvoice-server/blob/v0.6.4/kubernetes/README.md) to set up kubernetes for `winvoice-server` v0.6.4 if you haven't already.

> [!TIP]
>
> You don't have to clone the `winvoice-server` repo to follow the above instructions: `kubectl apply -f` will accept links to remote files.

Then, if you don't already have the `winvoice-gui:0.2.0` docker image, follow [this guide](../README.Docker.md) as well.

> [!IMPORTANT]
>
> If you are using `kind` (included in the [flake]), there are a few extra steps:
>
> ```sh
> kind load docker-image --name winvoice winvoice-gui:0.2.0
> ```
>
> This will bring `winvoice-gui:0.2.0` into the scope for your `kind` cluster.

## Build

Apply the configuration:

```sh
ktl apply -Rf gui/
```

[flake]: ../flake.nix
