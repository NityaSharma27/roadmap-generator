// store/useRoadmapStore.ts
import { create } from "zustand"
import { Roadmap } from "@/types/index"

interface RoadmapStore {
  // state
  roadmaps: Roadmap[]
  currentRoadmap: Roadmap | null
  isLoading: boolean
  error: string | null

  // actions
  setRoadmaps: (roadmaps: Roadmap[]) => void
  setCurrentRoadmap: (roadmap: Roadmap | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  addRoadmap: (roadmap: Roadmap) => void
  updateMilestone: (milestoneId: string, isCompleted: boolean) => void
}

export const useRoadmapStore = create<RoadmapStore>((set) => ({
  // initial state
  roadmaps: [],
  currentRoadmap: null,
  isLoading: false,
  error: null,

  // actions
  setRoadmaps: (roadmaps) => set({ roadmaps }),
  setCurrentRoadmap: (roadmap) => set({ currentRoadmap: roadmap }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  addRoadmap: (roadmap) =>
    set((state) => ({ roadmaps: [roadmap, ...state.roadmaps] })),

  // update a single milestone inside current roadmap
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