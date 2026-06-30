import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Ready to start?
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              Join us today and build something amazing. Getting started is easy and takes less than a minute.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <Button asChild size="lg" className="w-full">
              <Link href="/signup">Sign up for free</Link>
            </Button>
            <p className="text-xs text-muted-foreground">
              No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
