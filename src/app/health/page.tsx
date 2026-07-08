import ComingSoon from "@/components/ComingSoon";
import { t } from "@/lib/i18n";

export default function HealthPage() {
  const tr = t();
  return <ComingSoon icon="🩺" title={tr.comingSoon.healthTitle} body={tr.comingSoon.healthBody} />;
}
