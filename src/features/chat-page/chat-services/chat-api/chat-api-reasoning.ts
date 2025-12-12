"use server";
import "server-only";

import { OpenAIReasoningInstance } from "@/features/common/services/openai";
import { ChatCompletionStreamingRunner } from "openai/resources/beta/chat/completions";
import {
  ChatCompletionMessageParam,
  ChatCompletionReasoningEffort,
} from "openai/resources/chat/completions";
import { ChatThreadModel } from "../models";

const resolveReasoningEffort = (): ChatCompletionReasoningEffort => {
  const effort = process.env.AZURE_OPENAI_REASONING_EFFORT;
  if (effort === "low" || effort === "medium" || effort === "high") {
    return effort;
  }
  return "medium";
};

export const ChatApiReasoning = async (props: {
  chatThread: ChatThreadModel;
  userMessage: string;
  history: ChatCompletionMessageParam[];
  signal: AbortSignal;
}): Promise<ChatCompletionStreamingRunner> => {
  const { chatThread, userMessage, history, signal } = props;

  const openAI = OpenAIReasoningInstance();

  return openAI.beta.chat.completions.stream(
    {
      model: process.env.AZURE_OPENAI_REASONING_API_DEPLOYMENT_NAME || "",
      stream: true,
      max_completion_tokens: 4096,
      reasoning_effort: resolveReasoningEffort(),
      messages: [
        {
          role: "system",
          content:
            chatThread.personaMessage +
            "\nYou are GPT-5.2 reasoning through complex, multi-step problems.",
        },
        ...history,
        {
          role: "user",
          content: userMessage,
        },
      ],
      metadata: {
        chatThreadId: chatThread.id,
      },
    },
    { signal }
  );
};
