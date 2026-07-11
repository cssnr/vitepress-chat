import { h, type Component } from 'vue'
import ChatButton from './ChatButton.vue'

export { ChatButton }

export interface ChatOptions {
  api: string
  headers?: Record<string, string>
  buttonText?: string
  headerText?: string | null
  headerUrl?: string | null
  initialMessage?: string | null
  aiName?: string | null
  userName?: string | null
  placeholder?: string | null
  filePath?: string
  showReasoning?: boolean
  chatHeader?: Component
  chatFooter?: Component
}

export default function chat(layout: any, options: ChatOptions) {
  return {
    Layout: () => [h(layout.Layout ?? layout), h(ChatButton, options)],
  }
}
