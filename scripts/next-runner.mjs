import { spawn } from 'node:child_process'
import { join } from 'node:path'

const command = process.argv[2] ?? 'dev'
const nextCli = join(process.cwd(), 'node_modules', 'next', 'dist', 'bin', 'next')
const wasmDirectory = join(process.cwd(), 'node_modules', '@next', 'swc-wasm-nodejs')
const useWebpack = command === 'dev' || command === 'build'
const args = [nextCli, command, ...(useWebpack ? ['--webpack'] : [])]

const child = spawn(process.execPath, args, {
  stdio: 'inherit',
  env: { ...process.env, NEXT_TEST_WASM_DIR: wasmDirectory },
})

child.on('error', (error) => {
  console.error(error)
  process.exit(1)
})

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal)
  else process.exit(code ?? 1)
})
