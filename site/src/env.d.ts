/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Cloudflare D1 Database type
declare interface D1Database {
  prepare(query: string): D1PreparedStatement;
  dump(): Promise<ArrayBuffer>;
  batch<T>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<D1ExecResult>;
}

declare interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  first<T>(colName?: string): Promise<T | null>;
  run<T>(): Promise<D1Result<T>>;
  all<T>(): Promise<D1Result<T>>;
  raw<T>(): Promise<T[]>;
}

declare interface D1Result<T> {
  results: T[];
  success: boolean;
  error?: string;
  meta: {
    duration: number;
    last_row_id: number | null;
    changes: number;
    served_by: string;
    internal_stats: any;
  };
}

declare interface D1ExecResult {
  count: number;
  duration: number;
}

// Extend ImportMetaEnv for Cloudflare bindings
declare namespace App {
  interface Locals {
    runtime: {
      env: {
        DB: D1Database;
      };
    };
  }
}
