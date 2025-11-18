"use client"

import { useEffect, useState } from "react"
import { useInView } from "@/hooks/use-in-view"

type Story = {
  name: string
  role: string
  text: string
  avatar: string
  rating: number
  id: string
  media?: {
    type: "image" | "video"
    url: string
  }[]
}

const initialStories: Story[] = [
  {
    name: "Priya M.",
    role: "College Student",
    text: "Finally found something that doesn't irritate my sensitive skin. Breezy has been a game-changer for my confidence during my cycle.",
    avatar: "👧",
    rating: 5,
    id: "story-1",
  },
  {
    name: "Anjali K.",
    role: "Working Professional",
    text: "The 12-hour protection is reliable and the herbal ingredients give me peace of mind. I've recommended Breezy to all my friends.",
    avatar: "👩‍💼",
    rating: 5,
    id: "story-2",
  },
  {
    name: "Dr. Sneha P.",
    role: "Gynecologist",
    text: "I recommend Breezy to my patients. The herbal formulation is gentle on sensitive skin and the biodegradable packaging aligns with health ethics.",
    avatar: "👨‍⚕️",
    rating: 5,
    id: "story-3",
  },
  {
    name: "Neha S.",
    role: "Young Professional",
    text: "I don't have to worry about changing too often during long meetings. Breezy keeps me comfortable and confident all day.",
    avatar: "👩",
    rating: 5,
    id: "story-4",
  },
  {
    name: "Aditi R.",
    role: "Hostel Student",
    text: "The biodegradable pads make me feel better about my choices. It's nice to know I'm caring for myself and the planet.",
    avatar: "🎓",
    rating: 4,
    id: "story-5",
  },
  {
    name: "Meera T.",
    role: "New Mom",
    text: "After pregnancy, my skin became super sensitive. Breezy is one of the few products that actually feels gentle.",
    avatar: "🤱",
    rating: 5,
    id: "story-6",
  },
]

export default function Testimonials() {
  const { ref, isInView } = useInView()

  const [stories, setStories] = useState<Story[]>(initialStories)
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

  // Load stories from backend on mount (fallback to initialStories on error/empty)
  useEffect(() => {
    const loadStories = async () => {
      try {
        const res = await fetch("/api/testimonials")
        if (!res.ok) return

        const data = await res.json()
        if (Array.isArray(data.testimonials) && data.testimonials.length > 0) {
          setStories(data.testimonials as Story[])
        }
      } catch (error) {
        console.error("Failed to load testimonials", error)
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
        // Update locally first for a snappy feel
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

        // Inform backend (ignore errors silently for now)
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

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newMedia: {
      type: "image" | "video"
      url: string
    }[] = []

    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file)
      const isVideo = file.type.startsWith("video")
      newMedia.push({ type: isVideo ? "video" : "image", url })
    })

    setMediaPreviews(newMedia)
  }

  const renderStars = (value: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span key={index}>{index < value ? "⭐" : "☆"}</span>
    ))
  }

  return (
    <section ref={ref} className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-10 md:mb-16 ${isInView ? "fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Stories from Our Community</h2>
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

        {/* Stories grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {(showAll ? stories : stories.slice(0, 3)).map((story, i) => (
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
                <p className="text-sm text-muted-foreground mt-1">Your feedback helps others choose what feels right for their body.</p>
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
                  className="inline-flex items-center justify-center rounded-full bg-green-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 transition-colors"
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
