export const FRAME_RATE = 30;

export const CANVAS_LAYOUT = {
  WIDTH: 800,
  HEIGHT: 800,
  NUM_COL: 80,
  NUM_ROW: 80,
};

export const NGH_LAYOUT = {
  WIDTH: 100,
  HEIGHT: 100,
  NUM_COL: 3,
  NUM_ROW: 3,
};

export const CELL_LAYOUT = (layout: any) => ({
  CELL_HEIGHT: layout.HEIGHT / layout.NUM_COL,
  CELL_WIDTH: layout.WIDTH / layout.NUM_ROW,
});
export const MAX_NEIGHBOURS_DISPOSITION = 10; // 2
export const FILL_PERCENT = 0.5;
