"use client";

import { memo } from "react";
import { RawPayload } from "@/modules/workspace/ui/components/raw-payload";

interface HeavyPayloadFormatterProps {
  rawPayload: string;
}

export const HeavyPayloadFormatter = memo(function HeavyPayloadFormatter({
  rawPayload,
}: HeavyPayloadFormatterProps) {
  return <RawPayload rawPayload={rawPayload} />;
});
