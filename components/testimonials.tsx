 "use client"

import { useEffect, useState } from "react"
import { useInView } from "@/hooks/use-in-view"

type Story = {
  _id?: string            // comes from MongoDB
  id: string              // used in UI
  name: string
  role: string
  text: string
  avatar: string
  rating: number
  media?: {
    type: "image" | "video"
    url: string
  }[]
}

export default function Testimonials() {
  const { ref, isInView } = useInView()

  const [stories, setStories] = useState<Story[]>([])
  const [showAll, setShowAll] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [menuOpenForId, setMenuOpenForId] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [text, setText] = useState("")
  const [rating, setRating] = useState<number>(5)
  const [mediaPreviews, setMediaPreviews] = useState<
    {
      type: "image" | "video"
      url: string
    }[]
  >([])
  const [isLoading, setIsLoading] = useState(true)

  // Load stories from backend on mount
  useEffect(() => {
    const loadStories = async () => {
      try {
        const res = await fetch("/api/testimonials")
        if (!res.ok) throw new Error("Failed to fetch")

        const data = await res.json()
        if (Array.isArray(data.testimonials)) {
          setStories(data.testimonials as Story[])
        }
      } catch (error) {
        console.error("Failed to load testimonials", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStories()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    const payload = {
      name: name.trim() || "Anonymous",
      role: role.trim() || "Community Member",
      text: text.trim(),
      avatar: "😊",
      rating,
      media: mediaPreviews,
    }

    try {
      if (editingId) {
        // Update locally first
        setStories((prev) =>
          prev.map((story) =>
            story.id === editingId
              ? {
                  ...story,
                  ...payload,
                  id: editingId,
                }
              : story
          )
        )

        // Inform backend
        await fetch("/api/testimonials", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...payload }),
        })
      } else {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        if (res.ok) {
          const data = await res.json()
          const created = data.testimonial as Story
          setStories((prev) => [created, ...prev])
        } else {
          // Fallback: still add locally if backend fails
          const fallback: Story = {
            id: `story-${Date.now()}`,
            ...payload,
          }
          setStories((prev) => [fallback, ...prev])
        }
      }
    } catch (error) {
      console.error("Saving testimonial failed", error)
    }

    setIsFormOpen(false)
    setEditingId(null)
    setName("")
    setRole("")
    setText("")
    setRating(5)
    setMediaPreviews([])
  }

  const handleAddStoryClick = () => {
    setEditingId(null)
    setName("")
    setRole("")
    setText("")
    setRating(5)
    setMediaPreviews([])
    setIsFormOpen(true)
  }

  const handleEditStory = (story: Story) => {
    setEditingId(story.id)
    setName(story.name === "Anonymous" ? "" : story.name)
    setRole(story.role === "Community Member" ? "" : story.role)
    setText(story.text)
    setRating(story.rating)
    setMediaPreviews(story.media || [])
    setIsFormOpen(true)
    setMenuOpenForId(null)
  }

  const handleDeleteStory = async (id: string) => {
    setStories((prev) => prev.filter((story) => story.id !== id))
    setMenuOpenForId(null)

    try {
      await fetch(`/api/testimonials?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      })
    } catch (error) {
      console.error("Failed to delete testimonial", error)
    }
  }

  const handleMediaChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newMedia: {
      type: "image" | "video"
      url: string
    }[] = []

    // Convert files to base64 data URLs
    for (const file of Array.from(files)) {
      const isVideo = file.type.startsWith("video")
      
      // For images, convert to base64
      if (!isVideo) {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
        newMedia.push({ type: "image", url: base64 })
      } else {
        // For videos, we can still use blob URL for preview, but convert to base64 for storage
        // For now, convert videos to base64 as well for consistency
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
        newMedia.push({ type: "video", url: base64 })
      }
    }

    setMediaPreviews(newMedia)
  }

  const renderStars = (value: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span key={index}>{index < value ? "⭐" : "☆"}</span>
    ))
  }

  const visibleStories = showAll ? stories : stories.slice(0, 3)

  return (
    <section ref={ref} className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-10 md:mb-16 ${isInView ? "fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Stories from Our Community
          </h2>
          <p className="text-lg text-muted-foreground">
            Read how Breezy fits into real cycles and real lives — and share your own experience with the community.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-2 text-sm font-medium text-foreground hover:border-primary/60 hover:text-primary transition-colors"
            disabled={stories.length === 0}
          >
            {showAll ? "View fewer stories" : "View more stories"}
          </button>
          <button
            type="button"
            onClick={handleAddStoryClick}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            Add your story
          </button>
        </div>

        {/* Loading state */}
        {isLoading && (
          <p className="text-center text-muted-foreground">Loading stories...</p>
        )}

        {/* Empty state */}
        {!isLoading && stories.length === 0 && (
          <p className="text-center text-muted-foreground">
            No stories yet. Be the first to share your Breezy experience!
          </p>
        )}

        {/* Stories grid */}
        {!isLoading && stories.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {visibleStories.map((story, i) => (
              <div
                key={story.id}
                className={`group p-8 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-500 space-y-4 ${
                  isInView ? "fade-in-up" : "opacity-0"
                }`}
                style={{ animation: isInView ? `fadeInUp 0.6s ease-out ${i * 0.15}s both` : "" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-2xl flex gap-1">{renderStars(story.rating)}</div>
                  <div className="relative">
                    <button
                      type="button"
                      className="text-lg text-muted-foreground hover:text-foreground px-2"
                      onClick={() =>
                        setMenuOpenForId((current) => (current === story.id ? null : story.id))
                      }
                    >
                      ⋯
                    </button>
                    {menuOpenForId === story.id && (
                      <div className="absolute right-0 mt-1 w-32 rounded-lg border border-border bg-card shadow-lg text-left text-sm overflow-hidden z-10">
                        <button
                          type="button"
                          className="w-full px-3 py-2 hover:bg-muted text-left"
                          onClick={() => handleEditStory(story)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="w-full px-3 py-2 hover:bg-muted text-left text-red-500"
                          onClick={() => handleDeleteStory(story.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Media (optional) */}
                {story.media && story.media.length > 0 && (
                  <div className="space-y-2">
                    {story.media.slice(0, 2).map((item, index) => (
                      <div key={index} className="rounded-xl overflow-hidden border border-border/60 bg-background">
                        {item.type === "image" ? (
                          <img src={item.url} alt="Story media" className="w-full h-40 object-cover" />
                        ) : (
                          <video
                            src={item.url}
                            className="w-full h-40 object-cover"
                            controls
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Quote */}
                <p className="text-foreground leading-relaxed">"{story.text}"</p>

                {/* Author */}
                <div className="pt-4 border-t border-border flex items-center gap-3">
                  <span className="text-3xl">{story.avatar}</span>
                  <div>
                    <p className="font-serif font-bold text-foreground">{story.name}</p>
                    <p className="text-sm text-muted-foreground">{story.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add story popup */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-card border border-border shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-serif font-bold text-foreground">
                  {editingId ? "Edit your Breezy story" : "Share your Breezy story"}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your feedback helps others choose what feels right for their body.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="text-muted-foreground hover:text-foreground text-xl leading-none"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Optional"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Who are you?</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Student, Mom, Doctor"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Your story</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                  placeholder="Share how Breezy has helped you during your cycle..."
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Add photos or videos (optional)
                </label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleMediaChange}
                  className="block w-full text-xs text-muted-foreground file:mr-3 file:rounded-full file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary hover:file:bg-primary/20"
                />
                {mediaPreviews.length > 0 && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {mediaPreviews.slice(0, 2).map((item, index) => (
                      <div key={index} className="rounded-lg overflow-hidden border border-border/60 bg-background">
                        {item.type === "image" ? (
                          <img src={item.url} alt="Selected media" className="w-full h-20 object-cover" />
                        ) : (
                          <video
                            src={item.url}
                            className="w-full h-20 object-cover"
                            muted
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Rate Breezy</label>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const value = index + 1
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                        className="text-2xl"
                      >
                        {value <= rating ? "⭐" : "☆"}
                      </button>
                    )
                  })}
                  <span className="text-xs text-muted-foreground ml-1">{rating} / 5</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-green-700 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 transition-colors"
                >
                  Submit story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
