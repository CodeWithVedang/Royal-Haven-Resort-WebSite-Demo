import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Badge";

/**
 * Route-level placeholder. Mirrors the page-hero-then-content rhythm every
 * secondary page uses, so the switch to real content does not shift layout.
 */
export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading</span>

      <div className="relative bg-sand">
        <Skeleton className="h-[58svh] min-h-[24rem] w-full" />
        <div className="absolute inset-x-0 bottom-0 pb-12 lg:pb-20">
          <Container width="wide">
            <Skeleton className="h-3 w-32 bg-cream/25" />
            <Skeleton className="mt-6 h-10 w-full max-w-2xl bg-cream/25" />
            <Skeleton className="mt-4 h-4 w-full max-w-md bg-cream/20" />
          </Container>
        </div>
      </div>

      <div className="bg-ivory py-18 lg:py-28">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Skeleton className="aspect-4/5 w-full" />
            </div>
            <div className="lg:col-span-6">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-5 h-9 w-full max-w-lg" />
              <Skeleton className="mt-6 h-4 w-full" />
              <Skeleton className="mt-3 h-4 w-11/12" />
              <Skeleton className="mt-3 h-4 w-9/12" />
              <div className="mt-9 grid grid-cols-3 gap-6 border-y border-line py-6">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
              <Skeleton className="mt-8 h-12 w-44" />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
