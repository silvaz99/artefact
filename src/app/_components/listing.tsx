"use client";

import type { Task } from "../../server/api/routers/post";
import { api } from "~/trpc/react";
import { EditTask } from "./post";
import { useState } from "react";

export function ListingTasks() {
    const utils = api.useUtils();
    const { data: tasks = [] } = api.post.getTasks.useQuery();
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const deleteTask = api.post.deleteTask.useMutation({
        onSuccess: async () => {
            await utils.post.invalidate();
        },
    });

    return (
        <div className="w-full max-w-xs">
            <ul className="flex flex-col gap-2 ">
                {tasks.map((task: Task) => (
                    <li key={task.id} className={`flex gap-2 ${editingTaskId === task.id ? "justify-center" : "rounded-full bg-white/10 px-4 py-2 text-white"
                        }`}>
                        <div className={`flex flex-grow justify-between items-center gap-4 ${editingTaskId === task.id ? "flex-col" : ""}`}>
                            <div>
                                <h3 className="text-lg font-semibold">{task.titulo}</h3>
                                <p className="text-sm text-gray-400">{task.descricao}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => deleteTask.mutate({ id: task.id })}
                                    className="rounded-full bg-red-500 px-4 py-2 text-white"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => setEditingTaskId(editingTaskId === task.id ? null : task.id)}
                                    className="rounded-full bg-blue-500 px-4 py-2 text-white"
                                >
                                    {editingTaskId === task.id ? "Cancel" : "Edit"}
                                </button>
                            </div>
                                {editingTaskId == task.id && (
                                    <div className="mt-4 w-full">
                                        <EditTask task={task}/>
                                    </div>
                                )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )

}