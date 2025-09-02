import { useState } from "react";
import { TaskForm } from "@/components/task-form";
import { TaskList } from "@/components/task-list";
import { TaskStats } from "@/components/task-stats";
import { EditTaskModal } from "@/components/edit-task-modal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Task } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CheckSquare, Plus, Moon } from "lucide-react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleTaskDeleted = async (taskId: string) => {
    try {
      await apiRequest("DELETE", `/api/tasks/${taskId}`);
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({
        title: "Success",
        description: "Task deleted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTaskToggled = async (task: Task) => {
    try {
      const newStatus = task.status === "completed" ? "pending" : "completed";
      await apiRequest("PUT", `/api/tasks/${task.id}`, { status: newStatus });
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleTaskUpdated = () => {
    setEditingTask(null);
    queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    toast({
      title: "Success",
      description: "Task updated successfully!",
    });
  };

  const handleTaskCreated = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    toast({
      title: "Success",
      description: "Task created successfully!",
    });
  };

  const scrollToForm = () => {
    document.getElementById("task-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
    document.getElementById("task-title")?.focus();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <CheckSquare className="text-primary-foreground w-4 h-4" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">TodoApp</h1>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {tasks.filter(t => t.status === "completed").length} of {tasks.length} completed
              </span>
              <Button variant="ghost" size="sm">
                <Moon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Task Statistics */}
        <TaskStats tasks={tasks} />

        {/* Add Task Form */}
        <div id="task-form">
          <TaskForm onTaskCreated={handleTaskCreated} />
        </div>

        {/* Task Filters */}
        <div className="mb-6 bg-card rounded-lg border border-border p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                  data-testid="input-search"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Filter by:</span>
              <div className="flex space-x-1">
                {[
                  { value: "all", label: "All" },
                  { value: "pending", label: "Pending" },
                  { value: "in-progress", label: "In Progress" },
                  { value: "completed", label: "Completed" },
                ].map((filter) => (
                  <Button
                    key={filter.value}
                    variant={statusFilter === filter.value ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setStatusFilter(filter.value)}
                    data-testid={`button-filter-${filter.value}`}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          isLoading={isLoading}
          onTaskDeleted={handleTaskDeleted}
          onTaskToggled={handleTaskToggled}
          onEditTask={handleEditTask}
        />

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing 1 to {filteredTasks.length} of {filteredTasks.length} tasks
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <Button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl z-40"
        onClick={scrollToForm}
        data-testid="button-fab"
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Edit Task Modal */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
}
