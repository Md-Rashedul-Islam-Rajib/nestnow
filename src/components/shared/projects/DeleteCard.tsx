import { useState } from "react";
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
} from "@/components/ui/dialog";
import { TProject } from "@/types/project.types";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { useDeleteProjectMutation } from "@/redux/features/projects/projectApi";

interface ProjectCardProps {
  project: TProject;
}

export function DeleteProjectCard({ project }: ProjectCardProps) {
  const [deleteProject, { isLoading }] = useDeleteProjectMutation();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteProject(project._id).unwrap();
      toast.success("Project deleted successfully!");
      setOpen(false); // Close dialog after deletion
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete project. Try again.");
    }
  };

  return (
    <Card className="w-full md:max-w-md bg-card text-card-foreground shadow-lg">
      {/* Project Image */}
      <div className="relative w-full h-48">
        <Image
          src={project.image}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-md"
          priority
        />
      </div>

      <CardHeader>
        <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          {project.descriptions.slice(0, 100)}...
        </p>
        {/* Tech Stack */}
        <div className="mt-3 flex flex-wrap gap-2">
          {project.technology.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        {/* Open Confirmation Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm">
              Delete
              <Icon icon="mdi:delete" width="16" height="16" className="ml-1" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete <strong>{project.title}</strong>?
              This action cannot be undone.
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
