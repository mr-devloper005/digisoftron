import { Badge } from '@/components/ui/badge'
import { FileText, Images, Tag } from 'lucide-react'
import type { PostType } from '@/types/post'
import { cn } from '@/lib/utils'

const typeConfig: Record<PostType, { label: string; icon: typeof FileText; className: string }> = {
  article: {
    label: 'Article',
    icon: FileText,
    className: 'bg-foreground/90 text-background hover:bg-foreground',
  },
  gallery: {
    label: 'Gallery',
    icon: Images,
    className: 'bg-foreground/90 text-background hover:bg-foreground',
  },
  listing: {
    label: 'Listing',
    icon: Tag,
    className: 'bg-foreground/90 text-background hover:bg-foreground',
  },
}

interface TypeBadgeProps {
  type: PostType
  className?: string
  showIcon?: boolean
  label?: string
}

export function TypeBadge({ type, className, showIcon = true, label }: TypeBadgeProps) {
  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <Badge
      className={cn(
        'gap-1 border-0 font-medium',
        config.className,
        className,
      )}
    >
      {showIcon && <Icon className="h-3 w-3" />}
      {label || config.label}
    </Badge>
  )
}
