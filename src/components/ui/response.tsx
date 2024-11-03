
import { useEffect, useState } from "react";
import { LoadingLogo } from "../../components/LoadingLogo";
import { remark } from "remark";
import html from "remark-html";


interface RootObject {
  created: number;
  usage: Usage;
  model: string;
  id: string;
  choices: Choice[];
  system_fingerprint: string;
  object: string;
}

interface Choice {
  message: Message;
  index: number;
  finish_reason: string;
}

interface Message {
  content: string;
  role: string;
}

interface Usage {
  total_tokens: number;
  completion_tokens: number;
  prompt_tokens: number;
}

interface LLmResultProps {
  data?: { outputEvents: Array<RootObject> };
}

const ResultSummary = ({ data }: LLmResultProps) => {
  const profile = data?.outputEvents.at(0)?.choices.at(0)?.message.content;
  const [markdown, setMarkdown] = useState("");
  useEffect(() => {
    if (!profile) return;
    remark()
      .use(html)
      .process(profile)
      .then((m) => setMarkdown(m.toString()));
  }, [profile]);
  if (profile) {
    return (
      <div className="bg-[#E5EBEE] dark:bg-black p-8 py-16 rounded-2xl">
        <div dangerouslySetInnerHTML={{ __html: markdown }} />
        {/* <SocialShareButtons /> */}
      </div>
    );
  } else {
    return <div>Something did not work. 😅 Please try again.</div>;
  }
};

interface ResponseProps extends LLmResultProps {
  status?: string;
}
const Response = (props: ResponseProps) => {
  const { status } = props;

  switch (status) {
    case "pending":
      return (
        <div className="text-violet-600">
          <LoadingLogo />
        </div>
      );
    case "ready":
      return <ResultSummary {...props} />;
    default:
      return;
  }
};

export default Response;