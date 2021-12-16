import { verifyWebhook } from '../src';
import { VerificationError } from '../src/errors';
import * as crypto from 'crypto';

describe('verifyWebhook', () => {
  it('throws an error when the payload is not an object', () => {
    function verify() {
      // @ts-ignore
      verifyWebhook('', 'bar');
    }
    expect(verify).toThrowError(VerificationError);
    expect(verify).toThrowError('The provided payload is not an object.');
  });

  it('throws an error when the signature is missing', () => {
    function verify() {
      verifyWebhook({signature: '', created: 1}, 'bar');
    }
    expect(verify).toThrowError(VerificationError);
    expect(verify).toThrowError('Signature was not found in payload.');
  });

  it('throws an error when the signing key is missing', () => {
    function verify() {
      verifyWebhook({signature: 'foo', created: 1}, '');
    }
    expect(verify).toThrowError(VerificationError);
    expect(verify).toThrowError('Signing key was not provided.');
  });

  it('throws an error when the signing doesn\'t match', () => {
    function verify() {
      verifyWebhook({signature: 'foo', created: 1}, 'bar');
    }
    expect(verify).toThrowError(VerificationError);
    expect(verify).toThrowError('Signature mismatch.');
  });

  it('throws an error when the request is too old', () => {
    function verify() {
      verifyWebhook({
        // crypto.createHmac('sha256', 'foobar123').update(JSON.stringify({ created: 1 })).digest('hex')
        signature: '2ff2f86fb32dc5c5478749e0173affa2d450436e1eaff7e96f0c8db3a5935264',
        created: 1,
      }, 'foobar123');
    }
    expect(verify).toThrowError(VerificationError);
    expect(verify).toThrowError('Request was made too far in the past.');
  });

  it('verifies a valid payload', () => {
    const originalPayload = {
      created: +new Date() * 1000,
    };
    const signature = crypto.createHmac('sha256', 'foobar123')
      .update(JSON.stringify(originalPayload))
      .digest('hex');

    expect(() => {
      verifyWebhook({
        ...originalPayload,
        signature: signature,
      }, 'foobar123');
    }).not.toThrow();
  });
});
