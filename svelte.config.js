import adapter from '@sveltejs/adapter-static'

const dev = process.argv.includes('dev')
const relative = process.env.REPRO_RELATIVE === '1'

console.table({ dev, relative })

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    paths: {
      base: dev ? '' : '/build',
      relative,
    },
  },
}

export default config
