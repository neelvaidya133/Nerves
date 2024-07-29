import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { deletePost } from "./actions";
import { PostsPage } from "@/lib/types";

export function useDeletePostMutation(){
    const {toast} =  useToast();

    const queryClient = useQueryClient();


    const router = useRouter();

    const pathName = usePathname();



    const mutation  = useMutation({
        mutationFn: deletePost,
        onSuccess: async(deletedPost)=>{
            const queryFilter: QueryFilters ={ queryKey: ["post-feed"]};


            await queryClient.cancelQueries(queryFilter);

            queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
                queryFilter,
                (oldData)=>{
                    if(!oldData){
                        return ;
                    }

                    return {
                        pageParams:oldData.pageParams,
                        pages: oldData.pages.map(page=>({
                            nextCursor: page.nextCursor,
                            posts: page.posts.filter((post)=> post.id !== deletedPost.id)
                        }))
                    }
                }
            )

            toast({
                description: "Post Deleted",
        
            })
if(pathName === `/posts/${deletedPost.id}`){
    router.push("/");
}

        },
        onError(error){
            console.error(error);
            toast({
                variant: "destructive",
                description: "Failed to delete post, please try again.",

            })
        }

    });
    return mutation;
}