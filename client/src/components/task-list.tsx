import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, SquareCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Task } from "@shared/schema";

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onTaskDeleted: (taskId: string) => void;
  onTaskToggled: (task: Task) => void;
  onEditTask: (task: Task) => void;
}

export function TaskList({ tasks, isLoading, onTaskDeleted, onTaskToggled, onEditTask }: TaskListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-amber-100 text-amber-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return "Pending";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading tasks...</p>
        </CardContent>
      </Card>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <SquareCheck className="text-muted-foreground w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No tasks yet</h3>
          <p className="text-muted-foreground mb-4">Get started by creating your first task above.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Your Tasks</h2>
        <span className="text-sm text-muted-foreground" data-testid="text-task-count">{tasks.length} tasks</span>
      </div>

      {tasks.map((task) => (
        <Card key={task.id} className="hover:shadow-md transition-shadow" data-testid={`card-task-${task.id}`}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <Checkbox
                    checked={task.status === "completed"}
                    onCheckedChange={() => onTaskToggled(task)}
                    data-testid={`checkbox-task-${task.id}`}
                  />
                  <div className="flex-1">
                    <h3 
                      className={`font-medium text-foreground ${
                        task.status === "completed" ? "line-through opacity-60" : ""
                      }`}
                      data-testid={`text-task-title-${task.id}`}
                    >
                      {task.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <Badge className={getStatusColor(task.status)} data-testid={`badge-status-${task.id}`}>
                        {getStatusLabel(task.status)}
                      </Badge>
                      <span className="text-xs text-muted-foreground" data-testid={`text-created-${task.id}`}>
                        Created {formatDistanceToNow(new Date(task.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
                <p 
                  className={`text-sm text-muted-foreground mb-3 ${
                    task.status === "completed" ? "line-through opacity-60" : ""
                  }`}
                  data-testid={`text-task-description-${task.id}`}
                >
                  {task.description}
                </p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditTask(task)}
                  data-testid={`button-edit-${task.id}`}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onTaskDeleted(task.id)}
                  className="text-destructive hover:text-destructive"
                  data-testid={`button-delete-${task.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
