import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { TBlog } from "@/types/blog.types";
import { toast } from "sonner";
import { useDeleteBlogMutation } from "@/redux/features/blogs/blogApi";

interface BlogCardProps {
  blog: TBlog;
  action: "get" | "delete" | "update";
}

const BlogCard = ({ blog, action }: BlogCardProps) => {
  const router = useRouter();
  const [deleteBlog, { isLoading }] = useDeleteBlogMutation();

  const handleDelete = async () => {
    try {
      await deleteBlog(blog._id).unwrap();
      toast.success("Blog deleted successfully!");
    } catch (error) {
        console.error(error);
      toast.error("Failed to delete blog.");
    }
  };

  return (
    <Card className="w-full md:max-w-md bg-card text-card-foreground shadow-lg transition-transform hover:scale-105">
      {/* Blog Image */}
      <div className="relative w-full h-48">
        <Image
          src={blog.image}
          alt={blog.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-md"
          priority
        />
      </div>

      <CardHeader>
        <CardTitle className="text-lg font-semibold">{blog.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          {blog.content.slice(0, 100)}...
        </p>
        <span className="mt-2 inline-block px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 rounded">
          {blog.category}
        </span>
      </CardContent>

      <CardFooter className="flex justify-between">
        {/* Redirect to details page */}
        {action === "get" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/blogs/${blog._id}`)}
          >
            View Details{" "}
            <Icon
              icon="line-md:external-link"
              width="16"
              height="16"
              className="ml-1"
            />
          </Button>
        )}
        {action === "update" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/dashboard/blogs/update/${blog._id}`)}
          >
            Edit{" "}
            <Icon
              icon="line-md:external-link"
              width="16"
              height="16"
              className="ml-1"
            />
          </Button>
        )}
        {/* Delete Button with Confirmation */}
        {action === "delete" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm" disabled={isLoading}>
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Are you sure?</DialogTitle>
              <p className="text-sm text-muted-foreground">
                This action cannot be undone.
              </p>
              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  {isLoading ? "Deleting..." : "Confirm Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
