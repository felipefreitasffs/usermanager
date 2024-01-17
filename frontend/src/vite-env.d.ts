/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_BASE_API_URL: string
  readonly VITE_KC_CLIENT_ID: string
  readonly VITE_KC_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}