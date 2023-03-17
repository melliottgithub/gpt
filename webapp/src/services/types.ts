export type TranslationRequest = {
  engine: "google" | "aws" | "gpt3",
  text: string
  source_language: string,
  target_language: string
}

export type TranslationResponse = {
  translated_text: string
}

export type GptRequest = {
  action: string,
  text: string
}

export type GptResponse = {
  response: string
}