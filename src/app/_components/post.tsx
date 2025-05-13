"use client";

import { useEffect, useState } from "react";
import type { Task } from "~/server/api/routers/post";

import { api } from "~/trpc/react";

export function EditPost({ task }: { task: Task | null }) {
  const utils = api.useUtils();
  const [formData, setFormData] = useState({
    name: task?.titulo || "",
    description: task?.descricao || "",
  });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleError = (error: object, message: string) => {
    const errorMessage = extractErrorMessage((error as { message: string }).message);
    setMessage({ type: "error", text: message + errorMessage || "An unknown error occurred." });
  };

  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      handleSuccess("Task created successfully!");
    },

    onError: async (error) => handleError(error, "Error creating task. "),
  });
  const updatePost = api.post.updateTask.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      handleSuccess("Task updated successfully!");
    },

    onError: async (error) => handleError(error, "Error updating task. "),
  });

  const handleSuccess = (message: string) => {
    setMessage({ type: "success", text: message });
    setFormData({ name: "", description: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task)
      updatePost.mutate({ id: task.id, name: formData.name, description: formData.description });
    else
      createPost.mutate({ name: formData.name, description: formData.description });
  };

  useEffect(() => {
    if (task) 
      setFormData({
        name: task.titulo || "",
        description: task.descricao || "",
      });
    else
      setFormData({
        name: "",
        description: "",
      });
  }, [task]);

  const extractErrorMessage = (errorString: string): string | null => {
    try {
      const parsedError = JSON.parse(errorString); // Parse the string as JSON
      if (Array.isArray(parsedError) && parsedError[0]?.message) {
        return parsedError[0].message; // Return the "message" field
      }
      return null; // Return null if the structure is unexpected
    } catch {
      return null; // Return null if parsing fails
    }
  };

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <button
          type="submit"
          className={`rounded-full px-10 py-3 font-semibold transition ${
            !formData.name || createPost.isPending || updatePost.isPending
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-white/10 hover:bg-white/20"
          }`}
          disabled={!formData.name || createPost.isPending || updatePost.isPending}
        >
          {createPost.isPending || updatePost.isPending ?  "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Message Component */}
      {message && (
        <div
          className={`flex mt-4 rounded px-4 py-2 text-white justify-between items-center ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <p>{message.text}</p>
          <button
            onClick={() => setMessage(null)} // Clear the message
            className="ml-4 rounded-full bg-white/20 px-2 py-1 text-sm font-semibold hover:bg-white/30"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
