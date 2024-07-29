"use client";

import { FollowerInfo } from "@/lib/types";
import { useToast } from "./ui/use-toast";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import useFollowerInfo from "@/hooks/useFollowerInfo";
import { Button } from "./ui/button";
import kyInstance from "@/lib/ky";

interface FollowButtonProps {
  userdId: string;
  initialState: FollowerInfo;
}

export default function FollowButton({
  userdId,
  initialState,
}: FollowButtonProps) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { data } = useFollowerInfo(userdId, initialState);

  const queryKey: QueryKey = ["follower-info", userdId];
  const { mutate } = useMutation({
    mutationFn: () =>
      data.isFollowedByUser
        ? kyInstance.delete(`/api/users/${userdId}/followers`)
        : kyInstance.post(`/api/users/${userdId}/followers`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);

      queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
        followers:
          (previousState?.followers || 0) +
          (previousState?.isFollowedByUser ? -1 : 1),
        isFollowedByUser: !previousState?.isFollowedByUser,
      }));
      return { previousState };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.log(err);
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    },
  });
  return (
    <Button
      variant={data.isFollowedByUser ? "secondary" : "default"}
      onClick={() => mutate()}
    >
      {data.isFollowedByUser ? "Unfollow" : "Follow"}
    </Button>
  );
}
