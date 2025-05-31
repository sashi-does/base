import { MessageSquare, Video, Lock, Zap } from "lucide-react"

const features = [
  {
    name: "Real-Time Messaging",
    description: "Instant message delivery with typing indicators and read receipts for seamless communication.",
    icon: MessageSquare,
  },
  {
    name: "Video & Voice Calls",
    description: "High-quality video and voice calls with screen sharing capabilities for enhanced collaboration.",
    icon: Video,
  },
  {
    name: "End-to-End Encryption",
    description: "Your conversations are protected with state-of-the-art encryption for maximum privacy.",
    icon: Lock,
  },
  {
    name: "Lightning Fast",
    description: "Optimized for speed with minimal latency, ensuring your messages are delivered instantly.",
    icon: Zap,
  },
]

export default function Features() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Powerful Chat Features</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Everything you need for modern communication, all in one place.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.name} className="relative overflow-hidden rounded-lg border bg-background p-8">
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8" />
              <h3 className="font-bold">{feature.name}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
