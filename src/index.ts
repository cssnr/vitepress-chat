import { h } from 'vue'
import ChatButton from './ChatButton.vue'

export { ChatButton }

export interface ChatOptions {
  api: string
  headers?: Record<string, string>
  buttonText?: string
  headerText?: string | null
  headerUrl?: string | null
  initialMessage?: string | null
  filePath?: string
}

export default function chat(layout: any, options: ChatOptions) {
  return {
    Layout: () => [h(layout.Layout ?? layout), h(ChatButton, options)],
  }
}
