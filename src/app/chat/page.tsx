import ComingSoon from "@/components/ComingSoon";
import { t } from "@/lib/i18n";

export default function ChatPage() {
  const tr = t();
  return <ComingSoon icon="💬" title={tr.comingSoon.chatTitle} body={tr.comingSoon.chatBody} />;
}
