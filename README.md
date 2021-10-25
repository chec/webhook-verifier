# Webhook verifier

A lightweight JavaScript tool for verifying the validity of incoming webhook payloads from the Chec API. This script
is designed to run in a Node.js context, e.g. a serverless function/Lambda.

## Installation

```
npm install @chec/webhook-verifier
# or
yarn add @chec/webhook-verifier
```

## Configuration

Define the following in your `.env` or environment file:

* `CHEC_WEBHOOK_SIGNING_KEY`: the signing key for your account, available in the Webhooks section of the Chec Dashboard

## Usage

Import `verifyWebhook` and use it at the start of your handler method:

```js
import { verifyWebhook } from '@chec/webhook-verifier';

module.exports = function (request) {
    verifyWebhook(request, process.env.CHEC_WEBHOOK_SIGNING_KEY);
    
    // ... continue with your logic
}
```

The `verifyWebhook` method will throw an error if any checks fail:
* The webhook signature was invalid
* The request is older than 5 minutes

## License

This repository is available under a [BSD-3-Clause license](./LICENSE.md).
