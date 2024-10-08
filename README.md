# firefly-iii-webhooks
![GitHub License](https://img.shields.io/github/license/vargash/firefly-iii-webhooks)
[![Node.js CI](https://github.com/vargash/firefly-iii-webhooks/actions/workflows/build.yml/badge.svg)](https://github.com/vargash/firefly-iii-webhooks/actions/workflows/build.yml)

A simple NodeJS server to receive Firefly III Webhooks

The server currently manage a `transaction:create` webhook, and is used to juggle transaction's `date`, `book_date` and `payment_date`.
It may evolve in the future, based on new necessities for Firefly III automations.


## Installation

If you are using Docker:
Simply instantiate a new container from the `latest` version of the image 
```
docker pull ghcr.io/vargash/firefly-iii-webhooks:latest
```

If you want to run directly on your host machine:
1) Install latest version of NodeJS
2) Clone the repo
3) Place yourself in the project root
4) Run the application
```
node app.js
```

## Usage

The server requires two environment variables in order to properly run:
- `FIREFLY_HOST`: the url of your Firefly III instance (in the format `scheme://host:port`, used to invoke the proper API to update Firefly III items
- `FIREFLY_BEARER_TOKEN`: a Firefly III Personal Access Token, used to authenticate with your instance's API. See [Firefly III Docs](https://docs.firefly-iii.org/firefly-iii/api/#personal-access-token) to learn how to generate one.
