import { useEffect, useState } from "react";
import { useProjectStore } from "@/stores/projectsStores";

export const useProjects = () => {
    const { fetchProjects, projects, loading, error } = useProjectStore();
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            if (projects.length === 0) {
                setIsInitialLoading(true);
                await fetchProjects();
            }
            setIsInitialLoading(false);
        };

        loadProjects();
    }, [fetchProjects, projects.length]);

    return {
        projects,
        isLoading: isInitialLoading || loading,
        error,
    };
};