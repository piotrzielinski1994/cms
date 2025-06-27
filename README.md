## Local development

```bash
cp .env.example .env
nvm use
npm i
docker compose up -d
npm run build
npm start
```

### Other

```bash
npm run test:watch
npm run storybook
```

## Notes:

- languages: en, pl (en)
- css prefix (cms-)
- configurable enabling/disabling features
- breadcrumbs, drawer, upload
