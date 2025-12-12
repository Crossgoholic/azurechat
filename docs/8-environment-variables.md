# 🔑 Environment Variables

Refer to the [`.env.example`](../src/.env.example) file for the required environment variables. For local development, these should be copied to a new file named `.env.local` in the `src` directory.

## 🧠 GPT-5.2 reasoning

Set `ENABLE_GPT5_REASONING=true` to route standard chats through the GPT-5.2 reasoning deployment. Populate the accompanying `AZURE_OPENAI_REASONING_*` variables (instance name, deployment, API version, optional key, and `AZURE_OPENAI_REASONING_EFFORT`) so the backend can reach your Azure OpenAI resource. When these variables are omitted, the app continues to use the default GPT-4o deployment.

## Continue to the next step...

👉 [Next: Managed Identities](./9-managed-identities.md)
