import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type WidgetId = string
type WidgetPosition = { x: number; y: number; w: number; h: number }

type DashboardState = {
  widgets: Record<WidgetId, WidgetPosition>
  layout: WidgetId[]
}

const initialState: DashboardState = {
  widgets: {
    weather: { x: 0, y: 0, w: 12, h: 2 },
    news: { x: 0, y: 2, w: 6, h: 4 },
    finance: { x: 6, y: 2, w: 6, h: 4 },
    overview: { x: 0, y: 6, w: 12, h: 2 },
  },
  layout: ["overview", "weather", "news", "finance"],
}

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateWidgetPosition: (state, action: PayloadAction<{ id: WidgetId; position: Partial<WidgetPosition> }>) => {
      const { id, position } = action.payload
      if (state.widgets[id]) {
        state.widgets[id] = { ...state.widgets[id], ...position }
      }
    },
    updateLayout: (state, action: PayloadAction<WidgetId[]>) => {
      state.layout = action.payload
    },
  },
})

export const { updateWidgetPosition, updateLayout } = dashboardSlice.actions
export default dashboardSlice.reducer

