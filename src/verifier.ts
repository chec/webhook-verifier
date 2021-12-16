/**
 * Chec webhook verifier
 *
 * Copyright (c) 2021, Chec/Commerce.js
 * Released under the BSD-3-Clause license (see LICENSE.md).
 */

import {VerificationError} from './errors';
import * as crypto from 'crypto';

interface Payload {
  signature?: string,
  created: number,
}

export function verifyWebhook(data: Payload, signingKey: string, maxAgeSeconds: number = 300): void {
  if (typeof data !== 'object') {
    throw new VerificationError('The provided payload is not an object.');
  }

  // Extract the signature
  const { signature } = data;
  delete data.signature;

  // Ensure we have a signature
  if (!signature || !signature.length) {
    throw new VerificationError('Signature was not found in payload.');
  }

  // Ensure we have a signing key
  if (!signingKey || !signingKey.length) {
    throw new VerificationError('Signing key was not provided.');
  }

  // Ensure the signature is valid
  const expectedSignature = crypto.createHmac('sha256', signingKey)
    .update(JSON.stringify(data))
    .digest('hex');
  if (expectedSignature !== signature) {
    throw new VerificationError('Signature mismatch.');
  }

  // Check age of request
  const then = new Date(data.created * 1000);
  const now = new Date();
  if (+then < (+now - maxAgeSeconds * 1000)) {
    throw new VerificationError('Request was made too far in the past.');
  }
}
