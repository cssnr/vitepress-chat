// noinspection JSUnusedGlobalSymbols

import type { Plugin, ResolvedConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { minimatch } from 'minimatch'

export interface InstructionsOptions {
  contentDir?: string // defaults to your VitePress root dir
  exclude?: string[] // globs to exclude from instructions
  filePath?: string // for advanced use only
}

const excludeDirs = new Set(['.vitepress', 'node_modules', '.git'])

export function instructions(options: InstructionsOptions = {}): Plugin {
  const {
    contentDir: contentDirOption,
    exclude = [],
    filePath = 'instructions.txt',
  } = options

  let compiled = ''
  let fileCount = 0
  let config: ResolvedConfig
  let isSsrBuild = false

  function compile() {
    const contentRoot = contentDirOption
      ? path.resolve(config.root, contentDirOption)
      : config.root

    if (!fs.existsSync(contentRoot)) {
      console.warn(`[vitepress-chat] content directory not found: ${contentRoot}`)
      compiled = ''
      fileCount = 0
      return false
    }

    const files = collectMdFiles(contentRoot).filter((file) => {
      const rel = path.relative(contentRoot, file).replace(/\\/g, '/')
      return !exclude.some((pattern) => minimatch(rel, pattern))
    })
    const parts = files.map((file) => {
      const rel = path.relative(contentRoot, file).replace(/\\/g, '/')
      let raw = fs.readFileSync(file, 'utf-8')
      raw = raw.replace(/^---[\s\S]*?---\n*/, '')
      return `# ${rel}\n\n${raw.trim()}`
    })

    compiled = parts.join('\n\n---\n\n')
    fileCount = files.length
    return true
  }

  return {
    name: 'vitepress-chat-instructions',

    config() {
      return { ssr: { noExternal: ['vitepress-chat'] } }
    },

    configResolved(resolved) {
      config = resolved
      isSsrBuild = Boolean(resolved.build.ssr)
      compile()
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next()
        const url = req.url.split('?')[0]
        if (url === '/' + filePath || url === config.base + filePath) {
          compile()
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end(compiled)
          return
        }
        next()
      })
    },

    async closeBundle() {
      if (config.command !== 'build') return
      if (isSsrBuild) return
      const outPath = path.resolve(
        config.root,
        config.build.outDir ?? '.vitepress/dist',
        filePath,
      )
      fs.mkdirSync(path.dirname(outPath), { recursive: true })
      fs.writeFileSync(outPath, compiled, 'utf-8')
      console.log(`[vitepress-chat] wrote ${filePath} (${fileCount} files)`)
    },
  }
}

function collectMdFiles(dir: string): string[] {
  const files: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!excludeDirs.has(entry.name)) {
        files.push(...collectMdFiles(path.join(dir, entry.name)))
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(path.join(dir, entry.name))
    }
  }
  return files
}

export default instructions
