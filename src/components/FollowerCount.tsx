"use client";

import useFollowerInfo from "@/hooks/useFollowerInfo";
import { FollowerInfo } from "@/lib/types";
import { formateNumber } from "@/lib/utils";

interface FollowerCountProps {
  userId: string;
  initialState: FollowerInfo;
}

export default function FollowerCount({
  userId,
  initialState,
}: FollowerCountProps) {
  const { data } = useFollowerInfo(userId, initialState);

  return (
    <span>
      Follower:{""}
      <span className="font-semibold">{formateNumber(data.followers)}</span>
    </span>
  );
}
