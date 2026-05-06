---
name: venture-payroll-agent infrastructure
description: GCP project, Cloud Run URL, env vars, deploy commands
type: reference
---

## Infrastructure

- **GCP project**: `venture-payroll-agent` — confirmed during scaffold config
- **Cloud Run service**: `venture-payroll-agent` — confirmed during scaffold config
- **Cloud Run URL**: TBD — set after first deploy
- **Region**: us-east1
- **GCS bucket**: TBD
- **GitHub repo**: TBD — set during Phase 1
- **Local path**: `~/Downloads/venture-payroll-agent`

## Environment Variables

See `.env.example` for the full list.

## Deploy Command

```bash
gcloud run deploy venture-payroll-agent --source . --region us-east1 --project venture-payroll-agent
```

**Important**: Always use `--update-env-vars`, never `--set-env-vars` (the latter wipes all existing vars).
