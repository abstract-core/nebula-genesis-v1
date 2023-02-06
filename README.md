# nebula-genesis

## Prerequisites

Create the `./config.ts` file, with the following content :

```typescript
const E2E_CONFIG = {
  NOTION_TOKEN: "<notion-integration-token>",
  DATABASE_ID: "<notion-database-id>",
};

export default E2E_CONFIG;
```

## Testing strategy

Specification files can be run idependantly using :

```bash
npm test -- <file-name>
```

### Specific tests

```bash
npm run e2e-main
npm run e2e-main-resize
```
