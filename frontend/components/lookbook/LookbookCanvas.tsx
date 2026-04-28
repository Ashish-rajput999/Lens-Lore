"use client";

import Image from "next/image";
import { DndContext, DragEndEvent, DragStartEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { Product } from "@/lib/site-data";
import { useShell } from "@/components/providers/ShellProvider";
import { useReaderStore } from "@/lib/store/reader-store";

type LookbookCanvasProps = {
  products: Product[];
};

function PaletteCard({ product }: { product: Product }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `palette:${product.slug}`,
    data: {
      product,
      source: "palette",
    },
  });

  return (
    <button
      ref={setNodeRef}
      type="button"
      style={{
        transform: CSS.Translate.toString(transform),
      }}
      className={`group grid w-full grid-cols-[60px_1fr] gap-3 border border-ivory/10 p-3 text-left transition-colors hover:border-gold ${
        isDragging ? "opacity-60" : ""
      }`}
      {...listeners}
      {...attributes}
    >
      <div className="relative aspect-square overflow-hidden border border-ivory/12">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="60px"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2Zy8+"
          className="object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="font-display text-lg text-ivory">{product.name}</p>
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-ivory/50">
          {product.brand}
        </p>
      </div>
    </button>
  );
}

function CanvasProduct({
  item,
}: {
  item: ReturnType<typeof useReaderStore.getState>["lookbookDraft"]["items"][number];
}) {
  const { addToCart } = useShell();
  const removeFromLookbookDraft = useReaderStore((state) => state.removeFromLookbookDraft);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `canvas:${item.id}`,
    data: {
      itemId: item.id,
      source: "canvas",
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`absolute w-44 cursor-grab border border-ivory/12 bg-black/80 p-2 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur ${
        isDragging ? "cursor-grabbing" : ""
      }`}
      style={{
        left: item.x,
        top: item.y,
        transform: CSS.Translate.toString(transform),
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden border border-ivory/12">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          sizes="176px"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2Zy8+"
          className="object-cover"
        />
      </div>
      <div className="mt-3 space-y-2">
        <p className="font-display text-xl text-ivory">{item.product.name}</p>
        <div className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.3em] text-gold">
          <span>${item.product.price}</span>
          <button
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => addToCart(item.product)}
            className="text-ivory/70 transition-colors hover:text-ivory"
          >
            Add
          </button>
        </div>
        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => removeFromLookbookDraft(item.id)}
          className="inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-ivory/46 transition-colors hover:text-blood"
        >
          <Trash2 className="h-3 w-3" />
          Remove
        </button>
      </div>
    </div>
  );
}

export function LookbookCanvas({ products }: LookbookCanvasProps) {
  const [activeType, setActiveType] = useState<"palette" | "canvas" | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const lookbookDraft = useReaderStore((state) => state.lookbookDraft);
  const addToLookbookDraft = useReaderStore((state) => state.addToLookbookDraft);
  const updateLookbookDraftItemPosition = useReaderStore(
    (state) => state.updateLookbookDraftItemPosition,
  );
  const updateLookbookDraftMeta = useReaderStore(
    (state) => state.updateLookbookDraftMeta,
  );
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: "lookbook-canvas",
  });

  const canvasNodeRef = (node: HTMLDivElement | null) => {
    canvasRef.current = node;
    setDroppableRef(node);
  };

  function handleDragStart(event: DragStartEvent) {
    const source = event.active.data.current?.source;
    if (source === "palette" || source === "canvas") {
      setActiveType(source);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveType(null);
    const source = event.active.data.current?.source;
    const canvasBounds = canvasRef.current?.getBoundingClientRect();

    if (!canvasBounds) {
      return;
    }

    if (source === "palette" && event.over?.id === "lookbook-canvas") {
      const product = event.active.data.current?.product as Product | undefined;

      if (!product) {
        return;
      }

      addToLookbookDraft(product);
      return;
    }

    if (source === "canvas") {
      const itemId = event.active.data.current?.itemId as string | undefined;

      if (!itemId) {
        return;
      }

      const draftItem = lookbookDraft.items.find((item) => item.id === itemId);

      if (!draftItem) {
        return;
      }

      updateLookbookDraftItemPosition(itemId, {
        x: Math.max(16, draftItem.x + event.delta.x),
        y: Math.max(16, draftItem.y + event.delta.y),
      });
    }
  }

  const railProducts = useMemo(() => products.slice(0, 6), [products]);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr_320px]">
        <div className="space-y-4 border border-ivory/12 bg-black/45 p-5 backdrop-blur-xl">
          <p className="label-mono">Product Rail</p>
          <div className="space-y-3">
            {railProducts.map((product) => (
              <PaletteCard key={product.slug} product={product} />
            ))}
          </div>
        </div>

        <div
          ref={canvasNodeRef}
          className={`relative min-h-[700px] overflow-hidden border border-dashed p-6 transition-colors ${
            isOver
              ? "border-gold bg-[radial-gradient(circle_at_top,#2f2615,transparent_45%)]"
              : "border-ivory/18 bg-[radial-gradient(circle_at_top,#2a2a2a,transparent_45%)]"
          }`}
        >
          {lookbookDraft.items.length === 0 ? (
            <div className="grid h-full place-items-center">
              <div className="max-w-md text-center">
                <p className="font-display text-4xl text-ivory">Canvas Stage</p>
                <p className="mt-4 text-base leading-8 text-ivory/62">
                  Drag products from the rail into the canvas, overlap them, and build a collector-grade moodboard.
                </p>
              </div>
            </div>
          ) : null}

          {lookbookDraft.items.map((item) => (
            <CanvasProduct key={item.id} item={item} />
          ))}
        </div>

        <div className="space-y-4 border border-ivory/12 bg-black/45 p-5 backdrop-blur-xl">
          <p className="label-mono">Canvas Settings</p>
          <input
            value={lookbookDraft.title}
            onChange={(event) =>
              updateLookbookDraftMeta({ title: event.target.value })
            }
            className="w-full border border-ivory/12 bg-black px-4 py-4 text-ivory outline-none"
          />
          <textarea
            value={lookbookDraft.description}
            onChange={(event) =>
              updateLookbookDraftMeta({ description: event.target.value })
            }
            className="min-h-[160px] w-full border border-ivory/12 bg-black px-4 py-4 text-ivory outline-none"
          />
          <div className="border border-ivory/12 bg-black/60 p-4">
            <p className="label-mono text-gold">Draft Status</p>
            <p className="mt-3 text-sm leading-7 text-ivory/62">
              This lookbook is now persisted locally, so your arrangement stays intact across refreshes while we wire up shared publishing.
            </p>
          </div>
          <div className="border border-ivory/12 p-4 font-mono text-[0.68rem] uppercase tracking-[0.3em] text-ivory/58">
            Drag state: {activeType ?? "idle"}
          </div>
        </div>
      </div>
    </DndContext>
  );
}
