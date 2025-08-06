import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { IconUserCircle, IconCreditCard, IconNotification, IconGift } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div>
      <div className="px-4 lg:px-6">
        {/* Profile Section */}
        <section className="mb-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Account Settings
            </h1>
          </div>
        </section>
      </div>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card className="@container/card cursor-pointer">
          <CardHeader>
            <CardDescription><IconUserCircle className="w-8 h-8 text-primary mb-4" aria-hidden="true" /></CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              Personal Info
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              Update your details and manage your account.
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card cursor-pointer">
          <CardHeader>
            <CardDescription><IconCreditCard className="w-8 h-8 text-primary mb-4" aria-hidden="true" /></CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              Achievements
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              View your progress and earned badges.
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card cursor-pointer">
          <CardHeader>
            <CardDescription><IconNotification className="w-8 h-8 text-primary mb-4" aria-hidden="true" /></CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              Reports
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              View your learning analytics and progress.
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card cursor-pointer">
          <CardHeader>
            <CardDescription><IconGift className="w-8 h-8 text-primary mb-4" aria-hidden="true" /></CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              Rewards
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">Check rewards have after achieve tasks.</div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
