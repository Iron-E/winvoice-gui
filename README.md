# winvoice-gui

`winvoice-gui` is a front-end for [`winvoice-server`](https://github.com/Iron-E/winvoice-server), written in TypeScript with React. It allows graphical management of invoices for any number of clients.

<details>
	<summary>Screenshots</summary>
	<img src="https://github.com/Iron-E/winvoice-gui/assets/36409591/eaec9ab5-e307-40e9-9211-2f62b01b4325" alt="create-new-timesheet">
	<img src="https://github.com/Iron-E/winvoice-gui/assets/36409591/c4b77450-a299-424d-96df-55214e82b03e" alt="search-for-users">
	<img src="https://github.com/Iron-E/winvoice-gui/assets/36409591/465163e3-c3c1-48a5-b93a-74dea7639e5a" alt="department-table">
</details>

## Features

* Manage jobs, timesheets, and expenses. Amount owed is automatically calculated when a job is exported.
    * Powerful searching capable of performing simple and advanced queries.
* Text may contain any [markdown](https://commonmark.org/help/) syntax.
* Designed from the ground up to support international environments.
	* Timezones are automatically converted and accounted for when creating and searching for records.
	* Currencies are automatically managed by the location of the client— but you can request jobs be exported in any currency tracked by the [ECB](https://www.ecb.europa.eu/).
* Robust permissions allocation, provided from [`winvoice-server`][server]. Don't worry about an intern editing critical historical information.
* May be used locally by freelancers, or deployed on a server for organization-wide access.

## Setup

### Requirements

* [npm][npm]
* [`winvoice-server`][server] is installed and configured.

### Instructions

#### For Local/Personal Use (`localhost`)

> **Note**
>
> Requires [`mkcert`][mkcert], unless you are familiar with the process of setting up a local trust authority yourself.

##### 1. Setting up a local Trust Authority

First, it is necessary to create a local trust authority so that [`winvoice-server`][server] can operate using HTTPS. If you are familiar with how to do this, or have already done so in the past, you can skip this step. Otherwise, [`mkcert`][mkcert] can be used.

Issue the following commands in any shell environment where [`mkcert`][mkcert].

```sh
mkcert -install
mkcert -key-file key.pem -cert-file cert.pem localhost "127.0.0.1" "::1"
```

This will allow you to run [`winvoice-server`][server], as it requires the `-c` and `-k` arguments which specify the locations of the "cert.pem" and "key.pem" files (respectively) that have just been created.

##### 2. Run [`winvoice-server`][server]

The `winvoice-server help` command should help guide you through this process. An **example** of what the final command may look like is:

```sh
winvoice-server \
    -c cert.pem -k key.pem \
    -l trace \
    -O 'http://localhost:3001' \
    -M model.conf -p policy.csv \
    postgres -d <DATABASE_NAME> -H <DATABASE_HOST> -u <USERNAME> -p <PASSWORD> # If you're unsure, `-H` is probably `localhost`.
```

This will bind [`winvoice-server`][server] to [localhost](https://localhost:3000).

##### 3. Build `winvoice-gui`

To do this, simply enter a shell environment where [`npm`][npm] is available and run:

```sh
npm run build # if this produces an error, please search the issues for a duplicate, or report it if there is none
npm run start -- -p <PORT> # you probably want '3001', since winvoice-server is on 3000
```

Then, go into your browser and enter the URL it displays to you:

![example-npm-start](https://github.com/Iron-E/winvoice-gui/assets/36409591/a9caf953-b09f-44da-8968-82d9db06d680)

In this case, [localhost](https://localhost:3001) (click this link to go there).

#### For Organizational/Remote Use

Setup instructions for organizational use are quite similar to those for personal use (covered just above), except that the address that [`winvoice-gui`](https://github.com/Iron-E/winvoice-server) is bound to must be publicly accessible (or at least, privately accessible). Instructions for how to do that are found [here](https://nextjs.org/docs/app/building-your-application/deploying).

## Usage 

### Requirements

* A browser ([`LibreWolf`](https://librewolf.net) / FireFox recommended)

[npm]: https://www.npmjs.com/
[server]: https://github.com/Iron-E/winvoice-server
[mkcert]: https://github.com/FiloSottile/mkcert
