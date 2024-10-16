import { SignatureOptions } from "arweave/web/lib/crypto/crypto-interface";
import type Transaction from "arweave/web/lib/transaction";
import { PermissionType } from "./permissions";

/**
 * The "window.arweaveWallet" API
 */
export interface ArweaveWalletApi {
  /**
   * Name of the wallet the API was provided by.
   */
  walletName?: string;

  /**
   * Connect to the wallet and request permissions. This function can always be
   * called again if you want to request more permissions for your site.
   *
   * @param permissions
   * @param appInfo
   */
  connect(
    permissions: PermissionType[],
    appInfo?: AppInfo,
    gateway?: GatewayConfig
  ): Promise<void>;

  /**
   * Disconnect from the wallet. Removes all permissions from your site.
   */
  disconnect(): Promise<void>;

  /**
   * Get the currently used wallet's address in the extension.
   *
   * @returns Promise of wallet address string
   */
  getActiveAddress(): Promise<string>;

  /**
   * Get all addresses added to the wallet
   *
   * @returns Promise of a list of the added wallets' addresses.
   */
  getAllAddresses(): Promise<string[]>;

  /**
   * Get wallet names for addresses.
   *
   * @returns Promise of an object with addresses and wallet names
   */
  getWalletNames?(): Promise<{ [addr: string]: string }>;

  /**
   * Sign a transaction.
   *
   * @param transaction A valid Arweave transaction without a wallet keyfile added to it
   * @param options Arweave signing options
   *
   * @returns Promise of a signed transaction instance
   */
  sign(
    transaction: Transaction,
    options?: SignatureOptions
  ): Promise<Transaction>;

  /**
   * Get the permissions allowed for you site by the user.
   *
   * @returns Promise of a list of permissions allowed for your dApp.
   */
  getPermissions(): Promise<PermissionType[]>;

  /**
   * Encrypt data, using the user's wallet.
   *
   * @param data `BufferSource` data to encrypt
   * @param options Encrypt algorithm
   *
   * This is an implementation of the [webcrypto encrypt API](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt).
   *
   * @returns Promise of the encrypted data
   */
  encrypt?(
    data: BufferSource,
    algorithm: RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams
  ): Promise<Uint8Array>;

  /**
   * Decrypt data encrypted with the user's wallet.
   *
   * @param data `BufferSource` data to decrypt
   * @param options Decrypt algorithm
   *
   * This is an implementation of the [webcrypto decrypt API](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt).
   *
   * @returns Promise of the decrypted data
   */
  decrypt?(
    data: BufferSource,
    algorithm: RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams
  ): Promise<Uint8Array>;

  /**
   * Get the user's custom Arweave config set in the extension
   *
   * @returns Promise of the user's Arweave config
   */
  getArweaveConfig?(): Promise<{
    host: string;
    port: number;
    protocol: "http" | "https";
  }>;

  /**
   * Get the signature for data array
   *
   * @param data `Uint8Array` data to get the signature for
   * @param algorithm
   *
   * @returns Promise of signature
   */
  signature?(
    data: Uint8Array,
    // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign#parameters
    algorithm: AlgorithmIdentifier | RsaPssParams | EcdsaParams
  ): Promise<Uint8Array>;

  /**
   * Get the user's active public key, from their wallet
   *
   * @returns Promise of the active public key
   */
  getActivePublicKey?(): Promise<string>;

  /**
   * Dispatch an Arweave transaction (preferably bundled)
   *
   * @param transaction Transaction to dispatch
   * @returns Dispatched transaction ID and type
   */
  dispatch?(transaction: Transaction): Promise<DispatchResult>;
}

/**
 * Dispatch function result
 */
export interface DispatchResult {
  id: string;
  type?: "BASE" | "BUNDLED";
}

/**
 * Application info
 */
export interface AppInfo {
  name?: string;
  logo?: string;
}

/**
 * Arweave gateway configuration
 */
export interface GatewayConfig {
  host: string;
  port: number;
  protocol: "http" | "https";
}
