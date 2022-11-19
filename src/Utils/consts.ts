export const FRAME_RATE = 30;

export type Layout = {
  WIDTH: number;
  HEIGHT: number;
  NUM_COL: number;
  NUM_ROW: number;
};

export const CANVAS_LAYOUT: Layout = {
  WIDTH: 1000,
  HEIGHT: 1000,
  NUM_COL: 80,
  NUM_ROW: 80,
};

export const NGH_LAYOUT: Layout = {
  WIDTH: 100,
  HEIGHT: 100,
  NUM_COL: 3,
  NUM_ROW: 3,
};

export const CELL_LAYOUT = (layout: Layout) => ({
  CELL_HEIGHT: layout.HEIGHT / layout.NUM_COL,
  CELL_WIDTH: layout.WIDTH / layout.NUM_ROW,
});
export const MAX_NEIGHBOURS_DISPOSITION = 10; // 2
export const FILL_PERCENT = 0.5;
