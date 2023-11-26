# firefly-iii-webhooks
![GitHub License](https://img.shields.io/github/license/vargash/firefly-iii-webhooks)
[![GitHub Workflow](https://github.com/vargash/firefly-iii-webhooks/actions/workflows/docker-image.yml/badge.svg?branch=main)](https://github.com/vargash/firefly-iii-webhooks/actions/workflows/docker-image.yml)

A simple NodeJS server to receive Firefly III Webhooks

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
