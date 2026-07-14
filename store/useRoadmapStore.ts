import { create } from "zustand"
import { Roadmap } from "@/types/index"

interface RoadmapStore {
  roadmaps: Roadmap[]
  currentRoadmap: Roadmap | null
  isLoading: boolean
  error: string | null

  setRoadmaps: (roadmaps: Roadmap[]) => void
  setCurrentRoadmap: (roadmap: Roadmap | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  addRoadmap: (roadmap: Roadmap) => void
  updateMilestone: (milestoneId: string, isCompleted: boolean) => void
}

export const useRoadmapStore = create<RoadmapStore>((set) => ({
  roadmaps: [],
  currentRoadmap: null,
  isLoading: false,
  error: null,

  setRoadmaps: (roadmaps) => set({ roadmaps }),
  setCurrentRoadmap: (roadmap) => set({ currentRoadmap: roadmap }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  addRoadmap: (roadmap) =>
    set((state) => ({ roadmaps: [roadmap, ...state.roadmaps] })),

  updateMilestone: (milestoneId, isCompleted) =>
    set((state) => ({
      currentRoadmap: state.currentRoadmap
        ? {
            ...state.currentRoadmap,
            milestones: state.currentRoadmap.milestones.map((m) =>
              m.id === milestoneId ? { ...m, isCompleted } : m
            )
          }
        : null
    }))
}))