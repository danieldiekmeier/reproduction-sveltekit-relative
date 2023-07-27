# Reproduction: Deploying SvelteKit to a Subfolder

## Update

While this reproduction does show a bug in SvelteKit, it's not like I described below. I actually misconfigured the paths, like s3812497 described here: https://github.com/sveltejs/kit/issues/10358#issuecomment-1654297295

With a fixed config, the problem does not occur.

---

Starting with SvelteKit 1.22.1, using `adapter-static` to deploy to a subfolder no longer works. It seems likely that the change from https://github.com/sveltejs/kit/releases/tag/%40sveltejs%2Fkit%401.22.1 is responsible:

> perf: only have Vite generate relative paths when required

I noticed probably relevant changes in `build/_app/immutable/entry/app.*.js`:

- In 1.22.0, it loaded additional JS chunks from a relative path, like `../chunks/...`
- In 1.22.1, it loads them from `_app/immutable/chunks/...`, which does not work.

[@benmccann suggested](https://github.com/sveltejs/kit/pull/10287#issuecomment-1627709727) that `paths.relative` may fix it, but it doesn't seem like that to me.


## To see that it worked in SvelteKit 1.22.0:

1. `pnpm i && pnpm i @sveltejs/kit@1.22.0 && pnpm build:normal`
2. Go to http://localhost:8080/build/ – No errors in console

## To see that it stopped working in SvelteKit 1.22.1:

1. `pnpm i && pnpm i @sveltejs/kit@1.22.1 && pnpm build:normal`
2. Go to http://localhost:8080/build/ – 404 errors in network inspector


## To see that `paths.relative` does not fix it:

1. `pnpm i && pnpm i @sveltejs/kit@1.22.1 && pnpm build:relative`
2. Go to http://localhost:8080/build/ – Same 404 errors in network inspector
