<h1 align="center">Webhook verifier</h1>

<p align="center">
	A lightweight JavaScript tool for verifying the validity of incoming webhook payloads from the Chec API. This script
	is designed to run in a Node.js context, e.g. a serverless function/Lambda.
</p>

<p align="center">
	<a href="https://github.com/chec/webhook-verifier/actions">
		<img src="https://img.shields.io/github/checks-status/chec/webhook-verifier/master" alt="CircleCI" />
	</a>
	<a href="https://npmjs.org/package/@chec/webhook-verifier">
		<img src="https://img.shields.io/npm/v/@chec/webhook-verifier.svg" alt="Version" />
	</a>
	<a href="https://npmjs.org/package/@chec/webhook-verifier">
		<img src="https://img.shields.io/npm/dw/@chec/webhook-verifier.svg" alt="Downloads/week" />
	</a>
	<a href="https://github.com/chec/webhook-verifier/blob/master/package.json">
		<img src="https://img.shields.io/npm/l/@chec/webhook-verifier.svg" alt="License" />
	</a>
	<br>
	<a href="https://commercejs.com">commercejs.com</a> | <a href="https://twitter.com/commercejs">@commercejs</a> | <a href="http://slack.commercejs.com">Slack</a>
</p>


A lightweight JavaScript tool for verifying the validity of incoming webhook payloads from the Chec API. This script
is designed to run in a Node.js context, e.g. a serverless function/Lambda.

## Installation

```
npm install @chec/webhook-verifier
# or
yarn add @chec/webhook-verifier
```

## Usage

Import `verifyWebhook` and use it at the start of your handler method. Provide your Chec webhook signing key as the
second argument (available in your [Chec Dashboard](https://dashboard.chec.io/settings/webhooks)):

```js
import { verifyWebhook } from '@chec/webhook-verifier';

module.exports = function (request) {
    verifyWebhook(request, process.env.CHEC_WEBHOOK_SIGNING_KEY);

    // ... continue with your logic
}
```

The `verifyWebhook` method signature is:
```ts
interface Payload {
    signature?: string,
    created: number,
}

export function verifyWebhook(data: Payload, signingKey: string, maxAgeSeconds: number = 300): void {
    // ...
}
```

The `verifyWebhook` method will throw an error if any checks fail:
* The webhook signature is missing, or the signing key is missing
* The webhook signature was invalid
* The request is older than 5 minutes (by default)

## License

This repository is available under a [BSD-3-Clause license](./LICENSE.md).
