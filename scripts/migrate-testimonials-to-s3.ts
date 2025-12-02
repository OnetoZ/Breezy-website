import { promises as fs } from "fs"
import { join } from "path"
import { getDb } from "../lib/mongodb"

/**
 * Local migration script — converts local files under `public/uploads/testimonials`
 * to base64 data URLs and updates testimonial documents in MongoDB that reference
 * the local `/uploads/testimonials/...` paths.
 *
 * Usage: set `MONGODB_URI` (and optional `MONGODB_DB`) in env, then run:
 *   npx ts-node ./scripts/migrate-testimonials-to-s3.ts
 */

async function run() {
  const db = await getDb()

  const uploadsDir = join(process.cwd(), "public", "uploads", "testimonials")

  // Find testimonials referencing local uploads
  const cursor = db.collection("testimonials").find({ "media.url": { $regex: "^/uploads/testimonials/" } })

  let count = 0

  while (await cursor.hasNext()) {
    const doc = await cursor.next()
    if (!doc) continue

    const media = Array.isArray(doc.media) ? doc.media : []
    let changed = false

    for (let i = 0; i < media.length; i++) {
      const item = media[i]
      if (!item || typeof item.url !== "string") continue

      if (item.url.startsWith("/uploads/testimonials/")) {
        const filename = item.url.split("/").pop()
        if (!filename) continue

        const localPath = join(uploadsDir, filename)
        try {
          const fileBuf = await fs.readFile(localPath)
          const mime = getContentType(filename)
          const dataUrl = `data:${mime};base64,${fileBuf.toString("base64")}`

          media[i].url = dataUrl
          changed = true
          console.log(`Converted ${filename} -> data URL for testimonial ${doc.id || doc._id}`)
        } catch (err) {
          console.error(`Failed reading ${localPath}:`, err)
        }
      }
    }

    if (changed) {
      await db.collection("testimonials").updateOne({ _id: doc._id }, { $set: { media } })
      count++
    }
  }

  console.log(`Migration complete. Updated ${count} testimonial(s).`)
  process.exit(0)
}

function getContentType(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase()
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg"
    case "png":
      return "image/png"
    case "gif":
      return "image/gif"
    case "webp":
      return "image/webp"
    case "mp4":
      return "video/mp4"
    default:
      return "application/octet-stream"
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
