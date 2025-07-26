import ToolLoader from "@/components/ui/loader";
import dynamic from "next/dynamic";

export const toolMap: Record<string, Record<string, any>> = {
  dev: {
    "json-formatter": dynamic(
      () => import("@/components/services/dev/jsonFormatter/page"),
      {
        loading: () => <ToolLoader />,
      }
    ),
    "uuid-generator": dynamic(
      () => import("@/components/services/dev/uuidGenerator/page"),
      {
        loading: () => <ToolLoader />,
      }
    ),
    "base64-encoder": dynamic(
      () => import("@/components/services/dev/base64-encoder/page"),
      {
        loading: () => <ToolLoader />,
      }
    ),
  },
  entertainment: {
    "random-pats-images": dynamic(
      () => import("@/components/services/entertainment/RandomsImages/page"),
      {
        loading: () => <ToolLoader />,
      }
    ),
    "fun-facts": dynamic(
      () => import("@/components/services/entertainment/fun-facts/page"),
      {
        loading: () => <ToolLoader />,
      }
    ),
    "random-jokes": dynamic(
      () => import("@/components/services/entertainment/randomJokes/page"),
      {
        loading: () => <ToolLoader />,
      }
    ),
  },
  productivity: {
    "color-palette": dynamic(
      () => import("@/components/services/productivity/color-palette/page"),
      {
        loading: () => <ToolLoader />,
      }
    ),
    "task-manager": dynamic(
      () => import("@/components/services/productivity/task-manager/page"),
      {
        loading: () => <ToolLoader />,
      }
    ),
    "to-do-List": dynamic(
      () => import("@/components/services/productivity/To-Do-List/page"),
      {
        loading: () => <ToolLoader />,
      }
    ),
    "secure-notes": dynamic(
      () => import("@/components/services/productivity/secure-notes/page"),
      {
        loading: () => <ToolLoader />,
      }
    ),
  },
  security: {
    "password-manager": dynamic(
      () => import("@/components/services/security/passwordManager/page"),
      {
        loading: () => <ToolLoader />,
      }
    ),
    "password-generator": dynamic(
      () => import("@/components/services/security/passwordGenerator/page"),
      {
        loading: () => <ToolLoader />,
      }
    ),
    "qr-code-generator": dynamic(
      () => import("@/components/services/security/qr-generator/page"),
      {
        loading: () => <ToolLoader />,
      }
    ),
    "secure-notes": dynamic(
      () => import("@/components/services/security/Secure-Notes/page"),
      {
        loading: () => <ToolLoader />,
      }
    ),
    "jwt-decoder": dynamic(
      () => import("@/components/services/security/jwt-decoder/page"),
      {
        loading: () => <ToolLoader />,
      }
    ),
    "hash-generator": dynamic(
      () => import("@/components/services/security/hash-generator/page"),
      {
        loading: () => <ToolLoader />,
      }
    ),
  },
  text: {
    "text-case-converter": dynamic(
      () => import("@/components/services/text/text-case-converter/page"),
      {
        loading: () => <ToolLoader />,
      }
    ),
    "word-counter": dynamic(
      () => import("@/components/services/text/word-counter/page"),
      {
        loading: () => <ToolLoader />,
      }
    ),
    "markdown-editor": dynamic(
      () => import("@/components/services/text/mark-down-editor/page"),
      {
        loading: () => <ToolLoader />,
      }
    ),
  },
};

export default toolMap;