export type CanvasItem = {
  productSanityId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
};

export type CanvasData = {
  title: string;
  description: string;
  background: {
    color: string;
    texture: string;
  };
  items: CanvasItem[];
};

export type LookbookRecord = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  is_public: boolean;
  canvas_data: CanvasData;
  thumbnail_url: string | null;
};
